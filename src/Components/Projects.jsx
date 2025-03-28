import React from "react";
import styled from "styled-components";

const ProjectsWrapper = styled.div`
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
  margin-bottom: 50px;
  max-width: 800px;
`;

const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
`;

const ComingSoonText = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const ComingSoonDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 600px;
`;

const Projects = () => {
  return (
    <ProjectsWrapper>
      <Title>Our Projects</Title>
      <Subtitle>
        Explore our portfolio of successful projects delivered across various industries and technologies.
      </Subtitle>
      
      <ComingSoonContainer>
        <ComingSoonText>Coming Soon</ComingSoonText>
        <ComingSoonDescription>
          We're currently updating our projects portfolio with our latest work. 
          Check back soon to see detailed case studies of our most innovative solutions.
        </ComingSoonDescription>
      </ComingSoonContainer>
    </ProjectsWrapper>
  );
};

export default Projects; 