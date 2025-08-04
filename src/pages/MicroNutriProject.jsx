import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Bacteria database with scientific backing
const bacteriaDatabase = {
  "Prevotella_9": {
    role: "Harmful",
    threshold: 2.5,
    description: "Associated with increased diabetes risk and inflammation",
    increaseAdvice: "Limit refined & high-starch carbs; focus on high-protein, high-fat, low-carb diet",
    decreaseAdvice: "N/A",
    pubmed: "38526814",
    color: "#ff6b6b"
  },
  "Faecalibacterium": {
    role: "Protective",
    threshold: 1.5,
    description: "Produces butyrate, reduces inflammation, protective against diabetes",
    increaseAdvice: "Increase soluble fermentable fiber + healthy fats",
    decreaseAdvice: "Avoid low-fiber processed diets",
    pubmed: "37025162",
    color: "#51cf66"
  },
  "Senegalimassilia": {
    role: "Mixed",
    threshold: 2.0,
    description: "Complex relationship with metabolic health",
    increaseAdvice: "Ensure protein/fat quality and plant fiber",
    decreaseAdvice: "Avoid excess animal fats",
    pubmed: "33950514",
    color: "#ffd43b"
  },
  "Dialister": {
    role: "Mixed",
    threshold: 2.2,
    description: "Involved in complex carbohydrate metabolism",
    increaseAdvice: "Add fermented foods and plant diversity",
    decreaseAdvice: "Reduce processed high-fat foods",
    pubmed: "34527994",
    color: "#ffd43b"
  },
  "Slackia": {
    role: "Harmful",
    threshold: 2.0,
    description: "Associated with increased inflammation and metabolic dysfunction",
    increaseAdvice: "Include plant polyphenols and fiber",
    decreaseAdvice: "Avoid excessive animal protein",
    pubmed: "33819155",
    color: "#ff6b6b"
  },
  "Butyricicoccus": {
    role: "Protective",
    threshold: 1.8,
    description: "Produces beneficial short-chain fatty acids",
    increaseAdvice: "Increase resistant starch and fiber-rich vegetables",
    decreaseAdvice: "Limit refined sugar",
    pubmed: "33255858",
    color: "#51cf66"
  },
  "Alloprevotella": {
    role: "Harmful",
    threshold: 2.3,
    description: "Linked to poor metabolic outcomes and insulin resistance",
    increaseAdvice: "Cut down refined carbs and processed starch",
    decreaseAdvice: "Focus on low-carb ketogenic foods",
    pubmed: "30675292",
    color: "#ff6b6b"
  },
  "Libanicoccus": {
    role: "Unclear",
    threshold: 1.5,
    description: "Emerging research on metabolic impact",
    increaseAdvice: "Preserve diversity with high-fiber keto",
    decreaseAdvice: "Avoid ultra-processed foods",
    pubmed: "35704598",
    color: "#868e96"
  },
  "Ruminococcaceae_UCG.002": {
    role: "Protective",
    threshold: 1.6,
    description: "Beneficial fiber-degrading bacteria",
    increaseAdvice: "Add whole-food fiber + moderate fats",
    decreaseAdvice: "Avoid refined carbs",
    pubmed: "36058827",
    color: "#51cf66"
  },
  "Prevotella_7": {
    role: "Harmful",
    threshold: 2.4,
    description: "Associated with poor metabolic health outcomes",
    increaseAdvice: "Avoid high-carb and low-protein diets",
    decreaseAdvice: "Shift to high-fat, high-protein diet",
    pubmed: "37468350",
    color: "#ff6b6b"
  }
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--dark-bg) 0%, #1a1a2e 100%);
  color: var(--text-primary);
  padding: 120px 0 80px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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
`;

const Select = styled.select`
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const BacteriaCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const BacteriaName = styled.h3`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RoleBadge = styled.span`
  background: ${props => props.color || '#667eea'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const BacteriaDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const SliderContainer = styled.div`
  margin: 1rem 0;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SliderValue = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  color: ${props => props.isOptimal ? '#51cf66' : props.isConcern ? '#ff6b6b' : '#ffd43b'};
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
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
`;

const ResultsContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
      initial[bacteria] = 1.5; // Default middle value
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

  const handleBacteriaChange = (bacteria, value) => {
    setBacteriaLevels(prev => ({
      ...prev,
      [bacteria]: parseFloat(value)
    }));
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

      setResults({
        bmi: parseFloat(bmi),
        bmiCategory: getBMICategory(bmi),
        recommendations: recommendations.filter(r => r.concern),
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
              Backed by scientific research from Pakistani population studies.
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
            <SectionTitle>Gut Bacteria Abundance Levels (0.0 - 5.0)</SectionTitle>
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
                      <RoleBadge color={info.color}>{info.role}</RoleBadge>
                    </BacteriaName>
                    <BacteriaDescription>{info.description}</BacteriaDescription>
                    <SliderContainer>
                      <SliderLabel>
                        <span>Abundance Level</span>
                        <SliderValue 
                          isOptimal={isOptimal} 
                          isConcern={isConcern}
                        >
                          {level.toFixed(2)}
                        </SliderValue>
                      </SliderLabel>
                      <Slider
                        type="range"
                        min="0"
                        max="5"
                        step="0.01"
                        value={level}
                        onChange={(e) => handleBacteriaChange(bacteria, e.target.value)}
                      />
                    </SliderContainer>
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

              <SectionTitle>🎯 Priority Recommendations</SectionTitle>
              {results.recommendations.length > 0 ? (
                results.recommendations.map((rec, index) => (
                  <RecommendationCard
                    key={rec.bacteria}
                    color={rec.info.color}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <RecommendationTitle>
                      {rec.bacteria.replace(/_/g, ' ')} {rec.status}
                    </RecommendationTitle>
                    <RecommendationText>{rec.recommendation}</RecommendationText>
                    <PubMedLink 
                      href={`https://pubmed.ncbi.nlm.nih.gov/${rec.info.pubmed}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📚 View Research (PubMed: {rec.info.pubmed})
                    </PubMedLink>
                  </RecommendationCard>
                ))
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