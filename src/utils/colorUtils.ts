
/**
 * Linear interpolation between two colors
 */
export function interpolateColor(color1: number[], color2: number[], factor: number): number[] {
  // Ensure factor is between 0 and 1
  factor = Math.max(0, Math.min(1, factor));
  return color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
}

/**
 * Get interpolated color based on Kelvin value
 */
export function getColorArray(kelvin: number): number[] {
  // Ensure kelvin is within our supported range
  kelvin = Math.max(2000, Math.min(10000, kelvin));
  
  // From the original implementation
  if (kelvin <= 3500) {
    return interpolateColor([255, 140, 0], [255, 183, 76], (kelvin - 2000) / 1500);
  } else if (kelvin <= 5500) {
    return interpolateColor([255, 183, 76], [255, 255, 224], (kelvin - 3500) / 2000);
  } else {
    return interpolateColor([255, 255, 224], [200, 220, 255], (kelvin - 5500) / 4500);
  }
}

/**
 * Convert RGB array to hexadecimal string
 */
export function rgbToHex(rgb: number[]): string {
  return "#" + rgb.map(c => {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join('');
}

/**
 * Convert RGB to HSV (Hue in degrees, Saturation and Value in percentage)
 */
export function rgbToHsv(r: number, g: number, b: number): number[] {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  
  let h = 0;
  if (delta === 0) {
    h = 0;
  } else if (max === rNorm) {
    h = 60 * (((gNorm - bNorm) / delta) % 6);
  } else if (max === gNorm) {
    h = 60 * (((bNorm - rNorm) / delta) + 2);
  } else if (max === bNorm) {
    h = 60 * (((rNorm - gNorm) / delta) + 4);
  }
  
  if (h < 0) h += 360;
  
  const s = max === 0 ? 0 : (delta / max);
  const v = max;
  
  return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
}

/**
 * Convert RGB to HSL (Hue in degrees, Saturation and Lightness in percentage)
 */
export function rgbToHsl(r: number, g: number, b: number): number[] {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;
  
  let s = 0;
  let h = 0;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    if (max === rNorm) {
      h = ((gNorm - bNorm) / d) + (gNorm < bNorm ? 6 : 0);
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / d) + 2;
    } else if (max === bNorm) {
      h = ((rNorm - gNorm) / d) + 4;
    }
    
    h *= 60;
  }
  
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Convert RGB to Linear space (values normalized between 0 and 1)
 */
export function rgbToLinear(r: number, g: number, b: number): string[] {
  return [
    (r / 255).toFixed(3),
    (g / 255).toFixed(3),
    (b / 255).toFixed(3)
  ];
}

export type LightPreset = {
  name: string;
  rgb: string;
  rgbArray: number[];
  kelvin: number;
};

export const lightPresets: LightPreset[] = [
  {
    name: "Candle",
    rgb: "255, 147, 41",
    rgbArray: [255, 147, 41],
    kelvin: 2000
  },
  {
    name: "40W Tungsten",
    rgb: "255, 197, 143",
    rgbArray: [255, 197, 143],
    kelvin: 2500
  },
  {
    name: "100W Tungsten",
    rgb: "255, 214, 170",
    rgbArray: [255, 214, 170],
    kelvin: 2800
  },
  {
    name: "Halogen",
    rgb: "255, 241, 224",
    rgbArray: [255, 241, 224],
    kelvin: 3200
  },
  {
    name: "Carbon Arc",
    rgb: "255, 250, 244",
    rgbArray: [255, 250, 244],
    kelvin: 3500
  },
  {
    name: "High Noon Sun",
    rgb: "255, 255, 251",
    rgbArray: [255, 255, 251],
    kelvin: 5500
  },
  {
    name: "Direct Sunlight",
    rgb: "255, 255, 255",
    rgbArray: [255, 255, 255],
    kelvin: 6000
  },
  {
    name: "Overcast Sky",
    rgb: "201, 226, 255",
    rgbArray: [201, 226, 255],
    kelvin: 6500
  },
  {
    name: "Clear Blue Sky",
    rgb: "64, 156, 255",
    rgbArray: [64, 156, 255],
    kelvin: 7500
  },
  {
    name: "Warm Fluorescent",
    rgb: "255, 244, 229",
    rgbArray: [255, 244, 229],
    kelvin: 3000
  },
  {
    name: "Standard Fluorescent",
    rgb: "244, 255, 250",
    rgbArray: [244, 255, 250],
    kelvin: 4000
  },
  {
    name: "Cool White Fluorescent",
    rgb: "212, 235, 255",
    rgbArray: [212, 235, 255],
    kelvin: 5000
  },
  {
    name: "Full Spectrum Fluorescent",
    rgb: "255, 244, 242",
    rgbArray: [255, 244, 242],
    kelvin: 4200
  },
  {
    name: "Grow Light Fluorescent",
    rgb: "255, 239, 247",
    rgbArray: [255, 239, 247],
    kelvin: 3500
  },
  {
    name: "Black Light Fluorescent",
    rgb: "167, 0, 255",
    rgbArray: [167, 0, 255],
    kelvin: 3700
  },
  {
    name: "Mercury Vapor",
    rgb: "216, 247, 255",
    rgbArray: [216, 247, 255],
    kelvin: 6000
  },
  {
    name: "Sodium Vapor",
    rgb: "255, 209, 178",
    rgbArray: [255, 209, 178],
    kelvin: 2200
  },
  {
    name: "Metal Halide",
    rgb: "242, 252, 255",
    rgbArray: [242, 252, 255],
    kelvin: 4200
  },
  {
    name: "High Pressure Sodium",
    rgb: "255, 183, 76",
    rgbArray: [255, 183, 76],
    kelvin: 2100
  }
];
