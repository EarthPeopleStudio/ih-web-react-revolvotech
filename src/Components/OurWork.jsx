import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WorkWrapper = styled.div`
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

const Paragraph = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const List = styled.ul`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  padding-left: 20px;

  li {
    margin-bottom: 15px;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectImage = styled.div`
  height: 180px;
  background: linear-gradient(135deg, #303030 0%, #505050 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--text-primary);
  opacity: 0.8;
`;

const ProjectContent = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ProjectLink = styled.a`
  color: var(--text-primary);
  text-decoration: underline;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 5px;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
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

const ContactCTA = styled.div`
  margin-top: 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  text-align: center;
`;

const ContactLink = styled.a`
  color: var(--text-primary);
  text-decoration: underline;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const OurWork = () => {
  const navigate = useNavigate();

  return (
    <WorkWrapper>
      <Title>Our Work</Title>
      <Paragraph>
        At Revolvo Tech, our work is our passion. We design and develop innovative software solutions across a broad range of platforms—from mobile apps and desktop software to games and smart device applications. Our commitment to quality and excellence has earned us active clients from every corner of the world, including the USA, UK, Australia, Europe, Dubai, and Pakistan.
      </Paragraph>

      <Section>
        <SectionTitle>What We Do</SectionTitle>
        <List>
          <li><strong>Custom Software Development:</strong> Tailored solutions designed to meet your unique business needs.</li>
          <li><strong>Product Development:</strong> From concept to launch, we build engaging digital products that stand out in the market.</li>
          <li><strong>Game Development:</strong> Immersive and interactive gaming experiences that capture the imagination.</li>
          <li><strong>Cross-Platform Solutions:</strong> Our expertise spans across desktop, web, mobile (iOS, Android), smart wear, smart TV, console, and more.</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Our Global Impact</SectionTitle>
        <Paragraph>
          Our diverse portfolio is a testament to our ability to deliver outstanding results, no matter where our clients are based. Whether you are a startup looking for a cutting-edge app or an established enterprise in need of robust software solutions, Revolvo Tech is here to turn your vision into reality.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Featured Projects</SectionTitle>
        <ProjectGrid>
          <ProjectCard>
            <ProjectImage>α</ProjectImage>
            <ProjectContent>
              <ProjectTitle>Project Alpha</ProjectTitle>
              <ProjectDescription>
                A comprehensive enterprise software solution for a leading financial institution in the USA.
              </ProjectDescription>
              <ProjectLink href="#">View Case Study</ProjectLink>
            </ProjectContent>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectImage>β</ProjectImage>
            <ProjectContent>
              <ProjectTitle>Project Beta</ProjectTitle>
              <ProjectDescription>
                A mobile app revolutionizing online shopping experiences for clients in the UK and Australia.
              </ProjectDescription>
              <ProjectLink href="#">View Case Study</ProjectLink>
            </ProjectContent>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectImage>γ</ProjectImage>
            <ProjectContent>
              <ProjectTitle>Project Gamma</ProjectTitle>
              <ProjectDescription>
                An engaging game platform serving millions of users across Europe and Dubai.
              </ProjectDescription>
              <ProjectLink href="#">View Case Study</ProjectLink>
            </ProjectContent>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectImage>δ</ProjectImage>
            <ProjectContent>
              <ProjectTitle>Project Delta</ProjectTitle>
              <ProjectDescription>
                Innovative web solutions that drive digital transformation for businesses in Pakistan and beyond.
              </ProjectDescription>
              <ProjectLink href="#">View Case Study</ProjectLink>
            </ProjectContent>
          </ProjectCard>
        </ProjectGrid>
      </Section>

      <Section>
        <SectionTitle>Our Approach</SectionTitle>
        <Paragraph>
          We work closely with our clients to understand their goals, challenges, and unique needs. Our process is collaborative, transparent, and agile—ensuring that every project we deliver is not only technologically advanced but also aligned with your business objectives.
        </Paragraph>
        
        <ContactCTA>
          <Paragraph>
            Ready to see what we can do for you? Contact us today to discuss your project, or explore our case studies for more in-depth insights into our work.
          </Paragraph>
          <ContactLink href="mailto:hi@revolvo.tech">hi@revolvo.tech</ContactLink>
        </ContactCTA>
      </Section>

      <BackButton onClick={() => navigate(-1)}>← Go Back</BackButton>
    </WorkWrapper>
  );
};

export default OurWork; 