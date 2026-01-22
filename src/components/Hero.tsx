import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { Hornymeter } from "./Hornymeter";
import { TopModelsChart } from "./TopModelsChart";
import {
  getHornymeterMessage,
  getHorninessEmoji,
  getCommunityUnlockMessage,
  hasUnlockedCommunity
} from "../utils/hornymeterMessages";

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const BackgroundBlur = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`;

const Blob = styled(motion.div)<{
  $top?: string;
  $left?: string;
  $color?: string;
}>`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.3;
  top: ${({ $top }) => $top || "50%"};
  left: ${({ $left }) => $left || "50%"};
  background: ${({ $color }) => $color || "#FF4458"};
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
    flex-direction: column;
  }

  @media (max-width: 685px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const HornymeterWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 95%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  box-sizing: border-box;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    max-width: 100%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;

  @media (max-width: 685px) {
    flex-direction: column;
  }
`;

const ChartWrapperInside = styled.div`
  @media (max-width: 685px) {
    display: none;
  }
`;

const ChartWrapperOutside = styled.div`
  display: none;

  @media (max-width: 685px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.md};
    box-sizing: border-box;
    overflow: hidden;

    > * {
      max-width: 100%;
      width: 100%;
    }
  }
`;

const StylishInput = styled.input`
  font-family: ${({ theme }) => theme.fonts.primary};
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  backdrop-filter: blur(10px);

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
  font-family: ${({ theme }) => theme.fonts.primary};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradient.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  min-width: 100px;
  flex-shrink: 0;
  text-align: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  width: 100%;
  max-width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 1;
  }
`;

const LogoTitleWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media (max-width: 685px) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Logo = styled(motion.div)`
  font-size: 120px;
  filter: drop-shadow(0 0 40px rgba(255, 68, 88, 0.6));

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 50px;
  }
`;

const Title = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSize.hero};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  background: ${({ theme }) => theme.colors.gradient.hero};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -2px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xxxl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 45px;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  line-height: 1.6;
  max-width: 700px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
    width: 90%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  @media (max-width: 685px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
`;

const PrimaryButton = styled(motion.button)`
  font-family: ${({ theme }) => theme.fonts.primary};
  padding: ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.xxxl};
  background: ${({ theme }) => theme.colors.gradient.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.neon};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradient.secondary};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.normal};
  }

  &:hover::before {
    opacity: 1;
  }

  span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 85%;
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
  }
`;

