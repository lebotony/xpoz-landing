import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterSection = styled.footer`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Column = styled.div``;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LogoIcon = styled.span`
  font-size: 48px;
  filter: drop-shadow(0 0 20px rgba(255, 68, 88, 0.4));
`;

const LogoText = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  background: ${({ theme }) => theme.colors.gradient.hero};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.gradient.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const ColumnTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Bottom = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const LegalLink = styled.a`
  color: ${({ theme }) => theme.colors.textTertiary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <Grid>
          <Column>
            <Logo>
              <LogoIcon>💋</LogoIcon>
              <LogoText>XPOZ.ME</LogoText>
            </Logo>
            <Description>
              The ultimate platform for adult content creators to showcase their work,
              connect with fans, and monetize their content.
            </Description>
            <SocialLinks>
              <SocialLink
                href="https://twitter.com/xpozme"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                🐦
              </SocialLink>
              <SocialLink
                href="https://instagram.com/xpozme"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                📸
              </SocialLink>
              <SocialLink
                href="https://tiktok.com/@xpozme"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                🎵
              </SocialLink>
              <SocialLink
                href="https://discord.gg/xpozme"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                💬
              </SocialLink>
            </SocialLinks>
          </Column>

          <Column>
            <ColumnTitle>Product</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link href="#features">Features</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#pricing">Pricing</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#faq">FAQ</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#waitlist">Get Started</Link>
              </LinkItem>
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Company</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link href="/about">About Us</Link>
              </LinkItem>
              <LinkItem>
                <Link href="/careers">Careers</Link>
              </LinkItem>
              <LinkItem>
                <Link href="/blog">Blog</Link>
              </LinkItem>
              <LinkItem>
                <Link href="/contact">Contact</Link>
              </LinkItem>
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Support</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link href="/help">Help Center</Link>
              </LinkItem>
              <LinkItem>
                <Link href="/creator-guide">Creator Guide</Link>
              </LinkItem>
              <LinkItem>
                <Link href="/community">Community</Link>
              </LinkItem>
              <LinkItem>
                <Link href="/safety">Safety</Link>
              </LinkItem>
            </LinkList>
          </Column>
        </Grid>

        <Bottom>
          <Copyright>
            © {new Date().getFullYear()} XPOZ.ME. All rights reserved.
          </Copyright>
          <LegalLinks>
            <LegalLink href="/privacy">Privacy Policy</LegalLink>
            <LegalLink href="/terms">Terms of Service</LegalLink>
            <LegalLink href="/cookies">Cookie Policy</LegalLink>
          </LegalLinks>
        </Bottom>
      </Container>
    </FooterSection>
  );
};
