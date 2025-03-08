
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LightDisplay from './LightDisplay';
import ColorInformation from './ColorInformation';
import PresetTable from './PresetTable';
import { getColorArray, lightPresets, LightPreset } from '../utils/colorUtils';

const KelvinVisualizer: React.FC = () => {
  const [kelvin, setKelvin] = useState(4000);
  const [rgbArray, setRgbArray] = useState<number[]>([255, 183, 76]);
  
  useEffect(() => {
    // Update RGB values when Kelvin changes
    const newRgbArray = getColorArray(kelvin);
    setRgbArray(newRgbArray);
  }, [kelvin]);
  
  const handleKelvinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKelvin(parseInt(e.target.value));
  };
  
  const handlePresetSelect = (preset: LightPreset) => {
    setRgbArray(preset.rgbArray);
    setKelvin(preset.kelvin);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-10 text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Kelvin Light Visualizer
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/60">
          Explore color temperature and visualize lighting effects
        </p>
      </motion.header>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LightDisplay rgbArray={rgbArray} />
      </motion.div>
      
      <motion.div
        className="mb-6 sm:mb-8 py-4 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm font-medium">2000K</span>
          <span className="text-sm font-medium">10000K</span>
        </div>
        <input
          type="range"
          min="2000"
          max="10000"
          step="100"
          value={kelvin}
          onChange={handleKelvinChange}
          className="light-slider w-full"
        />
        <div className="mt-2 flex justify-between items-center text-xs text-white/60">
          <span>Warm</span>
          <span>Neutral</span>
          <span>Cool</span>
        </div>
      </motion.div>
      
      {/* Center the color information area */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <ColorInformation kelvin={kelvin} rgbArray={rgbArray} />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 sm:mt-16"
      >
        <PresetTable presets={lightPresets} onSelectPreset={handlePresetSelect} />
      </motion.div>
    </div>
  );
};

export default KelvinVisualizer;
