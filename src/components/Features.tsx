import { motion } from 'framer-motion';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient.hero};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxxl};
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.gradient.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient.hero};
    transform: scaleX(0);
    transition: transform ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.neon};
    border-color: ${({ theme }) => theme.colors.primary};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.gradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const features = [
  {
    icon: '🎬',
    title: 'Post Unlimited Content',
    description: 'Share photos, videos, and live streams. No limits on what you can create and share with your audience.',
  },
  {
    icon: '💰',
    title: 'Monetize Your Content',
    description: 'Earn money through subscriptions, tips, and exclusive content. Keep more of what you earn with our low fees.',
  },
  {
    icon: '👥',
    title: 'Build Your Community',
    description: 'Engage with fans through comments, likes, and direct messages. Create lasting connections with your audience.',
  },
  {
    icon: '🔗',
    title: 'Link to All Platforms',
    description: 'Connect your OnlyFans, StripChat, and other platforms. Drive traffic to all your revenue streams.',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Track your performance with detailed insights. See what content resonates and optimize your strategy.',
  },
  {
    icon: '🔒',
    title: 'Privacy & Security',
    description: 'Your content is protected with industry-leading security. Control who sees what and when.',
  },
];

export const Features = () => {
  return (
    <FeaturesSection id="features">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Everything You Need to Succeed
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Powerful tools designed specifically for adult content creators
        </SectionSubtitle>

        <Grid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </FeaturesSection>
  );
};
