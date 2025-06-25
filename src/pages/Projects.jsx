import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaArrowRight, FaRocket, FaStar } from "react-icons/fa";
import HiveKeyImage from "../assets/hivekey.png";
import FreshCleaningLuxeImage from "../assets/fresh-cleaning-luxe-logo.png";

const ProjectsWrapper = styled.div`
  padding: 120px 8% 80px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 235, 59, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #ffffff 0%, #FFEB3B 40%, #fbb604 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 60px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const StatCard = styled.div`
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(255, 235, 59, 0.2);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.05), rgba(251, 182, 4, 0.03));
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: rgba(255, 235, 59, 0.5);
    box-shadow: 0 20px 40px rgba(255, 235, 59, 0.1);
    
    &::before {
      opacity: 1;
    }
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FFEB3B, #fbb604);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  border-radius: 20px;
  background: rgba(25, 25, 25, 0.6);
  padding: 12px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 235, 59, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 10px;
  }
`;

const Tab = styled.button`
  padding: 18px 32px;
  border: none;
  background: ${(props) => (props.active ? 
    "linear-gradient(135deg, rgba(255, 235, 59, 0.2), rgba(251, 182, 4, 0.1))" : 
    "transparent")};
  color: ${(props) => (props.active ? "#FFEB3B" : "var(--text-secondary)")};
  font-size: 1.1rem;
  font-weight: ${(props) => (props.active ? "700" : "500")};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  z-index: 1;
  flex: 1;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.1), rgba(251, 182, 4, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }
  
  &:hover {
    background: ${(props) => (props.active ? 
      "linear-gradient(135deg, rgba(255, 235, 59, 0.2), rgba(251, 182, 4, 0.1))" : 
      "rgba(255, 235, 59, 0.08)")};
    color: ${(props) => (props.active ? "#FFEB3B" : "#fbb604")};
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }

  ${(props) => props.active && `
    &:after {
      content: "";
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 3px;
      background: linear-gradient(135deg, #FFEB3B, #fbb604);
      border-radius: 2px;
    }
  `}
  
  @media (max-width: 768px) {
    padding: 16px 24px;
    font-size: 1rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ProjectCard = styled.div`
  background: rgba(25, 25, 25, 0.6);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 235, 59, 0.2);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 30px 70px rgba(255, 235, 59, 0.15);
    border-color: rgba(255, 235, 59, 0.6);
    
    .project-image {
      transform: scale(1.08);
    }
    
    .project-links {
      opacity: 1;
      transform: translateY(0);
    }
    
    .project-title {
      background: linear-gradient(135deg, #FFEB3B, #f99b04);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.08), rgba(251, 182, 4, 0.03));
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 65%;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
  border-bottom: 1px solid rgba(255, 235, 59, 0.2);
`;

const ProjectImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

const ProjectInfo = styled.div`
  padding: 35px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #FFEB3B;
  line-height: 1.3;
  position: relative;
  display: inline-block;
  transition: all 0.4s ease;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(135deg, #FFEB3B, #fbb604);
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  
  ${ProjectCard}:hover & {
    &:after {
      width: 80px;
    }
  }
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 25px;
  flex-grow: 1;
  opacity: 0.9;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: auto;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.15), rgba(251, 182, 4, 0.08));
  color: #FFEB3B;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 235, 59, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.25), rgba(251, 182, 4, 0.15));
    border-color: rgba(255, 235, 59, 0.5);
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  margin-top: auto;
`;

const ProjectLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  width: 100%;
  background: linear-gradient(135deg, #FFEB3B, #fbb604);
  color: #000;
  text-decoration: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 235, 59, 0.2);
    filter: brightness(1.1);
  }
`;

const ProjectsActionSection = styled.div`
  text-align: center;
  padding: 60px 0;
  background: rgba(25, 25, 25, 0.4);
  border-radius: 24px;
  border: 1px solid rgba(255, 235, 59, 0.2);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 235, 59, 0.05) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ActionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #FFEB3B, #fbb604);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
