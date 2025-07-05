import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MarketContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: var(--dark-bg);
  padding: 2rem;
`;

const MarketHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchSection = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  animation: ${fadeIn} 1s ease-out;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 50px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const CategoriesSection = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeIn} 1.2s ease-out;
`;

const CategoriesTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-color);
    transform: translateY(-3px);
  }

  &.active {
    background: linear-gradient(
      135deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-color: transparent;
  }
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  color: var(--text-primary);
  font-weight: 600;
`;

const FeaturedSection = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeIn} 1.4s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: var(--primary-color);
  }
`;

const FeatureImage = styled.div`
  height: 200px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const FeatureContent = styled.div`
  padding: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FeatureButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const StatsSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  animation: ${fadeIn} 1.6s ease-out;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  h3 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
`;

const MarketPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All", icon: "🌟" },
    { id: "tools", name: "Tools", icon: "🛠️" },
    { id: "entertainment", name: "Entertainment", icon: "🎮" },
    { id: "productivity", name: "Productivity", icon: "📊" },
    { id: "social", name: "Social", icon: "👥" },
    { id: "education", name: "Education", icon: "📚" },
  ];

  const features = [
    {
      id: 1,
      title: "Smart Dashboard",
      description:
        "AI-powered analytics and insights for your personal and business metrics.",
      icon: "📊",
      category: "productivity",
      link: "/dashboard",
    },
    {
      id: 2,
      title: "Social Hub",
      description:
        "Connect with friends, share updates, and discover new communities.",
      icon: "🌐",
      category: "social",
      link: "/social",
    },
    {
      id: 3,
      title: "Learning Center",
      description:
        "Interactive courses, tutorials, and skill-building experiences.",
      icon: "🎓",
      category: "education",
      link: "/learning",
    },
    {
      id: 4,
      title: "Creative Studio",
      description:
        "Professional tools for content creation, editing, and collaboration.",
      icon: "🎨",
      category: "tools",
      link: "/studio",
    },
    {
      id: 5,
      title: "Game Center",
      description: "Exciting games, challenges, and competitions with friends.",
      icon: "🎮",
      category: "entertainment",
      link: "/games",
    },
    {
      id: 6,
      title: "Wellness Tracker",
      description:
        "Monitor your health, fitness goals, and mindfulness journey.",
      icon: "🏃‍♂️",
      category: "productivity",
      link: "/wellness",
    },
  ];

  const filteredFeatures = features.filter((feature) => {
    const matchesCategory =
      selectedCategory === "all" || feature.category === selectedCategory;
    const matchesSearch =
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Market - Choreo</title>
        <meta
          name="description"
          content="Explore features, tools, and experiences in the Choreo marketplace"
        />
      </Helmet>

      <MarketContainer>
        <MarketHeader>
          <Title>Choreo Market</Title>
          <Subtitle>
            Discover amazing features, tools, and experiences designed to
            enhance your digital life.
          </Subtitle>
        </MarketHeader>

        <SearchSection>
          <SearchInput
            type="text"
            placeholder="Search features, tools, and experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchSection>

        <CategoriesSection>
          <CategoriesTitle>Categories</CategoriesTitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                className={selectedCategory === category.id ? "active" : ""}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </CategoriesSection>

        <FeaturedSection>
          <SectionTitle>
            {selectedCategory === "all"
              ? "Featured"
              : categories.find((c) => c.id === selectedCategory)?.name}
          </SectionTitle>
          <FeaturedGrid>
            {filteredFeatures.map((feature) => (
              <FeatureCard key={feature.id}>
                <FeatureImage>{feature.icon}</FeatureImage>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  <FeatureButton to={feature.link}>Explore</FeatureButton>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeaturedGrid>

          {filteredFeatures.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-secondary)",
              }}
            >
              <h3>No features found</h3>
              <p>Try adjusting your search or category filters.</p>
            </div>
          )}
        </FeaturedSection>

        <StatsSection>
          <h2
            style={{
              color: "var(--text-primary)",
              marginBottom: "2rem",
              fontSize: "2rem",
            }}
          >
            Platform Statistics
          </h2>
          <StatsGrid>
            <StatCard>
              <h3>50K+</h3>
              <p>Active Users</p>
            </StatCard>
            <StatCard>
              <h3>25+</h3>
              <p>Features Available</p>
            </StatCard>
            <StatCard>
              <h3>99.9%</h3>
              <p>Uptime</p>
            </StatCard>
            <StatCard>
              <h3>24/7</h3>
              <p>Support</p>
            </StatCard>
          </StatsGrid>
        </StatsSection>
      </MarketContainer>
    </>
  );
};

export default MarketPage;
