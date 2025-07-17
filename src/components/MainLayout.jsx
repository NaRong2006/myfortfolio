// src/components/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, 
  FaBars, FaTimes, FaArrowUp, 
  FaTelegram, FaFacebook, FaTiktok 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Social links data for consistent usage across components
  const socialLinks = [
    { icon: <FaGithub size={20} />, url: "https://github.com/NaRong2006", name: "GitHub" },
    { icon: <FaLinkedin size={20} />, url: "https://linkedin.com/in/yourusername", name: "LinkedIn" },
    { icon: <FaTwitter size={20} />, url: "https://twitter.com/yourusername", name: "Twitter" },
    { icon: <FaTelegram size={20} />, url: "https://t.me/Maa_Rong", name: "Telegram" },
    { icon: <FaFacebook size={20} />, url: "https://www.facebook.com/boeun.narong.2025", name: "Facebook" },
    { icon: <FaTiktok size={20} />, url: "https://www.tiktok.com/@rong2006_", name: "TikTok" },
    { icon: <FaEnvelope size={20} />, url: "mailto:your.email@example.com", name: "Email" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const socialIconVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 overflow-x-hidden">
      {/* Enhanced Mega Navbar with sophisticated animations */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`bg-white/90 backdrop-blur-md ${scrolled ? 'shadow-lg' : 'shadow-sm'} sticky top-0 z-50 transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2
            }}
            className="flex items-center"
          >
            <motion.a 
              href="#" 
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3 transition-all group-hover:rotate-12"
                animate={{ 
                  rotate: [0, 10, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <span className="font-bold">BN</span>
              </motion.span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Boeun Narong
              </span>
            </motion.a>
          </motion.div>
          
          {/* Mobile menu button */}
          <motion.button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
          
          {/* Desktop Navigation with staggered animation */}
          <motion.ul 
            className="hidden md:flex space-x-8 text-gray-800 font-medium"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {['About', 'Projects', 'Skills', 'Testimonials', 'Contact'].map((item, i) => (
              <motion.li 
                key={item}
                custom={i}
                variants={navItemVariants}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="relative group py-2 px-1 hover:text-indigo-600 transition-colors"
                >
                  {item}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Social Icons - Desktop with enhanced animations */}
          <motion.div 
            className="hidden md:flex space-x-5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {socialLinks.slice(0, 7).map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors relative group"
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={social.name}
                custom={index}
              >
                {social.icon}
                <motion.span 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.name}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Mobile Menu with fluid animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                transition: { 
                  height: { type: "spring", stiffness: 100, damping: 15 },
                  opacity: { duration: 0.3 }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: { 
                  height: { type: "spring", stiffness: 100, damping: 15 },
                  opacity: { duration: 0.2 }
                }
              }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <motion.ul 
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {['About', 'Projects', 'Skills', 'Testimonials', 'Contact'].map((item, i) => (
                    <motion.li 
                      key={item}
                      variants={itemVariants}
                      custom={i}
                    >
                      <motion.a 
                        href={`#${item.toLowerCase()}`} 
                        className="block text-lg font-medium py-3 px-4 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div 
                  className="flex justify-center flex-wrap gap-4 mt-6 pb-2"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 transition-colors p-2"
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      aria-label={social.name}
                      custom={index}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main content with parallax-inspired entrance */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring",
            stiffness: 60,
            damping: 15,
            delay: 0.3
          }
        }}
        className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        {children}
      </motion.main>

      {/* Enhanced Mega Footer with staggered animations */}
      <motion.footer 
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Let's Build Something Amazing
                </motion.span>
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                I'm passionate about creating exceptional digital experiences that make an impact.
              </p>
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={containerVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-indigo-400 transition-colors"
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={social.name}
                    custom={index}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
              >
                {['About', 'Projects', 'Skills', 'Testimonials', 'Contact'].map((item, i) => (
                  <motion.li 
                    key={item}
                    variants={itemVariants}
                    custom={i}
                  >
                    <motion.a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-1 h-1 bg-indigo-400 rounded-full mr-3"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-6 text-white">Services</h4>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
              >
                {[
                  'Web Development',
                  'UI/UX Design',
                  'Mobile Apps',
                  'Technical Consulting',
                  'Performance Optimization'
                ].map((service, i) => (
                  <motion.li 
                    key={service}
                    variants={itemVariants}
                    custom={i}
                  >
                    <motion.span 
                      className="text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-1 h-1 bg-indigo-400 rounded-full mr-3"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      {service}
                    </motion.span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-6 text-white">Get In Touch</h4>
              <motion.ul 
                className="space-y-4 text-gray-300"
                variants={containerVariants}
              >
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <FaEnvelope className="mt-1 mr-3 text-indigo-400 flex-shrink-0" />
                  </motion.div>
                  <span>boeunnarong2006@gmail.com</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 mt-1 mr-3 text-indigo-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </motion.svg>
                  <span>+885 963328458</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.svg 
                    className="w-5 h-5 mt-1 mr-3 text-indigo-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </motion.svg>
                  <span>Phnom Penh</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t border-gray-700 mt-12 pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-gray-400"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              &copy; {new Date().getFullYear()} Boeun Narong. All rights reserved.
            </motion.p>
            <motion.p 
              className="mt-2 text-gray-500 text-sm"
              animate={{
                scale: [1, 1.01, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              Crafted with <motion.span 
                className="text-indigo-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >♥</motion.span> using React, Tailwind CSS, and Framer Motion
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>

      {/* Enhanced Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: [0, 360],
              transition: { 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                y: { type: "spring", stiffness: 100, damping: 10 }
              }
            }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 10, -10, 0],
              transition: { rotate: { duration: 0.5 } }
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;