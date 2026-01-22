import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { getHornymeterMessage } from "../utils/hornymeterMessages";

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
    content: "";
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
  font-family: ${({ theme }) => theme.fonts.heading};
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
  font-family: ${({ theme }) => theme.fonts.primary};
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

  @media (max-width: 685px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  font-family: ${({ theme }) => theme.fonts.primary};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const SubmitButton = styled(motion.button)`
  font-family: ${({ theme }) => theme.fonts.primary};
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
    content: "";
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const ErrorMessage = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.primary};
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
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialButton = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const WhatsAppButton = styled(SocialButton)`
  background: ${({ theme }) => theme.colors.gradient.green};
  box-shadow: 0 0 20px rgba(0, 230, 118, 0.3);

  &:hover {
    box-shadow: 0 0 30px rgba(0, 230, 118, 0.5);
  }
`;

const TwitterButton = styled(SocialButton)`
  background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
  box-shadow: 0 0 20px rgba(29, 161, 242, 0.3);

  &:hover {
    box-shadow: 0 0 30px rgba(29, 161, 242, 0.5);
  }
`;

const TelegramButton = styled(SocialButton)`
  background: linear-gradient(135deg, #0088cc 0%, #006ba1 100%);
  box-shadow: 0 0 20px rgba(0, 136, 204, 0.3);

  &:hover {
    box-shadow: 0 0 30px rgba(0, 136, 204, 0.5);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PopupContent = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(37, 37, 51, 0.98) 0%,
    rgba(26, 26, 36, 0.98) 100%
  );
  backdrop-filter: blur(20px);
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: ${({ theme }) => theme.spacing.xxxl};
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xxl}
      ${({ theme }) => theme.spacing.lg};
  }
`;

const PopupEmoji = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: bounce 1s ease-in-out;

  @keyframes bounce {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

const PopupMessage = styled.h2<{ value?: number }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ value }) => {
    if (!value || value <= 33)
      return "linear-gradient(90deg, #00E676 0%, #26FFA3 50%, #66FF99 100%)";
    if (value <= 66)
      return "linear-gradient(90deg, #FFD600 0%, #FFE44D 50%, #FFEB3B 100%)";
    return "linear-gradient(90deg, #FF4458 0%, #FF5266 50%, #FF6B7A 100%)";
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const PopupSubtext = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WHATSAPP_CHANNEL = "https://chat.whatsapp.com/HTw8cbU8ZocI2j8IV0XVcm";
const TWITTER_PROFILE = "https://x.com/xpoz_me";
const TELEGRAM_CHANNEL = "https://t.me/+JBmINhBYcUYzMmI0";

export const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successHornValue, setSuccessHornValue] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Get hornymeterValue from localStorage (set by Hero component)
    const storedHornValue = localStorage.getItem("hornymeterValue");
    const hornymeterValue = storedHornValue ? parseInt(storedHornValue, 10) : 0;

    try {
      await addDoc(collection(db, "xpoz-landing"), {
        email: email || null,
        model: model || null,
        hornymeterValue: hornymeterValue,
        timestamp: serverTimestamp()
      });

      // Generate success message based on hornymeter value
      if (hornymeterValue > 0) {
        const dynamicMessage = getHornymeterMessage(hornymeterValue);
        setSuccessMessage(
          `${dynamicMessage} Join our community while you cool down! 🔥`
        );
        setSuccessHornValue(hornymeterValue);
      } else {
        setSuccessMessage(
          "You've successfully joined the waitlist! We'll notify you as soon as we launch. Stay tuned!"
        );
        setSuccessHornValue(0);
      }

      // Show success modal
      setShowSuccessModal(true);
      setEmail("");
      setModel("");

      // Clear the stored hornymeter value after successful submission
      localStorage.removeItem("hornymeterValue");
    } catch (err: any) {
      setError(err.message || "Failed to join waitlist. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
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
            Join thousands of content creators and fans already on the waitlist.
            Be the first to know when we launch!
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
                type="text"
                placeholder="Enter favourite model..."
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </InputGroup>

            <SubmitButton
              type="submit"
              disabled={loading || (!email && !model)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{loading ? "Joining..." : "Join Waitlist 🚀"}</span>
            </SubmitButton>
          </Form>

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

          <SocialButtonsContainer>
            <TwitterButton
              href={TWITTER_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconWrapper>
                <TwitterIcon />
              </IconWrapper>
              <span>Follow on Twitter</span>
            </TwitterButton>

            <WhatsAppButton
              href={WHATSAPP_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconWrapper>
                <WhatsAppIcon />
              </IconWrapper>
              <span>Follow on WhatsApp</span>
            </WhatsAppButton>

            <TelegramButton
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconWrapper>
                <TelegramIcon />
              </IconWrapper>
              <span>Follow on Telegram</span>
            </TelegramButton>
          </SocialButtonsContainer>
        </GlassCard>
      </Container>

      {showSuccessModal && (
        <PopupOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSuccessModal}
        >
          <PopupContent
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeSuccessModal}>&times;</CloseButton>
            <PopupEmoji>✅</PopupEmoji>
            <PopupMessage value={successHornValue}>Success!</PopupMessage>
            <PopupSubtext>{successMessage}</PopupSubtext>
          </PopupContent>
        </PopupOverlay>
      )}
    </WaitlistSection>
  );
};
