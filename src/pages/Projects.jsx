import React from "react";
import styled from "styled-components";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectsPageWrapper = styled.div`
  min-height: 100vh;
  padding: 120px 8% 80px;
  background-color: var(--dark-bg);
  color: var(--text-primary);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ProjectCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--border-color);
    box-shadow: 0 8px 32px var(--shadow-color);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectContent = styled.div`
  padding: 30px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  margin-bottom: 25px;
`;

const Tag = styled.span`
  background: rgba(239, 87, 119, 0.1);
  color: var(--primary-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid var(--border-color);
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 15px 30px;
  background: var(--button-bg);
  border: none;
  border-radius: 8px;
  color: var(--button-text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--button-glow);

  &:hover {
    transform: translateY(-2px);
    background: var(--button-hover-bg);
    box-shadow: var(--button-hover-glow);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce solution with real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
      image: "https://via.placeholder.com/400x250",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      id: 2,
      title: "Mobile Game App",
      description:
        "An engaging mobile game built with Unity, featuring advanced graphics, multiplayer functionality, and cross-platform compatibility.",
      image: "https://via.placeholder.com/400x250",
      tags: ["Unity", "C#", "Firebase", "Photon"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      description:
        "Smart chatbot powered by machine learning, providing automated customer support 24/7 with natural language processing.",
      image: "https://via.placeholder.com/400x250",
      tags: ["Python", "TensorFlow", "AWS", "NLP"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      id: 4,
      title: "Social Media Dashboard",
      description:
        "Comprehensive analytics dashboard for social media management with real-time data visualization.",
      image: "https://via.placeholder.com/400x250",
      tags: ["React", "D3.js", "Firebase", "Material-UI"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      description:
        "Mobile application for tracking workouts, nutrition, and progress with personalized recommendations.",
      image: "https://via.placeholder.com/400x250",
      tags: ["Flutter", "Firebase", "Node.js", "MongoDB"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      id: 6,
      title: "Virtual Reality Game",
      description:
        "Immersive VR experience with realistic physics and interactive environments.",
      image: "https://via.placeholder.com/400x250",
      tags: ["Unity", "C#", "VR", "Oculus"],
      github: "https://github.com",
      live: "https://example.com",
    },
  ];

  return (
    <ProjectsPageWrapper>
      <Header>
        <Title>Our Projects</Title>
        <Description>
          Explore our portfolio of innovative digital solutions across web,
          mobile, and game development. Each project represents our commitment
          to excellence and cutting-edge technology.
        </Description>
      </Header>

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
              <LinksContainer>
                <LinkButton
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> View Code
                </LinkButton>
                <LinkButton
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> Live Demo
                </LinkButton>
              </LinksContainer>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <BackButton onClick={() => window.history.back()}>← Go Back</BackButton>
    </ProjectsPageWrapper>
  );
};

export default Projects;
