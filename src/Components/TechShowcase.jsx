import React from "react";
import styled from "styled-components";

const ShowcaseWrapper = styled.div`
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

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 800px;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const TechCategory = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const TechList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TechItem = styled.li`
  color: var(--text-secondary);
  margin-bottom: 10px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 40px;
  overflow-x: auto;
  border: 1px solid var(--border-color);
`;

const CodeTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const Code = styled.pre`
  color: var(--text-secondary);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const TechShowcase = () => {
  return (
    <ShowcaseWrapper>
      <Title>Tech Showcase</Title>
      <Subtitle>
        At Revolvo Tech, we work with a diverse range of technologies to create cutting-edge solutions. 
        Here's a showcase of the technologies we use and examples of our code quality across different languages.
      </Subtitle>
      
      <TechGrid>
        <TechCategory>
          <CategoryTitle>Web Development</CategoryTitle>
          <TechList>
            <TechItem>React.js</TechItem>
            <TechItem>Next.js</TechItem>
            <TechItem>Angular</TechItem>
            <TechItem>Vue.js</TechItem>
            <TechItem>Node.js</TechItem>
            <TechItem>Express</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory>
          <CategoryTitle>Mobile Development</CategoryTitle>
          <TechList>
            <TechItem>React Native</TechItem>
            <TechItem>Flutter</TechItem>
            <TechItem>Swift</TechItem>
            <TechItem>Kotlin</TechItem>
            <TechItem>Java</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory>
          <CategoryTitle>Game Development</CategoryTitle>
          <TechList>
            <TechItem>Unity3D</TechItem>
            <TechItem>Unreal Engine</TechItem>
            <TechItem>Godot</TechItem>
            <TechItem>WebGL</TechItem>
            <TechItem>AR/VR Technologies</TechItem>
          </TechList>
        </TechCategory>
        
        <TechCategory>
          <CategoryTitle>Backend & Infrastructure</CategoryTitle>
          <TechList>
            <TechItem>Python</TechItem>
            <TechItem>Java</TechItem>
            <TechItem>C#/.NET</TechItem>
            <TechItem>Go</TechItem>
            <TechItem>Docker</TechItem>
            <TechItem>AWS/Azure</TechItem>
          </TechList>
        </TechCategory>
      </TechGrid>
      
      <CodeTitle>React Component Example</CodeTitle>
      <CodeBlock>
        <Code>{`import React, { useState, useEffect } from 'react';

const DataFetcher = ({ endpoint, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return render({ data, loading, error });
};

export default DataFetcher;
`}</Code>
      </CodeBlock>
      
      <CodeTitle>Mobile App - React Native Example</CodeTitle>
      <CodeBlock>
        <Code>{`import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductList = ({ products }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>\${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  // Additional styles...
});

export default ProductList;
`}</Code>
      </CodeBlock>
    </ShowcaseWrapper>
  );
};

export default TechShowcase; 