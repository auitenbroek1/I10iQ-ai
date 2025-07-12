import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LearnMoreModal = ({ isOpen, onClose, onSchedule, onChat }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && window.scrollY > 200) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleScheduleClick = () => {
    onClose();
    setTimeout(() => onSchedule(), 300);
  };

  const handleChatClick = () => {
    onClose();
    setTimeout(() => onChat(), 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-navy">
              We Meet You Where You Are
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Our adaptive expertise ensures the right approach for your AI maturity level - whether you're just starting your AI journey or ready for advanced automation.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-navy text-lg">For AI Newcomers</h3>
                <p className="text-gray-600">
                  Patient, educational guidance through practical AI fundamentals that cut through the hype and focus on real business value.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold text-navy text-lg">For Experienced Users</h3>
                <p className="text-gray-600">
                  Direct, strategic insights that leverage your existing knowledge to implement advanced solutions and measurable outcomes.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-navy text-lg">For Advanced Builders</h3>
                <p className="text-gray-600">
                  Custom builds, advanced agent automation, and hands-on implementation of high-value AI projects that deliver competitive advantage.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <p className="text-navy font-medium text-center mb-4">
                Ready to transform AI curiosity into measurable business results?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handleScheduleClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Schedule Consultation
                </motion.button>
                
                <motion.button
                  onClick={handleChatClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all"
                >
                  Chat with Us
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LearnMoreModal;