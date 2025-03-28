import React, { useState } from "react";
import styled from "styled-components";

const PricingWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 60px;
  max-width: 800px;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled.div`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color);
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  ${props => props.featured && `
    border: 1px solid rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    z-index: 2;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--gradient-primary);
    }
    
    @media (max-width: 900px) {
      transform: scale(1);
    }
  `}

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  }
`;

const PlanName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const PlanDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  margin-bottom: 25px;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 5px;
`;

const PriceDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const FeatureItem = styled.li`
  color: var(--text-secondary);
  padding: 10px 0;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:before {
    content: "✓";
    color: #4CAF50;
    margin-right: 10px;
    font-weight: bold;
  }
`;

const SelectButton = styled.button`
  padding: 12px 0;
  width: 100%;
  border: none;
  border-radius: 8px;
  background: var(--button-bg);
  color: var(--button-text);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  box-shadow: var(--button-glow);

  &:hover {
    background: var(--button-hover-bg);
    box-shadow: var(--button-hover-glow);
  }
`;

const CustomTierWrapper = styled.div`
  margin-top: 80px;
  padding: 50px;
  background: var(--card-bg);
  border-radius: 15px;
  border: 1px solid var(--border-color);
`;

const CustomTierTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--text-primary);
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ResourceCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid var(--border-color);
`;

const ResourceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const ResourceControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${props => props.add ? "#4CAF50" : "#F44336"};
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ResourceCount = styled.span`
  font-size: 1.1rem;
  color: var(--text-primary);
  min-width: 30px;
  text-align: center;
`;

const ExperienceSelect = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ExperienceOption = styled.button`
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid ${props => props.selected ? "var(--text-primary)" : "var(--border-color)"};
  background: ${props => props.selected ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const TotalContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalText = styled.p`
  font-size: 1.2rem;
  color: var(--text-primary);
`;

const TotalPrice = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const ContactButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  background: var(--button-bg);
  color: var(--button-text);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 30px auto 0;
  min-width: 200px;
  box-shadow: var(--button-glow);

  &:hover {
    background: var(--button-hover-bg);
    transform: translateY(-2px);
    box-shadow: var(--button-hover-glow);
  }
`;

const resources = [
  { id: 1, name: "Web Developer", count: 0, experience: "junior" },
  { id: 2, name: "Mobile Developer", count: 0, experience: "junior" },
  { id: 3, name: "Game Developer", count: 0, experience: "junior" },
  { id: 4, name: "UI/UX Designer", count: 0, experience: "junior" },
  { id: 5, name: "SQA Engineer", count: 0, experience: "junior" },
  { id: 6, name: "Product Manager", count: 0, experience: "junior" },
];

