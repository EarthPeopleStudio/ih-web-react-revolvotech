import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaWindows, FaGooglePlay, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import HiveKeyImage from "../assets/HiveKey.png";
import FreshCleaningLuxeImage from "../assets/Fresh Cleaning Luxe_ProjectLogo.png";

const ProjectsPageWrapper = styled.div`
  min-height: 100vh;
  padding: 120px 8% 80px;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 6% 120px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 5% 140px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
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

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 800px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 50px;
  margin-top: 60px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 70px;
  }
`;

const ProjectCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(248, 248, 248, 0.3);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(248, 248, 248, 0.1);
  cursor: pointer;
  
  ${props => props.isHivekey && `
    overflow: hidden;
    position: relative;
    border: 2px solid rgba(251, 182, 4, var(--border-glow, 0));
  transition: all 0.3s ease;

        &:before {
      content: "";
      position: absolute;
      top: var(--y, 200px);
      left: var(--x, 160px);
      background: radial-gradient(
        circle at center,
        rgba(251, 182, 4, 0.6) 0%,
        rgba(244, 176, 24, 0.4) 30%,
        rgba(211, 148, 4, 0.2) 60%,
        transparent 100%
      );
      width: 400px;
      height: 400px;
      opacity: var(--proximity-opacity, 0);
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease;
      z-index: 0;
      pointer-events: none;
    }
    
    &:after {
      content: "";
      position: absolute;
      inset: 2px;
      border-radius: 18px;
      background: var(--card-bg);
      z-index: 1;
      pointer-events: none;
    }
    
  `}
  
  ${props => props.isFreshCleaning && `
    overflow: hidden;
    position: relative;
    border: 2px solid rgba(29, 100, 190, var(--border-glow, 0));
    transition: all 0.3s ease;

    &:before {
      content: "";
      position: absolute;
      top: var(--y, 200px);
      left: var(--x, 160px);
      background: radial-gradient(
        circle at center,
        rgba(29, 100, 190, 0.6) 0%,
        rgba(29, 100, 190, 0.4) 30%,
        rgba(29, 100, 190, 0.2) 60%,
        transparent 100%
      );
      width: 400px;
      height: 400px;
      opacity: var(--proximity-opacity, 0);
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease;
      z-index: 0;
      pointer-events: none;
    }

    &:after {
      content: "";
      position: absolute;
      inset: 2px;
      border-radius: 18px;
      background: var(--card-bg);
      z-index: 1;
      pointer-events: none;
    }
  `}
  
  ${props => !props.isHivekey && !props.isFreshCleaning && `
    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background: radial-gradient(circle at top right, rgba(248, 248, 248, 0.1), transparent 70%);
      opacity: 0;
      transition: opacity 0.6s ease-in-out;
    }
    
    &:hover:before {
      opacity: 1;
    }
  `}
  
  /* Keep the original gradient overlay for non-Hivekey cards */
  ${props => !props.isHivekey && !props.isFreshCleaning && `
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -2;
      background: radial-gradient(circle at top right, rgba(248, 248, 248, 0.1), transparent 70%);
      opacity: 0;
      transition: opacity 0.6s ease-in-out;
    }
    
    &:hover:after {
      opacity: 1;
    }
  `}
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  object-position: center;
  margin: -40px -40px 25px -40px;
  border-radius: 20px 20px 0 0;
  background-color: rgba(248, 248, 248, 0.05);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
