import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const ExploreContainer = styled.div`
  min-height: calc(100vh - 140px);
  padding: 2rem;
  background: var(--dark-bg);
  color: var(--text-primary);
  text-align: center;
`;

const ExplorePage = () => {
  return (
    <>
      <Helmet>
        <title>Explore - Choreo</title>
        <meta
          name="description"
          content="Explore new features and content on Choreo"
        />
      </Helmet>

      <ExploreContainer>
        <h1>Explore Choreo</h1>
        <p>Discover new features, content, and possibilities.</p>
      </ExploreContainer>
    </>
  );
};

export default ExplorePage;