const SecondaryButton = styled(motion.button)`
  font-family: ${({ theme }) => theme.fonts.primary};
  padding: ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.xxxl};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 85%;
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
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

const ModalButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PrimaryModalButton = styled(motion.button)`
  font-family: ${({ theme }) => theme.fonts.primary};
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.neon};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const SecondaryModalButton = styled(motion.button)`
  font-family: ${({ theme }) => theme.fonts.primary};
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 68, 88, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
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

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const [hornValue, setHornValue] = useState(0);
  const [email, setEmail] = useState("");
  const [model, setModel] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // NEW: State for confirmation modal and success modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [awaitingHornymeterSubmission, setAwaitingHornymeterSubmission] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successHornValue, setSuccessHornValue] = useState(0);

  const handleHornymeterChange = (value: number) => {
    setHornValue(value);
  };

  const scrollToWaitlist = () => {
    setTimeout(() => {
      document.getElementById("waitlist")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 300);
  };

  const scrollToCommunity = () => {
    setTimeout(() => {
      document.getElementById("community")?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  };

  const scrollToHornymeter = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 300);
  };

  const submitToFirebase = async (data: {
    email: string;
    model: string;
    hornymeterValue: number;
  }) => {
    try {
      await addDoc(collection(db, "xpoz-landing"), {
        email: data.email,
        model: data.model,
        hornymeterValue: data.hornymeterValue,
        timestamp: serverTimestamp()
      });

      return true;
    } catch (error) {
      alert(
        `Error submitting: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`
      );
      return false;
    }
  };

  // FLOW 1: Hornymeter slider interaction
  const handleSliderRelease = async () => {
    if (hornValue === 0) return;

    // FLOW 3: Complete submission after modal "Yes"
    if (awaitingHornymeterSubmission && email && model) {
      setSubmitting(true);
      const success = await submitToFirebase({
        email,
        model,
        hornymeterValue: hornValue
      });

      if (success) {
        // Show success modal with dynamic message
        const dynamicMessage = getHornymeterMessage(hornValue);
        setSuccessMessage(
          `${dynamicMessage} Join our community while you cool down! 🔥`
        );
        setSuccessHornValue(hornValue); // Save hornValue before resetting
        setShowSuccessModal(true);

        // Reset form and flags
        setEmail("");
        setModel("");
        setHornValue(0);
        setAwaitingHornymeterSubmission(false);
      }
      setSubmitting(false);
    } else {
      // FLOW 1: Normal slider interaction - redirect to Get Early Access form
      // Store hornValue in localStorage so Waitlist component can access it
      localStorage.setItem("hornymeterValue", hornValue.toString());
      scrollToWaitlist();
    }
  };

  // FLOW 2 & 4: Hero form submit
  const handleSubmit = async () => {
    if (!email || !model) {
      alert("Please fill in both email and favourite model fields");
      return;
    }

    // FLOW 2: Hornymeter value is 0 - show confirmation modal
    if (hornValue === 0) {
      setShowConfirmationModal(true);
      return;
    }

    // FLOW 4: Hornymeter value > 0 - direct submission
    setSubmitting(true);
    const success = await submitToFirebase({
      email,
      model,
      hornymeterValue: hornValue
    });

    if (success) {
      // Show success modal with dynamic message
      const dynamicMessage = getHornymeterMessage(hornValue);
      setSuccessMessage(
        `${dynamicMessage} Join our community while you cool down! 🔥`
      );
      setSuccessHornValue(hornValue); // Save hornValue before resetting
      setShowSuccessModal(true);

      // Reset form
      setEmail("");
      setModel("");
      setHornValue(0);
    }
    setSubmitting(false);
  };

  // Modal "Yes" - Add Hornymeter
  const handleModalYes = () => {
    setShowConfirmationModal(false);
    setAwaitingHornymeterSubmission(true);
    scrollToHornymeter();
  };

  // Modal "No" - Submit without Hornymeter
  const handleModalNo = async () => {
    setShowConfirmationModal(false);
    setSubmitting(true);

    const success = await submitToFirebase({
      email,
      model,
      hornymeterValue: 0
    });

    if (success) {
      setSuccessMessage(
        "Successfully submitted! Join our community to stay connected."
      );
      setSuccessHornValue(0); // No hornValue in this case
      setShowSuccessModal(true);

      // Reset form
      setEmail("");
      setModel("");
    }
    setSubmitting(false);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    scrollToCommunity();
  };

  return (
    <>
      <HeroSection>
        <BackgroundBlur>
          <Blob
            $top="20%"
            $left="20%"
            $color="#FF4458"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Blob
            $top="60%"
            $left="70%"
            $color="#00D4FF"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Blob
            $top="80%"
            $left="30%"
            $color="#FFD600"
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </BackgroundBlur>

        <HornymeterWrapper
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div onMouseUp={handleSliderRelease} onTouchEnd={handleSliderRelease}>
            <Hornymeter value={hornValue} onChange={handleHornymeterChange} />
          </div>
          <InputWrapper>
            <StylishInput
              type="email"
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StylishInput
              type="text"
              placeholder="Enter favourite model..."
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <SubmitButton
              onClick={handleSubmit}
              disabled={submitting || !email || !model}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {submitting ? "Submit" : "Submit"}
            </SubmitButton>
          </InputWrapper>
          <ChartWrapperInside>
            <TopModelsChart />
          </ChartWrapperInside>
        </HornymeterWrapper>

        <Content>
          <MainContent>
            <LogoTitleWrapper
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Logo
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                💋
              </Logo>

              <Title
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                XPOZ.ME
              </Title>
            </LogoTitleWrapper>

            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              The ultimate platform for adult content creators to showcase their
              work and connect directly with fans. Unleash your creativity, grow
              your audience, and promote your content like never before — coming
              soon.
            </Subtitle>

            <CTAButtons
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <PrimaryButton
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Early Access 🚀</span>
              </PrimaryButton>
              <SecondaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </SecondaryButton>
            </CTAButtons>
          </MainContent>
        </Content>
      </HeroSection>

      <ChartWrapperOutside>
        <TopModelsChart />
      </ChartWrapperOutside>

      {showConfirmationModal && (
        <PopupOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeConfirmationModal}
        >
          <PopupContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeConfirmationModal}>&times;</CloseButton>
            <PopupEmoji>🤔</PopupEmoji>
            <PopupMessage>Add Hornymeter Value?</PopupMessage>
            <PopupSubtext>
              Do you want to submit your details without a Hornymeter value, or
              would you like to add it using the Hornymeter slider?
            </PopupSubtext>
            <ModalButtonGroup>
              <PrimaryModalButton
                onClick={handleModalYes}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Yes, add Hornymeter
              </PrimaryModalButton>
              <SecondaryModalButton
                onClick={handleModalNo}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                No, submit without it
              </SecondaryModalButton>
            </ModalButtonGroup>
          </PopupContent>
        </PopupOverlay>
      )}

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
    </>
  );
};
