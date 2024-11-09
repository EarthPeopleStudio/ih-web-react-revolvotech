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
  margin-bottom: 60px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ProjectCard = styled.div`
  background: rgba(62, 61, 86, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 32px rgba(239, 87, 119, 0.15);
    border-color: rgba(239, 87, 119, 0.3);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectContent = styled.div`
  padding: 25px;
`;

const ProjectTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background: rgba(74, 95, 230, 0.1);
  color: var(--primary-color);
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
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(239, 87, 119, 0.1);
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
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TagsContainer>
                {project.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>
            </ProjectContent>
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
