import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  background: ${(props) => (props.active ? "rgba(255, 84, 112, 0.15)" : "transparent")};
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
    background: ${(props) => (props.active ? "rgba(255, 84, 112, 0.15)" : "rgba(255, 255, 255, 0.05)")};
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
      background: #ff5470;
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
  background: rgba(255, 84, 112, 0.15);
  color: #ff5470;
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
  background: rgba(255, 84, 112, 0.9);
  color: white;
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
    title: "Digital Art Collection",
    description: "A vibrant digital art collection exploring cyberpunk aesthetics and futuristic cityscapes.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Digital", "Cyberpunk", "Illustration"],
    category: "Art"
  },
  {
    id: 2,
    title: "Nature's Patterns",
    description: "An abstract art series inspired by organic patterns found in nature.",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Abstract", "Nature", "Digital"],
    category: "Art"
  },
  {
    id: 3, 
    title: "Mindful Meditation App",
    description: "A meditation app with a calming interface designed to help users practice mindfulness daily.",
    imageUrl: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Mobile", "Health", "UI/UX"],
    category: "Apps"
  },
  {
    id: 4,
    title: "E-commerce Platform",
    description: "A comprehensive redesign of an e-commerce platform focusing on improving the user experience.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Web", "UX", "E-commerce"],
    category: "Websites"
  },
  {
    id: 5,
    title: "Puzzle Quest Game",
    description: "A brain-teasing puzzle game with progressive difficulty levels and unique mechanics.",
    imageUrl: "https://images.unsplash.com/photo-1615680022647-99c397cbcb2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Mobile", "Puzzle", "Casual"],
    category: "Games"
  },
  {
    id: 6,
    title: "Space Explorer RPG",
    description: "An adventure game set in a procedurally generated universe with rich narrative elements.",
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["PC", "Adventure", "Sci-Fi"],
    category: "Games"
  },
  {
    id: 7,
    title: "Financial Dashboard",
    description: "A detailed financial analytics dashboard designed for clarity and data visualization.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Web", "Dashboard", "Analytics"],
    category: "UI/UX"
  },
  {
    id: 8,
    title: "Task Manager App",
    description: "A productivity app with a minimalist design philosophy focusing on simplicity and efficiency.",
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Mobile", "Productivity", "Minimal"],
    category: "Apps"
  },
  {
    id: 9,
    title: "Corporate Website",
    description: "A modern corporate website with enhanced user experience and responsive design for optimal performance across all devices.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Corporate", "Responsive", "Modern"],
    category: "Websites"
  },
  {
    id: 10,
    title: "Mobile Strategy Game",
    description: "A turn-based strategy game with deep mechanics and competitive multiplayer mode for mobile platforms.",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Strategy", "Multiplayer", "Mobile"],
    category: "Games"
  },
  {
    id: 11,
    title: "Healthcare Portal",
    description: "A comprehensive healthcare portal designed for patients to manage appointments, medical records, and virtual consultations.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Healthcare", "Portal", "Web"],
    category: "Websites"
  },
  {
    id: 12,
    title: "Restaurant UI Kit",
    description: "A complete UI/UX design system for restaurant and food delivery applications with customizable components.",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["UI Kit", "Food", "Components"],
    category: "UI/UX"
  },
  {
    id: 13,
    title: "Concept Art Series",
    description: "Elaborate concept art for an upcoming fantasy game, including character designs, environments, and weapons.",
    imageUrl: "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Concept Art", "Fantasy", "Game Design"],
    category: "Art"
  },
  {
    id: 14,
    title: "Social Media App",
    description: "A next-generation social media application focused on privacy and meaningful connections between users.",
    imageUrl: "https://images.unsplash.com/photo-1573152143286-0c422b4d2175?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    tags: ["Social", "Networking", "Mobile"],
    category: "Apps"
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  
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
    // This function can be expanded to open a modal or navigate to a project detail page
    console.log("Project clicked:", project);
    // For example: navigate(`/projects/${project.id}`) or open a modal with project details
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
        <Tab 
          active={activeTab === "Games"} 
          onClick={() => handleTabClick("Games")}
        >
          Games
        </Tab>
        <Tab 
          active={activeTab === "UI/UX"} 
          onClick={() => handleTabClick("UI/UX")}
        >
          UI/UX
        </Tab>
        <Tab 
          active={activeTab === "Art"} 
          onClick={() => handleTabClick("Art")}
        >
          Art
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