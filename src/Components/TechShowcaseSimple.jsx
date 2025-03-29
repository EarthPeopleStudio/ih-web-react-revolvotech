import React from "react";
import styled from "styled-components";

// Main wrapper
const ShowcaseWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

// Header section styling
const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
  color: var(--text-primary);
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    width: 80px;
    height: 4px;
    background: #ff5470;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }

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
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

// Tech grid styling
const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const TechCategory = styled.div`
  background: var(--card-bg);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || "#ff5470"};
  }
`;

const CategoryTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 12px;
    color: ${props => props.color || "#ff5470"};
  }
`;

// Tech list styling
const TechList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TechItem = styled.li`
  color: var(--text-secondary);
  margin-bottom: 12px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
    color: var(--text-primary);
  }

  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: "✓";
    color: ${props => props.color || "#ff5470"};
    margin-right: 12px;
    font-weight: bold;
  }
`;

// Button styling
const Button = styled.button`
  padding: 12px 20px;
  background: ${props => props.primary ? 'linear-gradient(45deg, #ff5470, #e03658)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.primary ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.primary ? 'transparent' : 'var(--border-color)'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, ${props => props.primary ? '0.3' : '0.15'});
    color: white;
    background: ${props => props.primary ? 'linear-gradient(45deg, #ff5470, #e03658)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const TechShowcaseSimple = () => {
  return (
    <ShowcaseWrapper>
      <Title>Technology Showcase</Title>
      <Subtitle>Explore our expertise across different technology domains</Subtitle>
      
      <div style={{ padding: "20px", background: "rgba(30, 30, 30, 0.7)", borderRadius: "10px", marginBottom: "40px" }}>
        <p style={{ color: "white", textAlign: "center", fontSize: "1.1rem" }}>
          We're currently enhancing our technology showcase with new interactive demos.
          <br />Below is an overview of our technical expertise.
        </p>
      </div>
      
      <TechGrid>
        <TechCategory color="#61dafb">
          <CategoryTitle color="#61dafb">Frontend Frameworks</CategoryTitle>
          <TechList>
            <TechItem>React</TechItem>
            <TechItem>Vue.js</TechItem>
            <TechItem>Angular</TechItem>
            <TechItem>Next.js</TechItem>
            <TechItem>Svelte</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#f0db4f">
          <CategoryTitle color="#f0db4f">JavaScript Libraries</CategoryTitle>
          <TechList>
            <TechItem>jQuery</TechItem>
            <TechItem>Redux</TechItem>
            <TechItem>MobX</TechItem>
            <TechItem>D3.js</TechItem>
            <TechItem>Three.js</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#e34c26">
          <CategoryTitle color="#e34c26">HTML/CSS Technologies</CategoryTitle>
          <TechList>
            <TechItem>HTML5</TechItem>
            <TechItem>CSS3</TechItem>
            <TechItem>Sass/SCSS</TechItem>
            <TechItem>Tailwind CSS</TechItem>
            <TechItem>Styled Components</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#3DDC84">
          <CategoryTitle color="#3DDC84">Mobile Development</CategoryTitle>
          <TechList>
            <TechItem>React Native</TechItem>
            <TechItem>Flutter</TechItem>
            <TechItem>Swift/SwiftUI</TechItem>
            <TechItem>Kotlin</TechItem>
            <TechItem>Progressive Web Apps</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#cc0000">
          <CategoryTitle color="#cc0000">Game Development</CategoryTitle>
          <TechList>
            <TechItem>Unity</TechItem>
            <TechItem>Unreal Engine</TechItem>
            <TechItem>Godot</TechItem>
            <TechItem>Phaser</TechItem>
            <TechItem>WebGL</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#6cc24a">
          <CategoryTitle color="#6cc24a">Backend Technologies</CategoryTitle>
          <TechList>
            <TechItem>Node.js</TechItem>
            <TechItem>Python</TechItem>
            <TechItem>Java</TechItem>
            <TechItem>C#/.NET</TechItem>
            <TechItem>PHP</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#ff7eb9">
          <CategoryTitle color="#ff7eb9">Digital Art & Design</CategoryTitle>
          <TechList>
            <TechItem>Adobe Photoshop</TechItem>
            <TechItem>Adobe Illustrator</TechItem>
            <TechItem>Figma</TechItem>
            <TechItem>Blender</TechItem>
            <TechItem>After Effects</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#7f5af0">
          <CategoryTitle color="#7f5af0">AI & Machine Learning</CategoryTitle>
          <TechList>
            <TechItem>TensorFlow</TechItem>
            <TechItem>PyTorch</TechItem>
            <TechItem>OpenAI API</TechItem>
            <TechItem>Hugging Face</TechItem>
            <TechItem>scikit-learn</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory color="#2ec4b6">
          <CategoryTitle color="#2ec4b6">Project Management</CategoryTitle>
          <TechList>
            <TechItem>Jira</TechItem>
            <TechItem>Agile/Scrum</TechItem>
            <TechItem>Trello</TechItem>
            <TechItem>Asana</TechItem>
            <TechItem>ClickUp</TechItem>
          </TechList>
        </TechCategory>
      </TechGrid>
      
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Button 
          primary 
          onClick={() => window.location.href = '/contact-us'}
          style={{ padding: '15px 30px', fontSize: '1.1rem' }}
        >
          Discuss Your Project With Us
        </Button>
      </div>
    </ShowcaseWrapper>
  );
};

export default TechShowcaseSimple; 