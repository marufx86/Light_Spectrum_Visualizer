
import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Eye } from 'lucide-react';
import { LightPreset } from '../utils/colorUtils';
import { useToast } from '@/components/ui/use-toast';

interface PresetTableProps {
  presets: LightPreset[];
  onSelectPreset: (preset: LightPreset) => void;
}

const PresetTable: React.FC<PresetTableProps> = ({ presets, onSelectPreset }) => {
  const { toast } = useToast();
  
  const copyRgb = (rgb: string, name: string) => {
    navigator.clipboard.writeText(rgb);
    
    toast({
      title: "RGB Copied",
      description: `${name}: ${rgb}`,
      duration: 2000,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="rounded-xl overflow-hidden shadow-lg border border-white/20 bg-white/5 backdrop-blur-md"
    >
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-medium mb-4">Lighting Presets</h2>
        
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-black/20">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Name</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Temperature</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium hidden sm:table-cell">RGB</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {presets.map((preset, index) => (
                <motion.tr
                  key={preset.name}
                  className="hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{preset.name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{preset.kelvin}K</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-mono hidden sm:table-cell">{preset.rgb}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyRgb(preset.rgb, preset.name)}
                        className="p-1 rounded-full hover:bg-white/20 transition-all"
                        aria-label="Copy RGB values"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => onSelectPreset(preset)}
                        className="p-1 rounded-full hover:bg-white/20 transition-all"
                        aria-label="Visualize preset"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-xs sm:text-sm text-muted-foreground bg-black/10 rounded-lg p-3">
          <p>
            <strong>Note:</strong> Recommended settings for 3D rendering software —
            Intensity: 1.0, Falloff: 2.0 (Quadratic). Adjust radius as needed.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PresetTable;
