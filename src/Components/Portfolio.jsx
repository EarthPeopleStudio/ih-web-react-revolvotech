import React from "react";
import styled from "styled-components";

const PortfolioWrapper = styled.div`
  padding: 120px 8% 80px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  text-align: center;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 60px;
  font-size: 1.2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
    padding: 0 20px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const ProjectCard = styled.div`
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--border-color);
    box-shadow: var(--button-glow);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Tag = styled.span`
  background: var(--button-bg);
  color: var(--text-primary);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid var(--border-color);
`;

const MoreProjectsSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

const MoreProjectsButton = styled.button`
  padding: 15px 35px;
  border: 1px solid var(--button-border);
  border-radius: 8px;
  background: var(--button-bg);
  color: var(--button-text);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--button-hover-bg);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px 30px;
  }
`;

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce solution with real-time inventory management and secure payment processing.",
      image: "https://via.placeholder.com/400x200",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Mobile Game App",
      description:
        "An engaging mobile game built with Unity, featuring advanced graphics and multiplayer functionality.",
      image: "https://via.placeholder.com/400x200",
      tags: ["Unity", "C#", "Firebase"],
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      description:
        "Smart chatbot powered by machine learning, providing automated customer support 24/7.",
      image: "https://via.placeholder.com/400x200",
      tags: ["Python", "TensorFlow", "AWS"],
    },
  ];

  const handleViewMoreClick = () => {
    window.location.href = "/projects";
  };

  return (
    <PortfolioWrapper id="projects">
      <Title>Featured Projects</Title>
      <Description>
        Check out some of the projects I've worked on recently.
      </Description>
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TagsContainer>
              {project.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      <MoreProjectsSection>
        <MoreProjectsButton onClick={handleViewMoreClick}>
          View More Projects →
        </MoreProjectsButton>
      </MoreProjectsSection>
    </PortfolioWrapper>
  );
};

export default Portfolio;
