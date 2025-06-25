import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCode } from 'react-icons/ai';

// Showcase components styling
export const CodeShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
`;

export const CodeShowcaseItem = styled.div`
  background: rgba(18, 18, 18, 0.95);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 235, 59, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(255, 235, 59, 0.1);
    border: 1px solid rgba(255, 235, 59, 0.4);
  }
`;

export const CodeShowcaseHeader = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, rgba(18, 18, 18, 0.9), rgba(30, 30, 30, 0.9));
`;

export const CodeShowcaseTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-weight: 600;
  
  svg {
    margin-right: 10px;
    color: #FFEB3B;
  }
`;

export const CodeShowcaseDescription = styled.p`
  padding: 16px 28px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin: 0;
`;

export const CodeDemoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 28px 28px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const CodeSnippetContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(25, 25, 25, 0.8);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 235, 59, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    border: 1px solid rgba(255, 235, 59, 0.4);
    box-shadow: 0 12px 35px rgba(255, 235, 59, 0.1);
  }
`;

export const CodeHeader = styled.div`
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.08), rgba(251, 182, 4, 0.05));
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #e0e0e0;
  border-bottom: 1px solid rgba(255, 235, 59, 0.2);
`;

export const CodeFileName = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.85rem;
  color: #FFEB3B;
  gap: 8px;

  svg {
    font-size: 1rem;
    color: #FFEB3B;
  }
`;

export const CodeLanguage = styled.span`
  background: linear-gradient(135deg, rgba(255, 235, 59, 0.2), rgba(251, 182, 4, 0.15));
  padding: 3px 10px;
  border-radius: 4px;
  color: #FFEB3B;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 235, 59, 0.3);
`;

export const DemoContainer = styled.div`
  background: rgba(25, 25, 25, 0.8);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 235, 59, 0.2);
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border: 1px solid rgba(255, 235, 59, 0.4);
    box-shadow: 0 12px 35px rgba(255, 235, 59, 0.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #FFEB3B, #00d4ff);
    z-index: 2;
  }
`;

export const PreBlock = styled.pre`
  margin: 0;
  padding: 18px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  max-height: 400px;
  min-height: 200px;
  color: #ffffff;
  background: #1a1a1a;
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  
  /* Set all code to white with normal font weight */
  .keyword, .string, .comment, .function, .variable, .operator, .number {
    color: #ffffff;
    font-weight: 400;
  }
  
  /* Add font smoothing for better readability */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// Rainbow text effect for code
export const RainbowCode = styled.div`
  background: linear-gradient(
    to right,
    #FFEB3B,
    #fbb604,
    #f99b04,
    #00d4ff,
    #49c5ff
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s linear infinite;
  
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

export default {
  CodeShowcaseGrid,
  CodeShowcaseItem,
  CodeShowcaseHeader,
  CodeShowcaseTitle,
  CodeShowcaseDescription,
  CodeDemoContainer,
  CodeSnippetContainer,
  CodeHeader,
  CodeFileName,
  CodeLanguage,
  DemoContainer,
  PreBlock,
  RainbowCode
}; 