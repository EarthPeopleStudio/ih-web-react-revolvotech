import React, { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-react";
import dogAnimation from "../../assets/animations/dog.json";
import cupAnimation from "../../assets/animations/cup.json";
import { AiOutlineCode } from 'react-icons/ai';

// Import styled components
import {
  CodeShowcaseGrid,
  CodeShowcaseItem,
  CodeShowcaseHeader,
  CodeShowcaseTitle,
  CodeShowcaseDescription,
  CodeDemoContainer,
  CodeSnippetContainer,
  CodeHeader,
  CodeFileName,
  CodeLanguage,
  DemoContainer,
  PreBlock,
  RainbowCode
} from '../StyledComponents';

// CSS Animation Demo Component
const CSSAnimationDemo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('pulse');
  
  const animationOptions = [
    { id: 'pulse', name: 'Pulse' },
    { id: 'shake', name: 'Shake' },
    { id: 'bounce', name: 'Bounce' },
    { id: 'float', name: 'Float' },
    { id: 'glitch', name: 'Glitch' },
    { id: 'neon', name: 'Neon' },
    { id: 'morph', name: 'Morph' }
  ];
  
  const getAnimation = () => {
    if (!isAnimating) return 'none';
    return `${currentAnimation} ${currentAnimation === 'bounce' ? '2s' : currentAnimation === 'float' || currentAnimation === 'morph' ? '3s' : '1.5s'} infinite`;
  };
  
  const buttonStyle = {
    padding: '14px 28px',
    background: isAnimating ? (currentAnimation === 'neon' ? '#121212' : '#E83B6C') : '#ff5470',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    transform: isAnimating && currentAnimation !== 'bounce' && currentAnimation !== 'float' && currentAnimation !== 'shake' && currentAnimation !== 'glitch' ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: isAnimating && currentAnimation !== 'neon' 
      ? '0 8px 20px rgba(255, 84, 112, 0.4)' 
      : '0 4px 10px rgba(255, 84, 112, 0.2)',
    animation: getAnimation(),
    textShadow: isAnimating && (currentAnimation === 'glitch' || currentAnimation === 'neon') 
      ? (currentAnimation === 'glitch' ? '-2px 0 #00fffc, 2px 2px #fc00ff' : 'none')
      : 'none'
  };
  
  const selectorStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '25px'
  };
  
  const animSelectBtnStyle = (active) => ({
    padding: '10px 14px',
    background: active ? 'rgba(255, 84, 112, 0.2)' : 'rgba(30, 30, 30, 0.5)',
    color: active ? '#ff5470' : 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${active ? '#ff5470' : 'rgba(255, 255, 255, 0.1)'}`,
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: active ? '600' : '400',
    cursor: 'pointer'
  });
  
  return (
    <div style={{textAlign: 'center', width: '100%'}}>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 84, 112, 0.6);
            }
            70% {
              transform: scale(1.08);
              box-shadow: 0 0 0 15px rgba(255, 84, 112, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 84, 112, 0);
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-6px) rotate(-1deg); }
            20%, 40%, 60%, 80% { transform: translateX(6px) rotate(1deg); }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
            40% { transform: translateY(-25px) scale(1.1); }
            60% { transform: translateY(-15px) scale(1.05); }
          }
          
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-12px) rotate(3deg); }
            50% { transform: translateY(0px) rotate(0deg); }
            75% { transform: translateY(12px) rotate(-3deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          
          @keyframes glitch {
            0%, 100% { 
              transform: translate(0); 
              text-shadow: -2px 0 #00fffc, 2px 2px #fc00ff;
            }
            20% { 
              transform: translate(-5px, 5px); 
              text-shadow: 2px 0 #00fffc, -2px -2px #fc00ff;
            }
            40% { 
              transform: translate(5px, -5px); 
              text-shadow: -2px 0 #00fffc, 2px 2px #fc00ff;
            }
            60% { 
              transform: translate(-5px, 5px); 
              text-shadow: 2px 0 #fc00ff, -2px -2px #00fffc;
            }
            80% { 
              transform: translate(5px, -5px); 
              text-shadow: -2px 0 #fc00ff, 2px 2px #00fffc;
            }
          }
          
          @keyframes neon {
            0%, 100% {
              text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff5470, 0 0 20px #ff5470, 0 0 25px #ff5470;
              box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff5470, 0 0 20px #ff5470;
            }
            50% {
              text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #ff5470, 0 0 10px #ff5470, 0 0 12px #ff5470;
              box-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #ff5470, 0 0 10px #ff5470;
            }
          }
          
          @keyframes morph {
            0%, 100% { border-radius: 8px; }
            25% { border-radius: 50% 8px 8px 8px; transform: rotate(-5deg); }
            50% { border-radius: 8px 50% 8px 8px; transform: rotate(5deg); }
            75% { border-radius: 8px 8px 50% 8px; transform: rotate(-5deg); }
          }
        `}
      </style>
      
      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '20px',
        padding: '15px',
        borderRadius: '12px',
        background: 'rgba(18, 18, 18, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={selectorStyle}>
          {animationOptions.map(option => (
            <button 
              key={option.id}
              style={animSelectBtnStyle(currentAnimation === option.id)}
              onClick={() => {
                setCurrentAnimation(option.id);
                if (!isAnimating) setIsAnimating(true);
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
        
        <button 
          style={buttonStyle}
          onClick={() => setIsAnimating(!isAnimating)}
        >
          {isAnimating ? 'Stop Animation' : 'Start Animation'}
        </button>
      </div>
    </div>
  );
};

// Lottie Animation Demo
const LottieAnimationDemo = () => {
  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);
  const dogAnimationRef = useRef(null);
  const cupAnimationRef = useRef(null);
  
  const buttonStyle = {
    padding: '10px 20px',
    background: '#ff5470',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '15px'
  };
  
  const additionalStyles = `
    @keyframes pulse-glow {
      0% {
        opacity: 0.6;
        transform: scale(0.85);
      }
      50% {
        opacity: 0.8;
        transform: scale(1);
      }
      100% {
        opacity: 0.9;
        transform: scale(1.15);
      }
    }
  `;
  
  return (
    <div style={{textAlign: 'center', width: '100%'}}>
      <style>
        {additionalStyles}
      </style>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Doggo Animation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '15px',
          width: '45%',
          minWidth: '160px'
        }}>
          <h4 style={{margin: '0 0 10px 0', color: 'rgba(255, 255, 255, 0.9)'}}>Splish Splash Doggo</h4>
          <div style={{
            width: '120px', 
            height: '120px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(152, 175, 244, 0.45) 0%, rgba(152, 175, 244, 0.25) 50%, rgba(152, 175, 244, 0) 70%)',
              borderRadius: '50%',
              filter: 'blur(11px)',
              zIndex: -1,
              animation: 'pulse-glow 5s infinite alternate ease-in-out',
              left: '-10%',
              top: '-10%'
            }}></div>
            <Lottie 
              animationData={dogAnimation}
              loop={true}
              lottieRef={dogAnimationRef}
              speed={1}
            />
          </div>
          <button 
            style={buttonStyle}
            onClick={() => {
              if (isPaused1) {
                dogAnimationRef.current?.play();
              } else {
                dogAnimationRef.current?.pause();
              }
              setIsPaused1(!isPaused1);
            }}
          >
            {isPaused1 ? 'Play' : 'Pause'}
          </button>
        </div>
        
        {/* Cup Animation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '15px',
          width: '45%',
          minWidth: '160px'
        }}>
          <h4 style={{margin: '0 0 10px 0', color: 'rgba(255, 255, 255, 0.9)'}}>Brew-tiful Morning</h4>
          <div style={{
            width: '120px', 
            height: '120px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(254, 164, 148, 0.45) 0%, rgba(254, 164, 148, 0.25) 50%, rgba(254, 164, 148, 0) 70%)',
              borderRadius: '50%',
              filter: 'blur(11px)',
              zIndex: -1,
              animation: 'pulse-glow 5s infinite alternate ease-in-out',
              animationDelay: '2.5s',
              left: '-10%',
              top: '-10%'
            }}></div>
            <Lottie 
              animationData={cupAnimation}
              loop={true}
              lottieRef={cupAnimationRef}
              speed={1}
            />
          </div>
          <button 
            style={buttonStyle}
            onClick={() => {
              if (isPaused2) {
                cupAnimationRef.current?.play();
              } else {
                cupAnimationRef.current?.pause();
              }
              setIsPaused2(!isPaused2);
            }}
          >
            {isPaused2 ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Color Palette Demo
const ColorPaletteDemo = () => {
  const [baseColor, setBaseColor] = useState('#ff5470');
  const [colorScheme, setColorScheme] = useState([]);
  const [colorSchemeType, setColorSchemeType] = useState('splitComplementary');
  const [copiedColor, setCopiedColor] = useState(null);
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    // Generate the color scheme when base color or scheme type changes
    setColorScheme(generateColorScheme(baseColor, colorSchemeType));
  }, [baseColor, colorSchemeType]);
  
  // Handle color copying with visual feedback
  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setShowToast(true);
    
    // Hide toast after 2 seconds
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => setCopiedColor(null), 300); // Clear copied color after fade out
    }, 2000);
  };
  
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
  };
  
  // Convert RGB to hex
  const rgbToHex = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  
  // Convert hex to HSL
  const hexToHsl = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    
    // Convert RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
        default: h = 0;
      }
      
      h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  };
  
  // Convert HSL to hex
  const hslToHex = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return rgbToHex(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    );
  };
  
  // Generate the color scheme
  const generateColorScheme = (hex, type) => {
    const { h, s, l } = hexToHsl(hex);
    
    switch (type) {
      case 'splitComplementary': {
        // Split complementary colors (base + 2 colors 150° apart from the base + a lighter shade)
        const complementary = (h + 180) % 360;
        return [
          hex, // Base color
          hslToHex((complementary - 30) % 360, s, l), // Split comp 1
          hslToHex((complementary + 30) % 360, s, l), // Split comp 2
          hslToHex(h, s, Math.min(l + 40, 95)) // Lighter shade for backgrounds
        ];
      }
      case 'tetradic': {
        // Tetradic (rectangle) color scheme
        return [
          hex, // Base color
          hslToHex((h + 60) % 360, s, l), // 60° from base
          hslToHex((h + 180) % 360, s, l), // Complementary
          hslToHex((h + 240) % 360, s, l), // 240° from base
        ];
      }
      case 'monochromatic': {
        // Monochromatic (different brightness levels)
        return [
          hex, // Base color
          hslToHex(h, s, Math.max(25, l - 20)), // Darker
          hslToHex(h, Math.max(s - 15, 0), Math.min(l + 35, 95)), // Lighter
          hslToHex(h, Math.min(s + 15, 100), Math.max(l - 40, 10)) // More saturated & darker
        ];
      }
      case 'analogous': {
        // Analogous color scheme (adjacent on the color wheel)
        return [
          hex, // Base color
          hslToHex((h + 30) % 360, s, l), // 30° from base
          hslToHex((h - 30 + 360) % 360, s, l), // -30° from base
          hslToHex((h + 60) % 360, s, l) // 60° from base
        ];
      }
      default:
        return [hex];
    }
  };
  
  // Function to determine if text should be white or black based on background
  const getTextColor = (backgroundColor) => {
    const { r, g, b } = hexToRgb(backgroundColor);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };
  
  const colorSchemeOptions = [
    { value: 'splitComplementary', label: 'Split Complementary' },
    { value: 'tetradic', label: 'Tetradic' },
    { value: 'monochromatic', label: 'Monochromatic' },
    { value: 'analogous', label: 'Analogous' }
  ];
  
  const roles = ['Primary', 'Secondary', 'Accent', 'Background'];
  
  // Reusable button style with hover effect
  const buttonStyle = {
    padding: '8px 12px',
    background: '#ff5470',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    marginTop: '10px'
  };
  
  // Toast notification styles
  const toastStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: `translateX(-50%) translateY(${showToast ? '0' : '20px'})`,
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    opacity: showToast ? 1 : 0,
    transition: 'all 0.3s ease',
    zIndex: 100,
    pointerEvents: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  };
  
  return (
    <div style={{width: '100%', position: 'relative'}}>
      <div style={{
        marginBottom: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '15px'
      }}>
        <div style={{
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <label style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem'}}>
              Base Color:
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input 
                type="color" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                style={{
                  width: '40px', 
                  height: '40px', 
                  padding: 0, 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  transform: 'scale(1)',
                  ':hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                borderRadius: '4px',
                padding: '2px 4px',
                fontSize: '0.6rem',
                opacity: 0,
                transition: 'opacity 0.2s ease',
                pointerEvents: 'none',
                '.color-input:hover + &': {
                  opacity: 1
                }
              }}>
                Pick
              </div>
            </div>
            <span 
              style={{
                color: 'rgba(255, 255, 255, 0.6)', 
                fontSize: '0.85rem',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleCopyColor(baseColor)}
            >
              {baseColor}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <label style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem'}}>
              Scheme:
            </label>
            <select 
              value={colorSchemeType}
              onChange={(e) => setColorSchemeType(e.target.value)}
              style={{
                padding: '8px 12px 8px 12px',
                paddingRight: '30px',
                borderRadius: '4px',
                background: '#2a2a2a',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                appearance: 'none',
                MozAppearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'rgba(255,255,255,0.5)\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                backgroundSize: '16px'
              }}
            >
              {colorSchemeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            style={{
              ...buttonStyle,
              marginTop: 0,
              background: 'linear-gradient(135deg, #ff3e6d, #ff5470)',
              fontSize: '0.75rem',
              padding: '6px 10px',
              boxShadow: '0 3px 10px rgba(255, 62, 109, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(255, 62, 109, 0.4)',
              }
            }}
            onClick={() => {
              // Generate random color
              const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
              setBaseColor(randomColor);
            }}
          >
            Random
          </button>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          {colorScheme.map((color, index) => (
            <div 
              key={index}
              style={{
                width: '100px',
                height: '100px',
                background: color,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: getTextColor(color),
                fontSize: '0.8rem',
                fontWeight: '600',
                boxShadow: copiedColor === color 
                  ? '0 0 0 3px rgba(255, 255, 255, 0.8), 0 4px 20px rgba(0, 0, 0, 0.3)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                gap: '5px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: copiedColor === color ? 'scale(1.05)' : 'scale(1)'
              }}
              onClick={() => handleCopyColor(color)}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: '4px',
                background: 'rgba(0, 0, 0, 0.3)',
                fontSize: '0.7rem',
                fontWeight: '600',
                textAlign: 'center',
                color: 'white'
              }}>
                {roles[index]}
              </div>
              <div style={{
                marginTop: '20px'
              }}>
                {color}
              </div>
              <div 
                style={{
                  fontSize: '0.6rem',
                  opacity: 0.8,
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                {copiedColor === color ? 'Copied!' : 'Click to copy'}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.7)',
          borderLeft: '3px solid #ff5470',
          textAlign: 'left',
          display: colorScheme.length > 0 ? 'block' : 'none'
        }}>
          <strong style={{color: 'white', display: 'block', marginBottom: '5px'}}>Design Tips:</strong>
          <ul style={{
            margin: '0',
            padding: '0 0 0 20px',
            listStyleType: 'circle',
            fontSize: '0.75rem',
            lineHeight: '1.5'
          }}>
            <li>Use <strong>Primary</strong> for main elements like headers and primary buttons</li>
            <li>Use <strong>Secondary</strong> for supporting UI components and accents</li>
            <li>Use <strong>Accent</strong> for call-to-action buttons and important highlights</li>
            <li>Use <strong>Background</strong> for large surfaces and containers</li>
          </ul>
        </div>
      </div>
      
      {/* Toast notification */}
      <div style={toastStyle}>
        {copiedColor && copiedColor.startsWith('#') 
          ? `Copied ${copiedColor} to clipboard!` 
          : copiedColor}
      </div>
    </div>
  );
};

// Main UIUXShowcase Component
const UIUXShowcase = () => {
  return (
    <CodeShowcaseGrid>
      {/* Lottie Animations Example */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Interactive Animations
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Vector animations that are scalable and lightweight for web and mobile.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer data-nocopy="true">
            <CodeHeader>
              <CodeFileName>InteractiveAnimation.jsx</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <PreBlock>
{`import React, { 
  useState, 
  useRef 
} from 'react';
import InteractiveAnimation from 
  'interactive-animation';
import animationData from 
  '../animations/animation.json';

const InteractiveAnimationComponent = 
  () => {
  const [isPlaying, setIsPlaying] = 
    useState(true);
  const animationRef = 
    useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      animationRef.current?.pause();
    } else {
      animationRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="animation-container">
      <InteractiveAnimation
        animRef={animationRef}
        animationData={animationData}
        loop={true}
        autoplay={isPlaying}
        style={{ 
          width: 200, 
          height: 200 
        }}
      />
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default 
  InteractiveAnimationComponent;`}
            </PreBlock>
          </CodeSnippetContainer>
          <DemoContainer>
            <LottieAnimationDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>

      {/* Color Palette Generator */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Color Palette Generator
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Interactive color palette generator with harmonious color calculations.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer data-nocopy="true">
            <CodeHeader>
              <CodeFileName>ColorPalette.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <PreBlock>
{`class ColorPalette {
  constructor(baseColor) {
    this.baseColor = baseColor;
    this.colorType = 
      'complementary'; // Default
  }
  
  /**
   * Set the color harmony type
   * @param {string} type - 
   *  complementary, analogous, 
   *  triadic, monochromatic,
   *  splitComplementary, 
   *  tetradic, square
   */
  setColorType(type) {
    this.colorType = type;
    return this;
  }
  
  // Convert hex to RGB
  hexToRgb(hex) {
    hex = hex.replace('#', '');
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
  }
  
  // Convert RGB to hex
  rgbToHex(r, g, b) {
    return '#' + 
      ((1 << 24) + 
       (r << 16) + 
       (g << 8) + b)
        .toString(16).slice(1);
  }
  
  // Convert hex to HSL
  hexToHsl(hex) {
    const { r, g, b } = 
      this.hexToRgb(hex);
    
    // Convert RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = 
      Math.max(rNorm, gNorm, bNorm);
    const min = 
      Math.min(rNorm, gNorm, bNorm);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? 
        d / (2 - max - min) : 
        d / (max + min);
      
      switch (max) {
        case rNorm: 
          h = (gNorm - bNorm) / d + 
            (gNorm < bNorm ? 6 : 0); 
          break;
        case gNorm: 
          h = (bNorm - rNorm) / d + 2; 
          break;
        case bNorm: 
          h = (rNorm - gNorm) / d + 4; 
          break;
        default: h = 0;
      }
      
      h /= 6;
    }
    
    return { 
      h: h * 360, 
      s: s * 100, 
      l: l * 100 
    };
  }
  
  // Convert HSL to hex
  hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) 
          return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) 
          return p + 
            (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? 
        l * (1 + s) : 
        l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return this.rgbToHex(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    );
  }
  
  // Get complementary color
  getComplementary() {
    const { h, s, l } = 
      this.hexToHsl(this.baseColor);
    return this.hslToHex(
      (h + 180) % 360, s, l);
  }
  
  // Get analogous colors
  getAnalogous(angle = 30) {
    const { h, s, l } = 
      this.hexToHsl(this.baseColor);
    return [
      this.hslToHex(
        (h + angle) % 360, s, l),
      this.hslToHex(
        (h - angle + 360) % 360, s, l)
    ];
  }
  
  // Get triadic colors
  getTriadic() {
    const { h, s, l } = 
      this.hexToHsl(this.baseColor);
    return [
      this.hslToHex(
        (h + 120) % 360, s, l),
      this.hslToHex(
        (h + 240) % 360, s, l)
    ];
  }
  
  // Get monochromatic colors
  getMonochromatic() {
    const { h, s, l } = 
      this.hexToHsl(this.baseColor);
    return [
      this.hslToHex(
        h, s, Math.max(0, l - 30)),
      this.hslToHex(
        h, s, Math.max(0, l - 15)),
      this.hslToHex(
        h, s, Math.min(100, l + 15)),
      this.hslToHex(
        h, s, Math.min(100, l + 30))
    ];
  }
  
  // Generate the color palette
  generatePalette() {
    const palette = {
      base: this.baseColor,
      colors: []
    };
    
    switch (this.colorType) {
      case 'complementary':
        palette.colors = 
          [this.getComplementary()];
        break;
      case 'analogous':
        palette.colors = 
          this.getAnalogous();
        break;
      case 'triadic':
        palette.colors = 
          this.getTriadic();
        break;
      case 'monochromatic':
        palette.colors = 
          this.getMonochromatic();
        break;
      default:
        palette.colors = 
          [this.getComplementary()];
    }
    
    return palette;
  }
  
  // Get accessible text color
  getAccessibleTextColor(
    bgColor = this.baseColor
  ) {
    const { r, g, b } = 
      this.hexToRgb(bgColor);
    
    // Calculate luminance (WCAG)
    const luminance = 
      0.2126 * (r / 255) + 
      0.7152 * (g / 255) + 
      0.0722 * (b / 255);
    
    // Return appropriate color
    return luminance > 0.5 ? 
      '#000000' : '#ffffff';
  }
}`}
            </PreBlock>
          </CodeSnippetContainer>
          <DemoContainer>
            <ColorPaletteDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>

      {/* CSS Animation Example - Enhanced Version */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            CSS Animations & Transitions
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Modern CSS animations with keyframes for engaging user interfaces and interactive elements.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer data-nocopy="true">
            <CodeHeader>
              <CodeFileName>advanced-animations.css</CodeFileName>
              <CodeLanguage>CSS</CodeLanguage>
            </CodeHeader>
            <PreBlock>
{`/* Core button styles */
.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;
}

/* Animation Variations */
.btn.pulse {
  animation: 
    pulse 1.5s infinite;
  background: 
    linear-gradient(
      45deg, 
      #ff5470, 
      #ff7eb3
    );
  color: white;
}

.btn.shake {
  animation: 
    shake 0.8s ease-in-out 
    infinite;
  background: #ff5470;
  color: white;
}

.btn.bounce {
  animation: 
    bounce 2s ease infinite;
  background: #ff5470;
  color: white;
}

.btn.float {
  animation: 
    float 3s ease-in-out 
    infinite;
  background: #ff5470;
  color: white;
}

.btn.glitch {
  animation: 
    glitch 1s ease-in-out 
    infinite;
  text-shadow: 
    -2px 0 #00fffc, 
    2px 2px #fc00ff;
  background: #222;
  color: white;
}

.btn.neon {
  animation: 
    neon 1.5s ease-in-out 
    infinite;
  background-color: #121212;
  color: #fff;
  border: 2px solid #ff5470;
}

.btn.morph {
  animation: 
    morph 3s ease-in-out 
    infinite;
  background: 
    linear-gradient(
      45deg, 
      #ff5470, 
      #e83b6c
    );
  color: white;
}

/* Liquid Animation */
.btn.liquid {
  position: relative;
  background: #4973ff;
  color: white;
  border-radius: 8px;
  z-index: 1;
  overflow: hidden;
}

.btn.liquid::before {
  content: '';
  position: absolute;
  top: -80%;
  left: 0%;
  width: 140%;
  height: 150%;
  background: 
    rgba(255, 255, 255, 0.3);
  transform: rotate(45deg);
  z-index: -1;
  animation: 
    liquid 5s linear infinite;
}

@keyframes liquid {
  0% {
    top: -80%;
    left: 0%;
  }
  25% {
    top: -60%;
    left: 30%;
  }
  50% {
    top: -40%;
    left: 0%;
  }
  75% {
    top: -20%;
    left: -30%;
  }
  100% {
    top: 0%;
    left: 0%;
  }
}

/* Gradient Animation */
.btn.gradient {
  background: 
    linear-gradient(
      45deg,
      #ff5470,
      #ff8b3d,
      #4973ff,
      #49c5ff,
      #ff5470
    );
  background-size: 400% 400%;
  animation: 
    gradient 8s linear infinite;
  color: white;
}

@keyframes gradient {
  0% { 
    background-position: 0% 50%; 
  }
  50% { 
    background-position: 100% 50%; 
  }
  100% { 
    background-position: 0% 50%; 
  }
}

/* Ripple Effect */
.btn.ripple {
  background: #4973ff;
  color: white;
  overflow: hidden;
  position: relative;
}

.btn.ripple .ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: 
    rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: 
    ripple 2s ease-out;
  opacity: 0;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Keyframes for Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 
      0 0 0 0 
      rgba(255, 84, 112, 0.6);
  }
  70% {
    transform: scale(1.08);
    box-shadow: 
      0 0 0 15px 
      rgba(255, 84, 112, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 
      0 0 0 0 
      rgba(255, 84, 112, 0);
  }
}

@keyframes shake {
  0%, 100% { 
    transform: 
      translateX(0) rotate(0); 
  }
  10%, 30%, 50%, 70%, 90% { 
    transform: 
      translateX(-6px) 
      rotate(-2deg); 
  }
  20%, 40%, 60%, 80% { 
    transform: 
      translateX(6px) 
      rotate(2deg); 
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { 
    transform: 
      translateY(0) scale(1); 
  }
  40% { 
    transform: 
      translateY(-25px) scale(1.1); 
  }
  60% { 
    transform: 
      translateY(-15px) scale(1.05); 
  }
}

@keyframes float {
  0% { 
    transform: 
      translateY(0px) rotate(0deg); 
  }
  25% { 
    transform: 
      translateY(-12px) rotate(3deg); 
  }
  50% { 
    transform: 
      translateY(0px) rotate(0deg); 
  }
  75% { 
    transform: 
      translateY(12px) rotate(-3deg); 
  }
  100% { 
    transform: 
      translateY(0px) rotate(0deg); 
  }
}

@keyframes glitch {
  0%, 100% { 
    transform: translate(0); 
    text-shadow: -2px 0 #00fffc, 2px 2px #fc00ff;
  }
  20% { 
    transform: translate(-5px, 5px); 
    text-shadow: 2px 0 #00fffc, -2px -2px #fc00ff;
  }
  40% { 
    transform: translate(5px, -5px); 
    text-shadow: -2px 0 #00fffc, 2px 2px #fc00ff;
  }
  60% { 
    transform: translate(-5px, 5px); 
    text-shadow: 2px 0 #fc00ff, -2px -2px #00fffc;
  }
  80% { 
    transform: translate(5px, -5px); 
    text-shadow: -2px 0 #fc00ff, 2px 2px #00fffc;
  }
}`}
            </PreBlock>
          </CodeSnippetContainer>
          <DemoContainer>
            <ImprovedCSSAnimationDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

// Enhanced CSS Animation Demo Component
const ImprovedCSSAnimationDemo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('pulse');
  const [previewAnimation, setPreviewAnimation] = useState('');
  
  const animationOptions = [
    { id: 'pulse', name: 'Pulse' },
    { id: 'shake', name: 'Shake' },
    { id: 'bounce', name: 'Bounce' },
    { id: 'float', name: 'Float' },
    { id: 'glitch', name: 'Glitch' },
    { id: 'neon', name: 'Neon' },
    { id: 'morph', name: 'Morph' },
    { id: 'liquid', name: 'Liquid' },
    { id: 'gradient', name: 'Gradient' },
    { id: 'ripple', name: 'Ripple' }
  ];
  
  const getAnimation = () => {
    if (!isAnimating) return 'none';
    return `${currentAnimation} ${getAnimationDuration()} infinite`;
  };
  
  const getAnimationDuration = () => {
    switch(currentAnimation) {
      case 'bounce': return '2s';
      case 'float': case 'morph': return '3s';
      case 'shake': return '0.8s';
      case 'liquid': return '4s';
      case 'gradient': return '8s';
      case 'ripple': return '2.5s';
      default: return '1.5s';
    }
  };
  
  const getButtonBackground = () => {
    if (!isAnimating) return '#ff5470';
    
    switch(currentAnimation) {
      case 'neon': return '#121212';
      case 'glitch': return '#222222';
      case 'liquid': return '#4973ff';
      case 'gradient': return 'linear-gradient(45deg, #ff5470, #ff8b3d, #4973ff, #49c5ff, #ff5470)';
      case 'morph': return 'linear-gradient(45deg, #ff5470, #e83b6c)';
      case 'pulse': return 'linear-gradient(45deg, #ff5470, #ff7eb3)';
      case 'ripple': return '#4973ff';
      default: return '#ff5470';
    }
  };
  
  const buttonStyle = {
    padding: '14px 28px',
    background: getButtonBackground(),
    color: 'white',
    border: currentAnimation === 'neon' ? '2px solid #ff5470' : 'none',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    transform: isAnimating && currentAnimation !== 'bounce' && currentAnimation !== 'float' && currentAnimation !== 'shake' && currentAnimation !== 'glitch' ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: isAnimating && currentAnimation !== 'neon' 
      ? '0 8px 20px rgba(255, 84, 112, 0.4)' 
      : '0 4px 10px rgba(255, 84, 112, 0.2)',
    animation: currentAnimation === 'gradient' && isAnimating ? 'gradient 8s linear infinite' : getAnimation(),
    textShadow: isAnimating && (currentAnimation === 'glitch' || currentAnimation === 'neon') 
      ? (currentAnimation === 'glitch' ? '-2px 0 #00fffc, 2px 2px #fc00ff' : 'none')
      : 'none',
    backgroundSize: currentAnimation === 'gradient' && isAnimating ? '400% 400%' : '100% 100%'
  };
  
  const animationPreviewStyle = {
    width: '100%',
    height: '40px',
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: '#fff',
    opacity: 0.7
  };
  
  const selectorContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px',
    marginBottom: '20px'
  };
  
  const selectorStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: '10px',
    width: '100%'
  };
  
  const animSelectBtnStyle = (active, hover) => ({
    padding: '10px 8px',
    background: hover ? 'rgba(255, 84, 112, 0.3)' : active ? 'rgba(255, 84, 112, 0.2)' : 'rgba(30, 30, 30, 0.5)',
    color: active || hover ? '#ff5470' : 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${active ? '#ff5470' : hover ? 'rgba(255, 84, 112, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: active ? '600' : '400',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });
  
  const getAnimationDescription = () => {
    switch(currentAnimation) {
      case 'pulse': return 'Attracts attention by creating a pulsing effect';
      case 'shake': return 'Indicates errors or urgency with quick movements';
      case 'bounce': return 'Creates playful, energetic interactions';
      case 'float': return 'Adds subtle movement for a lively interface';
      case 'glitch': return 'Creates a digital distortion effect for tech themes';
      case 'neon': return 'Emulates bright neon lights with glowing effect';
      case 'morph': return 'Smoothly changes shape for organic transitions';
      case 'liquid': return 'Simulates flowing liquid across elements';
      case 'gradient': return 'Transitions smoothly between colors for a modern look';
      case 'ripple': return 'Creates an interactive ripple effect like material design';
      default: return 'Select an animation to see details';
    }
  };
  
  return (
    <div style={{textAlign: 'center', width: '100%'}}>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 84, 112, 0.6);
            }
            70% {
              transform: scale(1.08);
              box-shadow: 0 0 0 15px rgba(255, 84, 112, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 84, 112, 0);
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-6px) rotate(-2deg); }
            20%, 40%, 60%, 80% { transform: translateX(6px) rotate(2deg); }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
            40% { transform: translateY(-25px) scale(1.1); }
            60% { transform: translateY(-15px) scale(1.05); }
          }
          
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-12px) rotate(3deg); }
            50% { transform: translateY(0px) rotate(0deg); }
            75% { transform: translateY(12px) rotate(-3deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          
          @keyframes glitch {
            0%, 100% { 
              transform: translate(0); 
              text-shadow: -2px 0 #00fffc, 2px 2px #fc00ff;
            }
            20% { 
              transform: translate(-5px, 5px); 
              text-shadow: 2px 0 #00fffc, -2px -2px #fc00ff;
            }
            40% { 
              transform: translate(5px, -5px); 
              text-shadow: -2px 0 #00fffc, 2px 2px #fc00ff;
            }
            60% { 
              transform: translate(-5px, 5px); 
              text-shadow: 2px 0 #fc00ff, -2px -2px #00fffc;
            }
            80% { 
              transform: translate(5px, -5px); 
              text-shadow: -2px 0 #fc00ff, 2px 2px #00fffc;
            }
          }
          
          @keyframes neon {
            0%, 100% {
              text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff5470, 0 0 20px #ff5470, 0 0 25px #ff5470;
              box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff5470, 0 0 20px #ff5470;
            }
            50% {
              text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #ff5470, 0 0 10px #ff5470, 0 0 12px #ff5470;
              box-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #ff5470, 0 0 10px #ff5470;
            }
          }
          
          @keyframes morph {
            0%, 100% { border-radius: 8px; }
            25% { border-radius: 50% 8px 8px 8px; transform: rotate(-5deg); }
            50% { border-radius: 8px 50% 8px 8px; transform: rotate(5deg); }
            75% { border-radius: 8px 8px 50% 8px; transform: rotate(-5deg); }
          }
          
          @keyframes liquid {
            0% {
              top: -80%;
              left: 0%;
            }
            25% {
              top: -60%;
              left: 30%;
            }
            50% {
              top: -40%;
              left: 0%;
            }
            75% {
              top: -20%;
              left: -30%;
            }
            100% {
              top: 0%;
              left: 0%;
            }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 0.8;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
      
      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '25px',
        padding: '20px'
      }}>
        <div style={selectorContainerStyle}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            <h4 style={{
              margin: 0,
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              textAlign: 'left'
            }}>
              Animation Type
            </h4>
          </div>
          
          <div style={selectorStyle}>
            {animationOptions.map(option => (
              <button 
                key={option.id}
                style={animSelectBtnStyle(currentAnimation === option.id, previewAnimation === option.id)}
                onClick={() => {
                  setCurrentAnimation(option.id);
                  if (!isAnimating) setIsAnimating(true);
                  setPreviewAnimation('');
                }}
                onMouseEnter={() => setPreviewAnimation(option.id)}
                onMouseLeave={() => setPreviewAnimation('')}
              >
                {option.name}
              </button>
            ))}
          </div>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '10px 15px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'left',
            borderLeft: '3px solid #ff5470'
          }}>
            {getAnimationDescription()}
          </div>
        </div>
        
        <button 
          style={{
            ...buttonStyle,
            position: 'relative',
            width: currentAnimation === 'liquid' ? '180px' : 'auto'
          }}
          onClick={() => {
            if (currentAnimation === 'ripple' && !isAnimating) {
              setIsAnimating(true);
            } else {
              setIsAnimating(!isAnimating);
            }
          }}
        >
          {isAnimating ? 'Stop Animation' : 'Start Animation'}
          {isAnimating && currentAnimation === 'liquid' && (
            <div style={{
              position: 'absolute',
              top: '-80%',
              left: '0%',
              width: '140%',
              height: '150%',
              background: 'rgba(255, 255, 255, 0.2)',
              transform: 'rotate(45deg)',
              zIndex: '-1',
              animation: 'liquid 4s linear infinite'
            }}></div>
          )}
          {isAnimating && currentAnimation === 'ripple' && (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '150%',
                height: '150%',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                transform: 'translate(-50%, -50%) scale(0)',
                zIndex: '-1',
                animation: `ripple 2.5s ${index * 0.8}s ease-out infinite`,
                opacity: 0
              }}></div>
            ))
          )}
        </button>
      </div>
    </div>
  );
};

export default UIUXShowcase; 