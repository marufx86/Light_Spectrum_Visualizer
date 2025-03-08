
import React from 'react';
import { motion } from 'framer-motion';

interface LightDisplayProps {
  rgbArray: number[];
}

const LightDisplay: React.FC<LightDisplayProps> = ({ rgbArray }) => {
  const colorString = `rgb(${rgbArray.join(',')})`;
  
  return (
    <motion.div 
      className="w-full rounded-2xl h-64 sm:h-80 md:h-96 mb-8 relative overflow-hidden"
      animate={{
        boxShadow: `0px 0px 50px 10px rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, 0.5)`
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full rounded-2xl"
        animate={{ backgroundColor: colorString }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent rounded-b-2xl" />
    </motion.div>
  );
};

export default LightDisplay;
