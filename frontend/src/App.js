import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Education & Presentation",
      subtitle: "For teams new to practical AI",
      description: "Transform AI curiosity into understanding through engaging presentations that cut through the hype.",
      features: ["AI fundamentals for business", "Practical use cases", "Industry-specific applications", "ROI evaluation frameworks"],
      icon: "🎓"
    },
    {
      id: 2,
      title: "Hands-On Implementation",
      subtitle: "Fastest path to AI confidence",
      description: "Build real AI solutions together, developing skills that create lasting competitive advantage.",
      features: ["Live implementation sessions", "Custom AI tool development", "Team skill building", "Measurable outcomes"],
      icon: "🛠️"
    },
    {
      id: 3,
      title: "Discovery Workshops",
      subtitle: "Strategic AI roadmap development",
      description: "Identify high-value AI opportunities specific to your business through structured discovery sessions.",
      features: ["AI opportunity assessment", "Custom solution planning", "Implementation roadmap", "Resource planning"],
      icon: "🔍"
    },
    {
      id: 4,
      title: "Build Services",
      subtitle: "Direct AI solution implementation",
      description: "Custom AI solutions built to deliver measurable business value from day one.",
      features: ["Custom AI development", "Integration services", "Performance optimization", "Ongoing support"],
      icon: "⚡"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "CEO, Midwest Manufacturing",
      content: "i10iQ transformed our understanding of AI from curiosity to competitive advantage. We're now saving 15+ hours weekly on routine tasks.",
      rating: 5
    },
    {
      name: "Mike Chen",
      title: "Operations Director, AgTech Solutions",
      content: "Finally, an AI consultant who delivers real results instead of impressive demos. Our efficiency gains are measurable and significant.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      title: "Founder, Central Iowa Logistics",
      content: "Aaron's practical approach to AI implementation exceeded our expectations. We're seeing immediate ROI and excited about our new capabilities.",
      rating: 5
    }
  ];

  const ChatWidget = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`transition-all duration-300 ${isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 mb-4 border border-gray-200 flex flex-col">
          <div className="bg-gradient-to-r from-navy to-blue-800 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm opacity-90">Ask about our services</p>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">Hello! I'm here to help you learn about i10iQ's AI consulting services. What would you like to know?</p>
            </div>
            <div className="text-center text-gray-500 text-sm">
              Chat functionality will be connected to AI chatbot
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden"
              />
              <button className="bg-golden text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="bg-gradient-to-r from-golden to-yellow-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110"
      >
        💬
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-navy">i10iQ.ai</div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-navy transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-navy transition-colors">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-navy transition-colors">Testimonials</a>
              <a href="#contact" className="bg-golden text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1700575083904-d5e3279a8cb8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxBSSUyMGJ1c2luZXNzJTIwY29uc3VsdGluZ3xlbnwwfHx8Ymx1ZXwxNzUyMTk0MzkzfDA&ixlib=rb-4.1.0&q=85"
            alt="Professional AI Consultant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-blue-900/80"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Cut Through the
            <span className="text-golden block">AI Hype</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Transform AI curiosity into competitive advantage with practical implementation that delivers measurable business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-golden text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 hover:scale-105 shadow-lg">
              Start Your AI Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-navy transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Meet You Where You Are
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Adaptive expertise for any AI maturity level - from curiosity to competitive advantage
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${
                  activeService === service.id ? 'border-golden' : 'border-gray-200'
                }`}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-navy mb-2">{service.title}</h3>
                <p className="text-golden font-semibold mb-4">{service.subtitle}</p>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className={`transition-all duration-300 ${activeService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="text-golden mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                Decades of Real-World Experience
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                i10iQ emerged from firsthand understanding of what it takes to extract genuine value from AI technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-golden/20 rounded-full p-2 mr-4 mt-1">
                    <span className="text-golden">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy">Multi-Industry Expertise</h4>
                    <p className="text-gray-600">Trading, investments, software development, and Fortune 500 consulting</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-golden/20 rounded-full p-2 mr-4 mt-1">
                    <span className="text-golden">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy">Results-First Approach</h4>
                    <p className="text-gray-600">Every engagement delivers tangible time savings or revenue generation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-golden/20 rounded-full p-2 mr-4 mt-1">
                    <span className="text-golden">🧠</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy">Healthy Skepticism</h4>
                    <p className="text-gray-600">Challenge AI hype with honest assessment of what actually works</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1649399046939-7b8112221151?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxBSSUyMGJ1c2luZXNzJTIwY29uc3VsdGluZ3xlbnwwfHx8Ymx1ZXwxNzUyMTk0MzkzfDA&ixlib=rb-4.1.0&q=85"
                alt="Professional Consultant"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-golden text-white p-6 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discovery-first approach that meets you exactly where you are
            </p>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1606588984221-7ab3e2bb038a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHx0ZWNobm9sb2d5JTIwaW1wbGVtZW50YXRpb258ZW58MHx8fGJsdWV8MTc1MjE5NDQwM3ww&ixlib=rb-4.1.0&q=85"
              alt="AI Strategy Implementation"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl mx-auto text-center text-white p-8">
                <h3 className="text-3xl font-bold mb-4">Strategic AI Implementation</h3>
                <p className="text-lg mb-6">From assessment to deployment, we guide you through every step of your AI transformation journey.</p>
                <button className="bg-golden text-white px-8 py-3 rounded-full hover:bg-yellow-600 transition-colors">
                  Schedule Discovery Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Measurable results that exceed expectations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-golden">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-navy">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your AI Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Let's discuss how i10iQ can help you cut through the AI hype and deliver measurable business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-golden text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 hover:scale-105">
              Schedule Free Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-navy transition-all duration-300">
              Download AI Readiness Guide
            </button>
          </div>
          <div className="flex justify-center space-x-8 text-gray-300">
            <div className="flex items-center">
              <span className="mr-2">📧</span>
              <span>aaron@i10iq.com</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🌐</span>
              <span>i10iq.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-golden mb-4">i10iQ.ai</div>
              <p className="text-gray-400">
                Where AI hype meets business reality. Practical implementation for measurable results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Education & Presentation</li>
                <li>Hands-On Implementation</li>
                <li>Discovery Workshops</li>
                <li>Build Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Case Studies</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Email</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 i10iQ.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;