import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Hornymeter } from './Hornymeter';
import {
  getHornymeterMessage,
  getHorninessEmoji,
  getCommunityUnlockMessage,
  hasUnlockedCommunity,
} from '../utils/hornymeterMessages';

const Section = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background: ${({ theme }) => theme.colors.darker};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: 700px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
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

  @media (max-width: 700px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
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

  @media (max-width: 700px) {
    padding: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

const PopupEmoji = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: bounce 1s ease-in-out;

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  @media (max-width: 700px) {
    font-size: 48px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const PopupMessage = styled.h2<{ value: number }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.black};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ value }) => {
    if (value <= 33) return 'linear-gradient(90deg, #00E676 0%, #26FFA3 50%, #66FF99 100%)';
    if (value <= 66) return 'linear-gradient(90deg, #FFD600 0%, #FFE44D 50%, #FFEB3B 100%)';
    return 'linear-gradient(90deg, #FF4458 0%, #FF5266 50%, #FF6B7A 100%)';
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 700px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const PopupSubtext = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 700px) {
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
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

// Removed - now using utility functions from hornymeterMessages

export const HornymeterSection = () => {
  const [hornValue, setHornValue] = useState(50);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleHornymeterChange = (value: number) => {
    setHornValue(value);
  };

  const handleSliderRelease = () => {
    // Generate dynamic message
    const message = getHornymeterMessage(hornValue);
    setPopupMessage(message);

    // Show popup when user releases the slider
    setShowPopup(true);

    // Scroll to community section (not waitlist)
    setTimeout(() => {
      document.getElementById('community')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 300);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Section>
        <Container>
          <div
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
          >
            <Hornymeter value={hornValue} onChange={handleHornymeterChange} />
          </div>
        </Container>
      </Section>

      {showPopup && (
        <PopupOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
        >
          <PopupContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closePopup}>&times;</CloseButton>
            <PopupEmoji>{getHorninessEmoji(hornValue)}</PopupEmoji>
            <PopupMessage value={hornValue}>
              {popupMessage}
            </PopupMessage>
            <PopupSubtext>
              {hasUnlockedCommunity(hornValue)
                ? getCommunityUnlockMessage(hornValue)
                : "Keep sliding to unlock the community 😏"}
            </PopupSubtext>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};
