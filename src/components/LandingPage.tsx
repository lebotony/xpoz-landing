import React from 'react';
import styled from 'styled-components';
import { Hero } from './Hero';
import { Features } from './Features';
import { Waitlist } from './Waitlist';
import { Community } from './Community';
import { Footer } from './Footer';

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.darker};
`;

const LandingPage = () => {
  const handleGetStarted = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Community />
      <Waitlist />
      <Footer />
    </PageContainer>
  );
};

export default LandingPage;
