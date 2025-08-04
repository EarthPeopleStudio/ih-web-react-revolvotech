import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Bacteria database based on REAL research data from Pakistani T2D study
const bacteriaDatabase = {
  "Prevotella_9": {
    role: "Harmful", // Risk marker; inflammation, BCAA production
    controlMean: 0.062, // Mean in healthy controls
    t2dMean: 0.018, // Mean in T2D patients
    threshold: 0.040, // Midpoint threshold (lower is better for harmful bacteria)
    importanceScore: 0.107, // From Random Forest model
    description: "Risk marker associated with inflammation and BCAA production. Higher levels linked to T2D risk.",
    increaseAdvice: "Focus on: high-protein, high-fat, low-carb foods (limit refined & high-starch carbs)",
    decreaseAdvice: "Ketogenic, low-carb, low-refined sugar",
    pubmed: "31209315",
    color: "#ff6b6b"
  },
  "Faecalibacterium": {
    role: "Protective", // Protective (butyrate producer)
    controlMean: 0.123, // Mean in healthy controls
    t2dMean: 0.040, // Mean in T2D patients
    threshold: 0.080, // Above this is good (protective bacteria should be higher)
    importanceScore: 0.078,
    description: "Protective butyrate producer. Reduces inflammation and protects against diabetes.",
    increaseAdvice: "Eat more: soluble fermentable fiber, healthy fats with sustained nutritional ketosis",
    decreaseAdvice: "Low fiber, processed, high-sugar diets",
    pubmed: "34230623",
    color: "#51cf66"
  },
  "Senegalimassilia": {
    role: "Mixed", // Emerging; possibly bile-acid / fat metabolism
    controlMean: 0.002,
    t2dMean: 0.006,
    threshold: 0.004, // Midpoint
    importanceScore: 0.048,
    description: "Emerging bacteria possibly involved in bile-acid and fat metabolism.",
    increaseAdvice: "Focus on: quality protein/fats with plant fiber for balance",
    decreaseAdvice: "Balanced Mediterranean, plant-based",
    pubmed: "35168312",
    color: "#ffd43b"
  },
  "Dialister": {
    role: "Mixed", // Mixed; gut dysbiosis marker
    controlMean: 0.061,
    t2dMean: 0.005,
    threshold: 0.033, // Midpoint
    importanceScore: 0.044,
    description: "Mixed role as gut dysbiosis marker. Associated with diet diversity.",
    increaseAdvice: "Eat more: fermented foods, plant fiber within high-fat, low-carb diet",
    decreaseAdvice: "Anti-inflammatory, high-diversity diets",
    pubmed: "29172717",
    color: "#ffd43b"
  },
  "Slackia": {
    role: "Mixed", // Bile acid and estrogen metabolism
    controlMean: 0.001,
    t2dMean: 0.003,
    threshold: 0.002, // Midpoint
    importanceScore: 0.037,
    description: "Involved in bile acid and estrogen metabolism. Responds to protein and fat intake.",
    increaseAdvice: "Eat more: plant polyphenols and fiber with high protein/fat",
    decreaseAdvice: "Balanced diets rich in fiber + polyphenols",
    pubmed: "31685934",
    color: "#ffd43b"
  },
  "Butyricicoccus": {
    role: "Protective", // SCFA producer (anti-inflammatory)
    controlMean: 0.005,
    t2dMean: 0.004,
    threshold: 0.004, // Above this is good
    importanceScore: 0.035,
    description: "SCFA producer with anti-inflammatory properties. Benefits from resistant starch.",
    increaseAdvice: "Eat more: resistant starch, fiber-rich vegetables within high-protein structure",
    decreaseAdvice: "Processed sugars, low-fiber diets",
    pubmed: "26898666",
    color: "#51cf66"
  },
  "Alloprevotella": {
    role: "Harmful", // Related to Prevotella; carb fermenter
    controlMean: 0.002,
    t2dMean: 0.0005,
    threshold: 0.001, // Lower is better
    importanceScore: 0.033,
    description: "Related to Prevotella family. Carbohydrate fermenter linked to refined diet.",
    increaseAdvice: "Avoid: refined carbs and processed starch with high-fat, moderate plant fiber",
    decreaseAdvice: "Low-carb, ketogenic diets",
    pubmed: "31321580",
    color: "#ff6b6b"
  },
  "Libanicoccus": {
    role: "Emerging", // Emerging; dysbiosis potential
    controlMean: 0.003,
    t2dMean: 0.010,
    threshold: 0.006, // Midpoint
    importanceScore: 0.029,
    description: "Emerging bacteria with potential dysbiosis implications. Limited research available.",
    increaseAdvice: "Focus on: high-fiber keto foods, limit refined foods for gut diversity",
    decreaseAdvice: "Unknown - default to diversity preservation",
    pubmed: "34945862",
    color: "#868e96"
  },
  "Ruminococcaceae_UCG.002": {
    role: "Protective", // SCFA producer, gut health
    controlMean: 0.020,
    t2dMean: 0.008,
    threshold: 0.014, // Above this is good
    importanceScore: 0.027,
    description: "SCFA producer supporting gut health. Benefits from whole-food fiber.",
    increaseAdvice: "Eat more: whole-food fiber, moderate fats in ketogenic approach",
    decreaseAdvice: "Refined carbs, ultra-processed diet",
    pubmed: "34674563",
    color: "#51cf66"
  },
  "Prevotella_7": {
    role: "Harmful", // Same as Prevotella_9
    controlMean: 0.006,
    t2dMean: 0.0004,
    threshold: 0.003, // Lower is better
    importanceScore: 0.027,
    description: "Same family as Prevotella_9. Associated with high refined carb diets and T2D risk.",
    increaseAdvice: "Focus on: high-protein, high-fat structure (reduce refined carbs)",
    decreaseAdvice: "Ketogenic, low-carb",
    pubmed: "31801460",
    color: "#ff6b6b"
  }
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--dark-bg) 0%, #1a1a2e 100%);
  color: var(--text-primary);
  padding: 120px 0 80px;
  
  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 0 40px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    max-width: 100%;
    line-height: 1.5;
  }
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.75rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  /* Hide number input spinner buttons for cleaner look */
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* For Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.75rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  /* Custom dropdown arrow */
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23764ba2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  }

  option {
    background: #1a1a2e;
    color: #ffffff;
    padding: 0.5rem;
  }

  /* Firefox specific styling */
  option:checked {
    background: #667eea;
    color: #ffffff;
  }

  /* Webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a2e;
  }

  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 4px;
  }
`;

const BacteriaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.2rem;
  }
`;

const BacteriaCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    border-radius: 10px;
    
    &:hover {
      transform: none;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }
`;

const BacteriaName = styled.h3`
  color: var(--text-primary);
  margin-bottom: 0.1rem;
  font-size: 1.05rem;
  font-weight: 600;
  margin-right: 5rem;
  
  @media (max-width: 480px) {
    margin-right: 4rem;
  }
`;

const RoleBadge = styled.span`
  background: ${props => props.color || '#667eea'};
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    top: 0.4rem;
    right: 0.4rem;
    padding: 0.15rem 0.35rem;
    font-size: 0.65rem;
  }
  
  @media (max-width: 480px) {
    top: 0.3rem;
    right: 0.3rem;
    padding: 0.12rem 0.3rem;
    font-size: 0.6rem;
  }
`;

const BacteriaDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
  line-height: 1.3;
  flex-grow: 1;
  min-height: 0.8rem;
`;

const InputContainer = styled.div`
  margin-top: auto;
  padding-top: 0.3rem;
`;

const InputLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
`;

const BacteriaInput = styled.input`
  background: ${props => props.isOptimal ? 'rgba(81, 207, 102, 0.15)' : props.isConcern ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 212, 59, 0.15)'};
  border: 1px solid ${props => props.isOptimal ? 'rgba(81, 207, 102, 0.3)' : props.isConcern ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 212, 59, 0.3)'};
  color: ${props => props.isOptimal ? '#51cf66' : props.isConcern ? '#ff6b6b' : '#ffd43b'};
  border-radius: 12px;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  width: 120px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
    transform: scale(1.05);
  }

  &:hover:not(:focus) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  /* Remove spinner arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }

  /* Placeholder styling */
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    width: 100px;
    padding: 0.7rem 0.8rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    width: 90px;
    padding: 0.6rem 0.7rem;
    font-size: 0.95rem;
  }
