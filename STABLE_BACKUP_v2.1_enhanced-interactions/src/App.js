import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FloatingElements from './components/FloatingElements';
import AnimatedText from './components/AnimatedText';
import ContactForm from './components/ContactForm';
import AIChatWidget from './components/AIChatWidget';
import BrandLogo from './components/BrandLogo';
import LearnMoreModal from './components/LearnMoreModal';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Calculate scroll progress with more stable calculation
      const totalHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1 // Prevent division by zero
      );
      const currentScroll = Math.min(window.scrollY, totalHeight);
      const progress = Math.min((currentScroll / totalHeight) * 100, 100);
      setScrollProgress(Math.round(progress * 100) / 100); // Round to prevent micro-fluctuations
      
      // Handle mobile service activation based on scroll position
      if (isMobile) {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          const serviceCards = servicesSection.querySelectorAll('[data-service-id]');
          let activeServiceId = null;
          
          serviceCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            
            // If card center is near viewport center, activate it
            if (Math.abs(cardCenter - viewportCenter) < rect.height / 2) {
              activeServiceId = parseInt(card.getAttribute('data-service-id'));
            }
          });
          
          if (activeServiceId !== activeService) {
            setActiveService(activeServiceId);
          }
        }
      }
    };
    
    // Throttle scroll events to prevent excessive updates
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [activeService, isMobile]);

  // Device detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer hooks for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const services = [
    {
      id: 1,
      title: "The AI Level-Up",
      subtitle: "For teams new to practical AI",
      description: "Patient, educational guidance through practical AI fundamentals, frameworks, and tools that cut through the hype and focus on real business value.",
      features: ["AI fundamentals for business", "Practical use cases", "Industry-specific applications", "Measurable outcomes"],
      icon: "🎓",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "The AI-First Leader",
      subtitle: "Fastest path to AI confidence",
      description: "Take your AI skills and abilities to the next level, creating a lasting competitive advantage for your business or career.",
      features: ["Hands-on AI tools & automations", "Live implementation sessions", "Team skill building", "ROI evaluation frameworks"],
      icon: "🛠️",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "AI Discovery Workshop",
      subtitle: "Strategic AI roadmap development",
      description: "Identify high-value AI opportunities specific to your business through structured discovery sessions.",
      features: ["AI opportunity assessment", "Custom solution planning", "Implementation roadmap", "Readiness audit and resource planning"],
      icon: "🔍",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      title: "AI Build Services",
      subtitle: "Direct AI solution implementation",
      description: "Custom AI solutions, advanced agent automation, and full implementation of high-value AI projects that deliver value from day one.",
      features: ["Custom AI development", "Integration services", "Performance optimization", "Ongoing support"],
      icon: "⚡",
      color: "from-red-500 to-pink-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "CEO, Midwest Manufacturing",
      content: "i10iQ transformed our understanding of AI from curiosity to competitive advantage. We're now saving 15+ hours weekly on routine tasks.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      title: "Operations Director, AgTech Solutions", 
      content: "Finally, an AI consultant who delivers real results instead of impressive demos. Our efficiency gains are measurable and significant.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Lisa Rodriguez",
      title: "Founder, Central Iowa Logistics",
      content: "Aaron's practical approach to AI implementation exceeded our expectations. We're seeing immediate ROI and excited about our new capabilities.",
      rating: 5,
      avatar: "LR"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ 
          transform: `scaleX(${Math.min(scrollProgress / 100, 1)})`,
          willChange: 'transform'
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
            >
              <BrandLogo />
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-navy transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-navy transition-colors">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-navy transition-colors">Testimonials</a>
              <motion.button
                onClick={() => setIsContactFormOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-4.0.3&q=85"
            alt="Diverse team of seasoned executives and young tech professionals collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-blue-900/80"></div>
        </div>
        
        <FloatingElements />
        
        <motion.div 
          className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <AnimatedText 
              texts={["Cut Through the", "Navigate Beyond the", "Rise Above the"]}
              staticEnd="AI Hype"
              className="block"
            />
          </h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Transform AI curiosity into competitive advantage with practical implementation that delivers measurable business results.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.button
              onClick={() => setIsContactFormOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(234, 178, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Start Your AI Journey
            </motion.button>
            <motion.button
              onClick={() => setIsLearnMoreOpen(true)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-navy transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Our AI Consulting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From education to implementation, we guide your AI transformation with practical expertise and proven methodologies.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const isExpanded = isMobile ? activeService === service.id : hoveredService === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  data-service-id={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={() => !isMobile && setActiveService(activeService === service.id ? null : service.id)}
                  onMouseEnter={() => !isMobile && setHoveredService(service.id)}
                  onMouseLeave={() => !isMobile && setHoveredService(null)}
                >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{service.title}</h3>
                <p className="text-sm text-purple-600 font-semibold mb-3">{service.subtitle}</p>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 pt-4 mt-4"
                    >
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span className="text-blue-600 mr-2">✓</span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                Why Choose <span className="text-blurple">i10iQ.AI</span>?
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                We bridge the gap between AI potential and business reality. Our approach combines deep technical expertise with practical business acumen.
              </p>
              <div className="space-y-4">
                {[
                  "20+ years of combined tech and business leadership experience",
                  "Proven track record with Fortune 500 companies",
                  "Hands-on implementation, not just consulting",
                  "ROI-focused approach with measurable outcomes"
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="text-blurple text-xl mr-3">★</span>
                    <span className="text-gray-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="w-full h-96 overflow-hidden rounded-2xl shadow-2xl">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-4.0.3&q=85"
                  alt="Senior executive mentoring young tech professional"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={aboutInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
              >
                AI
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Measurable results that exceed expectations
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: (index * 0.2) + (i * 0.1) }}
                      className="text-purple-600 text-xl"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-navy to-blue-900 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-4.0.3&q=85"
            alt="Mixed-age business team in strategy session"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Business with AI?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Schedule a free consultation and discover how AI can drive measurable results for your organization.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setIsContactFormOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(234, 178, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Schedule Free Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-navy transition-all duration-300"
            >
              Download AI Readiness Guide
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blurple">i10iQ.AI</h3>
              <p className="text-gray-300 mb-4">
                Transforming businesses through practical AI implementation and strategic consulting.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.linkedin.com/in/aaroni10/"
                  whileHover={{ scale: 1.1 }}
                  className="text-blurple hover:text-purple-400 transition-colors"
                >
                  LinkedIn
                </motion.a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>The AI Level-Up</li>
                <li>The AI-First Leader</li>
                <li>AI Discovery Workshop</li>
                <li>AI Build Services</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-300 mb-2">info@i10iQ.ai</p>
              <p className="text-gray-300">Iowa, USA</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 i10iQ.AI. All rights reserved. Built with AI-powered development.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />

      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={isLearnMoreOpen} 
        onClose={() => setIsLearnMoreOpen(false)}
        onSchedule={() => setIsContactFormOpen(true)}
        onChat={() => {
          // Trigger chat widget to open
          const chatWidget = document.querySelector('.fixed.bottom-6.right-6 button');
          if (chatWidget) chatWidget.click();
        }}
      />

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
};

export default App;