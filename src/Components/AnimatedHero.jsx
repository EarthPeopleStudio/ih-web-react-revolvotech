import React, { Suspense } from "react";
import styled from "styled-components";
import Model3D from "./Model3D";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--dark-bg);
`;

const ModelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-primary);
  font-size: 1.2rem;
  text-align: center;
`;

const AnimatedHero = () => {
  const modelUrl = "/models/model.glb";

  return (
    <HeroContainer>
      <Suspense fallback={<LoadingContainer>Loading 3D Model...</LoadingContainer>}>
        <ModelContainer>
          <Model3D modelUrl={modelUrl} />
        </ModelContainer>
      </Suspense>
    </HeroContainer>
  );
};

export default AnimatedHero;