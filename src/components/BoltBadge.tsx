import React from 'react';
import { motion } from 'framer-motion';

const BoltBadge = () => {
  return (
    <motion.a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      whileHover={{ scale: 1.1, rotate: 360 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          <img 
            src="public\black_circle_360x360.png" 
            alt="Powered by Bolt.new" 
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></div>
      </div>
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Powered by Bolt.new
      </div>
    </motion.a>
  );
};

export default BoltBadge;