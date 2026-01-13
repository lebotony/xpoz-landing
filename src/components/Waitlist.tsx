import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const WaitlistSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const GlassCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.gradient.glass};
  backdrop-filter: blur(30px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: ${({ theme }) => theme.spacing.xxxl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: ${({ theme }) => theme.colors.gradient.hero};
    border-radius: ${({ theme }) => theme.borderRadius.xxl};
    z-index: -1;
    opacity: 0.1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradient.hero};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 4px rgba(255, 68, 88, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradient.secondary};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.normal};
  }

  &:hover:not(:disabled)::before {
    opacity: 1;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient.green};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ErrorMessage = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient.red};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const WhatsAppButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient.green};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 0 20px rgba(0, 230, 118, 0.3);

  &:hover {
    box-shadow: 0 0 30px rgba(0, 230, 118, 0.5);
  }
`;

const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/0029VavN0vj62WiP3jIhwR3E';

export const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addDoc(collection(db, 'waitlist'), {
        email: email || null,
        whatsapp: whatsapp || null,
        timestamp: serverTimestamp(),
      });

      setSuccess(true);
      setEmail('');
      setWhatsapp('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to join waitlist. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WaitlistSection id="waitlist">
      <Container>
        <GlassCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title>Get Early Access</Title>
          <Subtitle>
            Join thousands of creators already on the waitlist. Be the first to know when we launch!
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="tel"
                placeholder="WhatsApp number (optional)"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </InputGroup>

            <SubmitButton
              type="submit"
              disabled={loading || (!email && !whatsapp)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{loading ? 'Joining...' : 'Join Waitlist 🚀'}</span>
            </SubmitButton>
          </Form>

          {success && (
            <SuccessMessage
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🎉 You're on the list! We'll notify you when we launch.
            </SuccessMessage>
          )}

          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ❌ {error}
            </ErrorMessage>
          )}

          <Divider>
            <span>OR</span>
          </Divider>

          <WhatsAppButton
            href={WHATSAPP_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📱</span>
            <span>Follow on WhatsApp</span>
          </WhatsAppButton>
        </GlassCard>
      </Container>
    </WaitlistSection>
  );
};
