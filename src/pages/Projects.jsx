import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HiveKeyImage from "../assets/HiveKey.png";
import FreshCleaningLuxeImage from "../assets/Fresh Cleaning Luxe_ProjectLogo.png";

const ProjectsWrapper = styled.div`
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

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: var(--text-primary);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 6px;
  }
`;

const Tab = styled.button`
  padding: 14px 24px;
  border: none;
  background: ${(props) => (props.active ? "rgba(248, 248, 248, 0.15)" : "transparent")};
  color: ${(props) => (props.active ? "var(--text-primary)" : "var(--text-secondary)")};
  font-size: 1.1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  flex: 1;
  
  &:hover {
    background: ${(props) => (props.active ? "rgba(248, 248, 248, 0.15)" : "rgba(255, 255, 255, 0.05)")};
    color: var(--text-primary);
  }

  ${(props) => props.active && `
    &:after {
      content: "";
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background: #f8f8f8;
      border-radius: 2px;
    }
  `}
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProjectCard = styled.div`
  background: var(--card-bg);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.15);
    
    .project-image {
      transform: scale(1.05);
    }
    
    .view-project {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 65%;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  transition: transform 0.7s ease;
`;

const ProjectInfo = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-primary);
  line-height: 1.3;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const Tag = styled.span`
  background: rgba(248, 248, 248, 0.15);
  color: #f8f8f8;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ViewProjectButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0;
  background: rgba(248, 248, 248, 0.9);
  color: black;
  text-align: center;
  font-weight: 600;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  grid-column: 1 / -1;
`;

const EmptyStateText = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

// Dummy project data - replace with your actual data or API call
const projectsData = [
  {
    id: 1,
    title: "Hivekey",
    description: "Unbreakable passwords, effortlessly. HiveKey uses a complex, uncrackable algorithm to generate unique, robust passwords from your key phrase and service name.",
    imageUrl: HiveKeyImage,
    tags: ["Security", "Cryptography", "Cross-Platform", "Password Generator"],
    category: "Apps",
    path: "/projects/hivekey",
  },
  {
    id: 2,
    title: "Fresh Cleaning Luxe",
    description: "A sleek, modern, and user-friendly website for a luxury cleaning service, designed to attract and convert high-end clientele.",
    imageUrl: FreshCleaningLuxeImage,
    tags: ["React", "UI/UX Design", "Web Development", "Branding"],
    category: "Websites",
    path: "https://freshcleaningluxe.com",
  },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();
  
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
      <Title>Our Projects</Title>
      <Subtitle>
        Explore our portfolio of work across different categories. Each project showcases
        our commitment to quality, innovation, and delivering exceptional results.
      </Subtitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === "All"} 
          onClick={() => handleTabClick("All")}
        >
          All
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
          Apps
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
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TagsContainer>
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </ProjectInfo>
              <ViewProjectButton className="view-project">View Project</ViewProjectButton>
            </ProjectCard>
          ))
        ) : (
          <EmptyStateContainer>
            <EmptyStateText>No projects found in this category.</EmptyStateText>
          </EmptyStateContainer>
        )}
      </ProjectsGrid>
    </ProjectsWrapper>
  );
};

export default Projects;