`;

const AnalyzeButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 10px;
    
    &:hover {
      transform: none;
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
    }
  }
`;

const ResultsContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 10px;
  }
`;

const BMICard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const BMIValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
`;

const BMICategory = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

const RecommendationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${props => props.color || '#667eea'};
`;

const RecommendationTitle = styled.h4`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecommendationText = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const PubMedLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const MicroNutriProject = () => {
  const [formData, setFormData] = useState({
    age: 28,
    gender: "Female",
    weight: 65,
    height: 160,
    diabetesStatus: "Healthy"
  });

  const [bacteriaLevels, setBacteriaLevels] = useState(() => {
    const initial = {};
    Object.keys(bacteriaDatabase).forEach(bacteria => {
      // Use the midpoint between control and T2D means as default
      const info = bacteriaDatabase[bacteria];
      const defaultValue = (info.controlMean + info.t2dMean) / 2;
      initial[bacteria] = defaultValue;
    });
    return initial;
  });

  const [inputValues, setInputValues] = useState(() => {
    const initial = {};
    Object.keys(bacteriaDatabase).forEach(bacteria => {
      const info = bacteriaDatabase[bacteria];
      const defaultValue = (info.controlMean + info.t2dMean) / 2;
      initial[bacteria] = defaultValue.toFixed(3); // 3 decimal places for precision
    });
    return initial;
  });

  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBacteriaInputChange = (bacteria, value) => {
    // Allow empty string or just numbers/decimal point for typing
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      // Store the raw input value for display
      setInputValues(prev => ({
        ...prev,
        [bacteria]: value
      }));
      
      // Update the actual numeric value for calculations
      const numValue = value === '' ? 0 : parseFloat(value);
      if (!isNaN(numValue)) {
        const clampedValue = Math.max(0, Math.min(0.5, numValue)); // Real bacterial abundance range
        setBacteriaLevels(prev => ({
          ...prev,
          [bacteria]: clampedValue
        }));
      }
    }
  };

  const handleBacteriaInputBlur = (bacteria, value) => {
    // Format the value when user finishes typing
    if (value === '') {
      setInputValues(prev => ({
        ...prev,
        [bacteria]: '0.000'
      }));
      setBacteriaLevels(prev => ({
        ...prev,
        [bacteria]: 0
      }));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const clampedValue = Math.max(0, Math.min(0.5, numValue)); // Real bacterial abundance range
        const formattedValue = clampedValue.toFixed(3); // 3 decimal places for precision
        setInputValues(prev => ({
          ...prev,
          [bacteria]: formattedValue
        }));
        setBacteriaLevels(prev => ({
          ...prev,
          [bacteria]: clampedValue
        }));
      }
    }
  };

  const calculateBMI = () => {
    const heightM = formData.height / 100;
    return (formData.weight / (heightM * heightM)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const analyzeProfile = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const bmi = calculateBMI();
      const recommendations = [];

      Object.entries(bacteriaLevels).forEach(([bacteria, level]) => {
        const info = bacteriaDatabase[bacteria];
        let concern = false;
        let recommendation = "";

        if (info.role === "Harmful" && level > info.threshold) {
          concern = true;
          recommendation = info.increaseAdvice;
        } else if (info.role === "Protective" && level < info.threshold) {
          concern = true;
          recommendation = info.increaseAdvice;
        } else if (info.role === "Mixed") {
          if (level > info.threshold) {
            recommendation = info.decreaseAdvice;
            concern = true;
          } else {
            recommendation = info.increaseAdvice;
          }
        }

        recommendations.push({
          bacteria,
          level,
          info,
          concern,
          recommendation,
          status: concern ? (info.role === "Harmful" ? "⚠️ High Risk" : "⚠️ Low Protective") : "✅ Optimal"
        });
      });

      // Group and combine recommendations by action type
      const concernedRecommendations = recommendations.filter(r => r.concern);
      const groupedAdvice = {
        "Eat more": [],
        "Focus on": [],
        "Avoid": []
      };

      concernedRecommendations.forEach(rec => {
        const advice = rec.recommendation;
        if (advice.startsWith("Eat more:")) {
          groupedAdvice["Eat more"].push(advice.replace("Eat more: ", ""));
        } else if (advice.startsWith("Focus on:")) {
          groupedAdvice["Focus on"].push(advice.replace("Focus on: ", ""));
        } else if (advice.startsWith("Avoid:")) {
          groupedAdvice["Avoid"].push(advice.replace("Avoid: ", ""));
        }
      });

      // Create combined recommendations
      const combinedRecommendations = [];
      Object.entries(groupedAdvice).forEach(([action, items]) => {
        if (items.length > 0) {
          const uniqueItems = [...new Set(items)]; // Remove duplicates
          combinedRecommendations.push({
            recommendation: `${action}: ${uniqueItems.join(", ")}`
          });
        }
      });

      setResults({
        bmi: parseFloat(bmi),
        bmiCategory: getBMICategory(bmi),
        recommendations: combinedRecommendations,
        allBacteria: recommendations
      });

      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>MicroNutri - AI-Powered Gut Health Analysis | Revolvo</title>
        <meta name="description" content="Get personalized dietary recommendations based on your gut microbiome profile using AI and scientific research." />
      </Helmet>

      <Container>
        <ContentWrapper>
          <Header>
            <Title>🧬 MicroNutri</Title>
            <Subtitle>
              AI-powered personalized nutrition recommendations based on your gut microbiome profile.
              Backed by scientific research and clinical studies.
            </Subtitle>
          </Header>

          <FormContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SectionTitle>Personal Information</SectionTitle>
            <InputGrid>
              <InputGroup>
                <Label>Age</Label>
                <Input
                  type="number"
                  min="10"
                  max="100"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                />
              </InputGroup>
              <InputGroup>
                <Label>Gender</Label>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>Weight (kg)</Label>
                <Input
                  type="number"
                  min="30"
                  max="200"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                />
              </InputGroup>
              <InputGroup>
                <Label>Height (cm)</Label>
                <Input
                  type="number"
                  min="120"
                  max="230"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                />
              </InputGroup>
              <InputGroup>
                <Label>Health Status</Label>
                <Select
                  value={formData.diabetesStatus}
                  onChange={(e) => handleInputChange('diabetesStatus', e.target.value)}
                >
                  <option value="Healthy">Healthy</option>
                  <option value="Prediabetic">Prediabetic</option>
                  <option value="T2DM">Type 2 Diabetes</option>
                </Select>
              </InputGroup>
            </InputGrid>
          </FormContainer>

          <FormContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SectionTitle>Gut Bacteria Relative Abundance (0.000 - 0.500)</SectionTitle>
            <BacteriaGrid>
              {Object.entries(bacteriaDatabase).map(([bacteria, info]) => {
                const level = bacteriaLevels[bacteria];
                const isOptimal = (info.role === "Protective" && level >= info.threshold) ||
                                (info.role === "Harmful" && level <= info.threshold);
                const isConcern = (info.role === "Protective" && level < info.threshold) ||
                                (info.role === "Harmful" && level > info.threshold);

                return (
                  <BacteriaCard
                    key={bacteria}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
                  >
                    <BacteriaName>
                      {bacteria.replace(/_/g, ' ')}
                    </BacteriaName>
                    <RoleBadge color={info.color}>{info.role}</RoleBadge>
                    <BacteriaDescription>{info.description}</BacteriaDescription>
                    <InputContainer>
                      <InputLabel>
                        <span>Relative Abundance (0.000 - 0.500)</span>
                      </InputLabel>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <BacteriaInput
                          type="text"
                          value={inputValues[bacteria] || ''}
                          onChange={(e) => handleBacteriaInputChange(bacteria, e.target.value)}
                          onBlur={(e) => handleBacteriaInputBlur(bacteria, e.target.value)}
                          placeholder="0.000"
                          isOptimal={isOptimal}
                          isConcern={isConcern}
                        />
                      </div>
                    </InputContainer>
                  </BacteriaCard>
                );
              })}
            </BacteriaGrid>

            <AnalyzeButton
              onClick={analyzeProfile}
              disabled={isAnalyzing}
              whileTap={{ scale: 0.98 }}
            >
              {isAnalyzing ? "🔬 Analyzing Your Profile..." : "🧬 Get My Nutrition Plan"}
            </AnalyzeButton>
          </FormContainer>

          {results && (
            <ResultsContainer
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle>📊 Your Personalized Analysis</SectionTitle>
              
              <BMICard>
                <BMIValue>{results.bmi}</BMIValue>
                <BMICategory>BMI - {results.bmiCategory}</BMICategory>
              </BMICard>

              <SectionTitle>🎯 Your Personalized Diet Plan</SectionTitle>
              {results.recommendations.length > 0 ? (
                <div style={{ 
                  background: 'linear-gradient(145deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', 
                  borderRadius: '20px', 
                  padding: '2.5rem', 
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  textAlign: 'left',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}>
                  {results.recommendations.map((rec, index) => {
                    const getActionColor = (recommendation) => {
                      if (recommendation.startsWith('Eat more:')) return '#51cf66'; // Green
                      if (recommendation.startsWith('Focus on:')) return '#ffd43b'; // Yellow
                      if (recommendation.startsWith('Avoid:')) return '#ff6b6b'; // Red
                      return '#51cf66'; // Default green
                    };

                    const formatContent = (text) => {
                      // Replace + with ", "
                      let formatted = text.replace(/\s*\+\s*/g, ', ');
                      
                      // Split by commas and clean up each item
                      let items = formatted.split(',').map(item => item.trim());
                      
                      // Remove duplicates and empty items
                      items = [...new Set(items)].filter(item => item.length > 0);
                      
                      // Join with commas, and only use "and" before the final item if there are multiple items
                      if (items.length > 2) {
                        const lastItem = items.pop();
                        formatted = items.join(', ') + ' and ' + lastItem;
                      } else if (items.length === 2) {
                        formatted = items.join(' and ');
                      } else {
                        formatted = items[0] || text;
                      }
                      
                      // Capitalize first letter
                      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
                      
                      return formatted;
                    };

                    const getActionText = (recommendation) => {
                      if (recommendation.startsWith('Eat more:')) {
                        return {
                          action: '😊 EAT MORE',
                          content: formatContent(recommendation.replace('Eat more: ', ''))
                        };
                      }
                      if (recommendation.startsWith('Focus on:')) {
                        return {
                          action: '😐 FOCUS ON',
                          content: formatContent(recommendation.replace('Focus on: ', ''))
                        };
                      }
                      if (recommendation.startsWith('Avoid:')) {
                        return {
                          action: '😠 AVOID',
                          content: formatContent(recommendation.replace('Avoid: ', ''))
                        };
                      }
                      return {
                        action: '😊 RECOMMENDED',
                        content: formatContent(recommendation)
                      };
                    };

                    const actionColor = getActionColor(rec.recommendation);
                    const { action, content } = getActionText(rec.recommendation);

                    return (
                      <div key={index} style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: index < results.recommendations.length - 1 ? '2rem' : '0',
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '15px',
                        border: `1px solid ${actionColor}20`,
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: actionColor,
                          borderRadius: '50%',
                          marginRight: '1.2rem',
                          flexShrink: 0,
                          marginTop: '0.3rem',
                          boxShadow: `0 0 10px ${actionColor}40`
                        }} />
                        <div style={{ flex: 1, marginRight: '4rem' }}>
                          <div style={{
                            color: actionColor,
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            letterSpacing: '1px',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase'
                          }}>
                            {action.split(' ').slice(1).join(' ')}
                          </div>
                          <div style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-primary)',
                            lineHeight: '1.6',
                            fontWeight: '500'
                          }}>
                            {content}
                          </div>
                        </div>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          right: '1.5rem',
                          transform: 'translateY(-50%)',
                          fontSize: '2rem',
                          opacity: '0.8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '3rem',
                          height: '3rem'
                        }}>
                          {action.split(' ')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  🎉 Excellent! Your gut bacteria profile looks well-balanced. 
                  Continue your current healthy lifestyle.
                </div>
              )}
            </ResultsContainer>
          )}
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MicroNutriProject;