`;

const ProjectContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${props => 
      props.isHivekey ? 'linear-gradient(90deg, #fbb604 0%, #f4b018 100%)' :
      props.isFreshCleaning ? 'linear-gradient(90deg, #1d64be 0%, #3b82f6 100%)' : 
      '#f8f8f8'
    };
    border-radius: 2px;
  }
  
  ${props => props.isHivekey && `
    background: linear-gradient(to right, #fbb604, #f99b04, #fbb604);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}
  
  ${props => props.isFreshCleaning && `
    background: linear-gradient(to right, #1d64be, #3b82f6, #1d64be);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  flex-grow: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
`;

const Tag = styled.span`
  background: ${props => props.isHivekey ? 'rgba(251, 182, 4, 0.1)' : props.isFreshCleaning ? 'rgba(29, 100, 190, 0.1)' : 'rgba(248, 248, 248, 0.1)'};
  color: ${props => props.isHivekey ? '#fbb604' : props.isFreshCleaning ? '#1d64be' : '#f8f8f8'};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid ${props => props.isHivekey ? 'rgba(251, 182, 4, 0.2)' : props.isFreshCleaning ? 'rgba(29, 100, 190, 0.2)' : 'rgba(248, 248, 248, 0.2)'};
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isHivekey ? 'rgba(251, 182, 4, 0.2)' : props.isFreshCleaning ? 'rgba(29, 100, 190, 0.2)' : 'rgba(248, 248, 248, 0.15)'};
    border-color: ${props => props.isHivekey ? 'rgba(251, 182, 4, 0.4)' : props.isFreshCleaning ? 'rgba(29, 100, 190, 0.4)' : 'rgba(248, 248, 248, 0.3)'};
    ${props => props.isHivekey && 'box-shadow: 0 5px 15px rgba(251, 182, 4, 0.15);'}
    ${props => props.isFreshCleaning && 'box-shadow: 0 5px 15px rgba(29, 100, 190, 0.15);'}
  }
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f8f8;
  color: black;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:first-child {
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid rgba(248, 248, 248, 0.3);
    
    &:hover {
      color: #f8f8f8;
      border-color: rgba(248, 248, 248, 0.5);
      background: rgba(248, 248, 248, 0.05);
    }
  }
`;

const BackButton = styled.button`
  background: #f8f8f8;
  color: black;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 100;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const Projects = () => {
  const navigate = useNavigate();
  const cardRefs = useRef({});
  
  const projectsData = [
    {
      id: 1,
      isHivekey: true,
      isFreshCleaning: false,
      title: "Hivekey",
      description: "Unbreakable passwords, effortlessly. HiveKey uses a complex, uncrackable algorithm to generate unique, robust passwords from your key phrase and service name.",
      image: HiveKeyImage,
      tags: ["Security", "Cryptography", "Cross-Platform", "Password Generator"],
      windowsLink: "https://revolvotech.s3.us-east-1.amazonaws.com/ih/app/flutter/hivekey/HiveKey.exe",
      playstoreLink: "https://play.google.com/store/apps/details?id=com.revolvotech.hivekey",
      live: "/projects/hivekey"
    },
    {
      id: 2,
      isHivekey: false,
      isFreshCleaning: true,
      title: "Fresh Cleaning Luxe",
      description: "A sleek, modern, and user-friendly website for a luxury cleaning service, designed to attract and convert high-end clientele.",
      image: FreshCleaningLuxeImage,
      tags: ["React", "UI/UX Design", "Web Development", "Branding"],
      github: "https://github.com/RevolvoTech/ic-web-react-freshcleaningluxe",
      live: "https://freshcleaningluxe.com"
    }
  ];

  const handleProjectClick = (project) => {
    if (project.live) {
      if (project.live.startsWith("http")) {
        window.open(project.live, '_blank', 'noopener,noreferrer');
      } else {
        navigate(project.live);
      }
    }
  };

  const handleGlobalMouseMove = (e) => {
    Object.keys(cardRefs.current).forEach(projectId => {
      const project = projectsData.find(p => p.id.toString() === projectId);
      if (project && (project.isHivekey || project.isFreshCleaning)) {
        const card = cardRefs.current[projectId];
        if (card) {
          const rect = card.getBoundingClientRect();
          
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          const isInside = mouseX >= rect.left && mouseX <= rect.right && 
                          mouseY >= rect.top && mouseY <= rect.bottom;
          
          const closestX = Math.max(rect.left, Math.min(mouseX, rect.right));
          const closestY = Math.max(rect.top, Math.min(mouseY, rect.bottom));
          
          const distance = Math.sqrt(
            Math.pow(mouseX - closestX, 2) + Math.pow(mouseY - closestY, 2)
          );
          
          const proximityThreshold = 150;
          
          if (isInside) {
            card.style.setProperty('--proximity-opacity', '0');
            card.style.setProperty('--border-glow', '1');
          } else {
            const opacity = distance <= proximityThreshold 
              ? Math.max(0, 1 - (distance / proximityThreshold))
              : 0;
            
            const x = mouseX - rect.left;
            const y = mouseY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            
            card.style.setProperty('--proximity-opacity', opacity.toString());
            card.style.setProperty('--border-glow', '0');
          }
        }
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <ProjectsPageWrapper>
      <Header>
        <Title>Our Work</Title>
        <Description>
          We build robust, scalable, and secure applications tailored to your needs. Here's a showcase of our craftsmanship and dedication to quality.
        </Description>
      </Header>

      <ProjectsGrid>
        {projectsData.map((project) => (
          <ProjectCard 
            key={project.id} 
            isHivekey={project.isHivekey}
            isFreshCleaning={project.isFreshCleaning}
            onClick={() => handleProjectClick(project)}
            ref={el => (cardRefs.current[project.id] = el)}
            className="project-card"
          >
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectContent>
              <ProjectTitle isHivekey={project.isHivekey} isFreshCleaning={project.isFreshCleaning}>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TagsContainer>
                {project.tags.map((tag, index) => (
                  <Tag key={index} isHivekey={project.isHivekey} isFreshCleaning={project.isFreshCleaning}>{tag}</Tag>
                ))}
              </TagsContainer>
              <LinksContainer>
                {project.isHivekey ? (
                  <>
                    <LinkButton href={project.windowsLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} isHivekey={project.isHivekey}>
                      <FaWindows /> Download for Windows
                    </LinkButton>
                    <LinkButton href={project.playstoreLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} isHivekey={project.isHivekey}>
                      <FaGooglePlay /> Download for Playstore
                    </LinkButton>
                  </>
                ) : (
                  <>
                    <LinkButton href={project.live} target="_blank" rel="noopener noreferrer" isHivekey={project.isHivekey} onClick={(e) => e.stopPropagation()}>
                      <FaExternalLinkAlt /> Live Website
                    </LinkButton>
                  </>
                )}
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