const Pricing = () => {
  const [customResources, setCustomResources] = useState(resources);
  
  const updateResourceCount = (id, increment) => {
    setCustomResources(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, count: Math.max(0, resource.count + increment) }
          : resource
      )
    );
  };
  
  const toggleExperience = (id) => {
    setCustomResources(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, experience: resource.experience === "junior" ? "senior" : "junior" }
          : resource
      )
    );
  };
  
  const calculateTotal = () => {
    const hourlyRate = 176; // 176 working hours
    return customResources.reduce((total, resource) => {
      const rate = resource.experience === "junior" ? 3 : 6;
      return total + (resource.count * rate * hourlyRate);
    }, 0);
  };

  return (
    <PricingWrapper>
      <Title>Our Pricing</Title>
      <Subtitle>
        Choose the perfect plan for your business needs. All of our plans include dedicated resources
        working 176 hours per month (8-hour workday, Saturday/Sunday off).
      </Subtitle>
      
      <PricingGrid>
        <PricingCard>
          <PlanName>Starter Pack</PlanName>
          <PlanDescription>
            Great for businesses who want to build a quick product on minimum budget.
          </PlanDescription>
          
          <PriceContainer>
            <Price>$1,584</Price>
            <PriceDescription>per month</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>No-Low Code Developer with 2-3 years experience</FeatureItem>
            <FeatureItem>UI/UX Designer with 2-3 years experience</FeatureItem>
            <FeatureItem>Part-time Project Manager</FeatureItem>
            <FeatureItem>Minimal iterations</FeatureItem>
            <FeatureItem>Basic Q/A testing</FeatureItem>
            <FeatureItem>176 working hours per month</FeatureItem>
          </FeatureList>
          
          <SelectButton>Get Started</SelectButton>
        </PricingCard>
        
        <PricingCard featured>
          <PlanName>Pro Solution</PlanName>
          <PlanDescription>
            Ideal for businesses that are serious about making high quality market competitive products.
          </PlanDescription>
          
          <PriceContainer>
            <Price>$3,168</Price>
            <PriceDescription>per month</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>Experienced Engineer with 5+ years experience</FeatureItem>
            <FeatureItem>Experienced UI/UX Engineer with 5+ years experience</FeatureItem>
            <FeatureItem>Dedicated Product Manager</FeatureItem>
            <FeatureItem>Weekly or bi-weekly deliverables</FeatureItem>
            <FeatureItem>Up to 2 iterations per month</FeatureItem>
            <FeatureItem>Thorough Q/A Testing</FeatureItem>
            <FeatureItem>176 working hours per month</FeatureItem>
          </FeatureList>
          
          <SelectButton>Get Started</SelectButton>
        </PricingCard>
        
        <PricingCard>
          <PlanName>Enterprise Custom</PlanName>
          <PlanDescription>
            Fully customizable solution for enterprise clients with complex requirements and scalable needs.
          </PlanDescription>
          
          <PriceContainer>
            <Price>Custom</Price>
            <PriceDescription>tailored to your needs</PriceDescription>
          </PriceContainer>
          
          <FeatureList>
            <FeatureItem>Custom team composition</FeatureItem>
            <FeatureItem>Mix of junior and senior resources</FeatureItem>
            <FeatureItem>Dedicated project & product management</FeatureItem>
            <FeatureItem>Flexible iteration cycles</FeatureItem>
            <FeatureItem>Comprehensive QA and testing</FeatureItem>
            <FeatureItem>176 working hours per month</FeatureItem>
            <FeatureItem>Priority support and consulting</FeatureItem>
          </FeatureList>
          
          <SelectButton>Contact Us</SelectButton>
        </PricingCard>
      </PricingGrid>
      
      <CustomTierWrapper>
        <CustomTierTitle>Build Your Custom Team</CustomTierTitle>
        
        <ResourceGrid>
          {customResources.map(resource => (
            <ResourceCard key={resource.id}>
              <ResourceTitle>{resource.name}</ResourceTitle>
              <ExperienceSelect>
                <ExperienceOption 
                  selected={resource.experience === "junior"}
                  onClick={() => resource.experience !== "junior" && toggleExperience(resource.id)}
                >
                  2-3 Years ($3/h)
                </ExperienceOption>
                <ExperienceOption 
                  selected={resource.experience === "senior"}
                  onClick={() => resource.experience !== "senior" && toggleExperience(resource.id)}
                >
                  5+ Years ($6/h)
                </ExperienceOption>
              </ExperienceSelect>
              <ResourceControls>
                <ControlButton onClick={() => updateResourceCount(resource.id, -1)}>-</ControlButton>
                <ResourceCount>{resource.count}</ResourceCount>
                <ControlButton add onClick={() => updateResourceCount(resource.id, 1)}>+</ControlButton>
              </ResourceControls>
            </ResourceCard>
          ))}
        </ResourceGrid>
        
        <TotalContainer>
          <TotalText>Estimated Monthly Total</TotalText>
          <TotalPrice>${calculateTotal().toLocaleString()}</TotalPrice>
        </TotalContainer>
        
        <ContactButton>Contact Us for Details</ContactButton>
      </CustomTierWrapper>
    </PricingWrapper>
  );
};

export default Pricing; 