FROM python:3.11-slim

# Install system dependencies including CA certificates
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Set Python to use system CA certificates
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
ENV REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt

# Expose the port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]