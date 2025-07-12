from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'i10iq_dev')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)
    service_interest: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactFormCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)
    service_interest: Optional[str] = None

class NewsletterSignup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: Optional[str] = None
    interests: List[str] = []
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSignupCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    interests: List[str] = []

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    message: str
    user_type: str = "visitor"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    response: Optional[str] = None

class ChatMessageCreate(BaseModel):
    session_id: str
    message: str
    user_type: str = "visitor"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "I10iQ.ai API - Ready to serve"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow(), "service": "I10iQ.ai API"}

@api_router.post("/test-contact")
async def test_contact(form_data: ContactFormCreate):
    """Test endpoint without MongoDB"""
    return {"status": "success", "message": "Form data received", "data": form_data.dict()}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactFormSubmission)
async def submit_contact_form(form_data: ContactFormCreate):
    """Submit contact form data"""
    contact_dict = form_data.dict()
    contact_obj = ContactFormSubmission(**contact_dict)
    result = await db.contact_submissions.insert_one(contact_obj.dict())
    logger.info(f"Contact form submitted: {contact_obj.email}")
    return contact_obj

@api_router.post("/newsletter", response_model=NewsletterSignup)
async def newsletter_signup(signup_data: NewsletterSignupCreate):
    """Newsletter signup endpoint"""
    # Check for existing subscription
    existing = await db.newsletter_signups.find_one({"email": signup_data.email})
    if existing:
        return {"status": "already_subscribed", "email": signup_data.email}
    
    signup_dict = signup_data.dict()
    newsletter_obj = NewsletterSignup(**signup_dict)
    result = await db.newsletter_signups.insert_one(newsletter_obj.dict())
    logger.info(f"Newsletter signup: {newsletter_obj.email}")
    return newsletter_obj

@api_router.post("/chat", response_model=ChatMessage)
async def chat_endpoint(chat_data: ChatMessageCreate):
    """Chat endpoint for AI interactions"""
    chat_dict = chat_data.dict()
    chat_obj = ChatMessage(**chat_dict)
    
    # Simple response for now - will be enhanced with real AI later
    chat_obj.response = "Thank you for your message! Our AI consulting team will respond shortly. In the meantime, feel free to explore our services or schedule a consultation."
    
    result = await db.chat_messages.insert_one(chat_obj.dict())
    logger.info(f"Chat message received from session: {chat_obj.session_id}")
    return chat_obj

@api_router.get("/chat/{session_id}", response_model=List[ChatMessage])
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    messages = await db.chat_messages.find({"session_id": session_id}).to_list(100)
    return [ChatMessage(**message) for message in messages]

# Include the router in the main app
app.include_router(api_router)

# CORS configuration - more secure for production
origins = os.environ.get(
    "CORS_ORIGINS", 
    "http://localhost:3000,https://frontend-64rvwfvbi-aarons-projects-30c7e6bd.vercel.app,https://i10iq.ai"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
