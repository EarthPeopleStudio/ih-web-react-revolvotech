import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.2);
  border-radius: 16px;
  padding: ${props => props.compact ? '1.5rem' : '2rem'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.02) 1px, transparent 1px);
    background-size: 25px 25px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(251, 182, 4, 0.4);
    box-shadow: 0 20px 40px rgba(251, 182, 4, 0.1);
  }
`;

const CardHeader = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: ${props => props.title || props.subtitle ? '1.5rem' : '0'};
  
  ${props => props.action && `
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `}
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: ${props => props.hasSubtitle ? '0.5rem' : '0'};
  position: relative;
  z-index: 1;
`;

const CardSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CardFooter = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActionArea = styled.div`
  position: relative;
  z-index: 1;
`;

const RevolvoCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  compact = false,
  className,
  onClick,
  ...motionProps
}) => {
  return (
    <Card
      compact={compact}
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...motionProps}
    >
      {(title || subtitle || action) && (
        <CardHeader title={title} subtitle={subtitle} action={action}>
          <div>
            {title && (
              <CardTitle hasSubtitle={!!subtitle}>
                {title}
              </CardTitle>
            )}
            {subtitle && (
              <CardSubtitle>
                {subtitle}
              </CardSubtitle>
            )}
          </div>
          {action && (
            <ActionArea>
              {action}
            </ActionArea>
          )}
        </CardHeader>
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default RevolvoCard;