`;

const ActionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #FFEB3B, #fbb604, #f99b04);
  color: #000;
  border: none;
  padding: 18px 40px;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(255, 235, 59, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.5px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 20px 50px rgba(255, 235, 59, 0.4);
    filter: brightness(1.1);
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

// Updated project data with additional fields
const projectsData = [
  {
    id: 1,
    title: "HiveKey",
    description: "Never memorize passwords again. HiveKey lets you generate and recreate the same complex passwords using just your master key and service name - no storage needed.",
    imageUrl: HiveKeyImage,
    tags: ["Security", "Cryptography", "Cross-Platform", "Password Generator"],
    category: "Apps",
    path: "/projects/hivekey",
    github: "https://github.com/yourusername/hivekey",
    live: "https://hivekey.app"
  },
  {
    id: 2,
    title: "Fresh Cleaning Luxe",
    description: "A sleek, modern, and user-friendly website for a luxury cleaning service, designed to attract and convert high-end clientele.",
    imageUrl: FreshCleaningLuxeImage,
    tags: ["React", "UI/UX Design", "Web Development", "Branding"],
    category: "Websites",
    path: "https://freshcleaningluxe.com",
    live: "https://freshcleaningluxe.com"
  },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "15+", label: "Countries Served" },
    { number: "5+", label: "Years Experience" }
  ];
  
  useEffect(() => {
    if (activeTab === "All") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === activeTab));
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const handleProjectClick = (project) => {
    if (project.path) {
      if (project.path.startsWith("http")) {
        window.open(project.path, '_blank', 'noopener,noreferrer');
      } else {
        navigate(project.path);
      }
    }
  };

  return (
    <ProjectsWrapper>
      <HeroSection>
        <Title>Our Project Portfolio</Title>
      <Subtitle>
          Discover our collection of innovative digital solutions that transform ideas into 
          extraordinary experiences. From cutting-edge applications to stunning websites, 
          each project reflects our passion for excellence and innovation.
      </Subtitle>
        
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </HeroSection>
      
      <TabsContainer>
        <Tab 
          active={activeTab === "All"} 
          onClick={() => handleTabClick("All")}
        >
          All Projects
        </Tab>
        <Tab 
          active={activeTab === "Websites"} 
          onClick={() => handleTabClick("Websites")}
        >
          Websites
        </Tab>
        <Tab 
          active={activeTab === "Apps"} 
          onClick={() => handleTabClick("Apps")}
        >
          Applications
        </Tab>
      </TabsContainer>
      
      <ProjectsGrid>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.id} onClick={() => handleProjectClick(project)}>
              <ProjectImageContainer>
                <ProjectImage 
                  className="project-image" 
                  src={project.imageUrl} 
                  alt={project.title}
                />
              </ProjectImageContainer>
              <ProjectInfo>
                <ProjectTitle className="project-title">{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TagsContainer>
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
                <ProjectLinks className="project-links">
                  <ProjectLink onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project);
                  }}>
                    <FaArrowRight /> View Project
                  </ProjectLink>
                </ProjectLinks>
              </ProjectInfo>
            </ProjectCard>
          ))
        ) : (
          <ProjectsActionSection>
            <ActionTitle>No Projects Yet</ActionTitle>
            <ActionDescription>
              We're working on exciting new projects in this category. 
              Check back soon for amazing updates!
            </ActionDescription>
          </ProjectsActionSection>
        )}
      </ProjectsGrid>
      
      <ProjectsActionSection>
        <ActionTitle>Ready to Start Your Project?</ActionTitle>
        <ActionDescription>
          Let's bring your vision to life with cutting-edge technology and innovative design. 
          Our team is ready to transform your ideas into digital excellence.
        </ActionDescription>
        <ActionButton onClick={() => navigate('/contact-us')}>
          <FaRocket /> Start Your Project
        </ActionButton>
      </ProjectsActionSection>
    </ProjectsWrapper>
  );
};

export default Projects;
