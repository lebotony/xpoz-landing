import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const float = keyframes`
  0% { transform: translateY(0px) scale(1); opacity: 1; }
  100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
`;

const intensePulse = keyframes`
  0%, 100% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.05); filter: brightness(1.2); }
`;

const getGlowColor = (value: number): string => {
  if (value <= 33) return "rgba(0, 230, 118, 0.4)";
  if (value <= 66) return "rgba(255, 214, 0, 0.4)";
  return "rgba(255, 68, 88, 0.5)";
};

export const HornymeterGlow = styled.div<{
  value: number;
  isDragging: boolean;
}>`
  position: absolute;
  inset: -20px;
  background: radial-gradient(
    circle at center,
    ${({ value }) => getGlowColor(value)},
    transparent 70%
  );
  opacity: ${({ isDragging, value }) =>
    isDragging ? 0.8 : value > 80 ? 0.7 : 0.4};
  filter: blur(${({ value }) => (value > 80 ? 40 : 30)}px);
  pointer-events: none;
  animation: ${({ value }) => (value > 80 ? intensePulse : glowPulse)}
    ${({ value }) => (value > 80 ? "1s" : "2s")} ease-in-out infinite;
  transition:
    opacity 300ms ease-in-out,
    filter 300ms ease-in-out;
`;

export const HornymeterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 24px;
  background: linear-gradient(
    135deg,
    rgba(37, 37, 51, 0.95) 0%,
    rgba(26, 26, 36, 0.95) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  min-width: 200px;
  overflow: hidden;

  @media (max-width: 700px) {
    padding: 10px 16px;
    gap: 4px;
  }
`;

export const HornymeterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const HornymeterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 11px;
    gap: 6px;
  }
`;

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const HornymeterIcon = styled.span<{
  value: number;
  isDragging: boolean;
}>`
  font-size: 20px;
  filter: drop-shadow(0 2px 8px ${({ value }) => getGlowColor(value)});
  animation: ${({ isDragging }) => (isDragging ? pulse : "none")} 0.5s
    ease-in-out infinite;
  transition: all 300ms ease-in-out;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const HornymeterSlider = styled.input`
  width: 100%;
  height: 40px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  cursor: pointer;
  margin: 0;
  padding: 0;
  touch-action: pan-x;
  -webkit-user-select: none;
  user-select: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 40px;
    height: 40px;
    background: transparent;
    border-radius: 50%;
    cursor: grab;
    border: none;
    -webkit-tap-highlight-color: transparent;
    pointer-events: auto;
  }

  &:active::-webkit-slider-thumb {
    cursor: grabbing;
  }

  &::-moz-range-thumb {
    width: 40px;
    height: 40px;
    background: transparent;
    border-radius: 50%;
    cursor: grab;
    border: none;
  }

  &:active::-moz-range-thumb {
    cursor: grabbing;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: none;
  }

  &::-moz-range-track {
    background: transparent;
    border: none;
  }
`;

export const HornymeterTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
  overflow: visible;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  pointer-events: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const getHornynessGradient = (value: number): string => {
  if (value <= 33)
    return "linear-gradient(90deg, #00E676 0%, #26FFA3 50%, #66FF99 100%)";
  if (value <= 66)
    return "linear-gradient(90deg, #FFD600 0%, #FFE44D 50%, #FFEB3B 100%)";
  return "linear-gradient(90deg, #FF4458 0%, #FF5266 50%, #FF6B7A 100%)";
};

const getHornynessShadow = (value: number, isDragging: boolean): string => {
  const intensity = isDragging ? 0.6 : 0.4;
  if (value <= 33)
    return `0 0 20px rgba(0, 230, 118, ${intensity}), 0 4px 12px rgba(0, 230, 118, 0.3)`;
  if (value <= 66)
    return `0 0 20px rgba(255, 214, 0, ${intensity}), 0 4px 12px rgba(255, 214, 0, 0.3)`;
  return `0 0 20px rgba(255, 68, 88, ${intensity}), 0 4px 12px rgba(255, 68, 88, 0.3)`;
};

export const HornymeterFill = styled.div<{
  value: number;
  isDragging: boolean;
}>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ value }) => value}%;
  background: ${({ value }) => getHornynessGradient(value)};
  background-size: 200% 100%;
  box-shadow: ${({ value, isDragging }) =>
    getHornynessShadow(value, isDragging)};
  transition: ${({ isDragging }) =>
    isDragging ? "none" : "width 0ms, box-shadow 300ms ease-in-out"};
  border-radius: 9999px;
  animation: ${shimmer} 3s linear infinite;
  will-change: width;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 100%
    );
    border-radius: 9999px 9999px 0 0;
  }
`;

const getThumbGradient = (value: number): string => {
  if (value <= 33)
    return "linear-gradient(135deg, #00E676 0%, #26FFA3 50%, #66FF99 100%)";
  if (value <= 66)
    return "linear-gradient(135deg, #FFD600 0%, #FFE44D 50%, #FFEB3B 100%)";
  return "linear-gradient(135deg, #FF4458 0%, #FF5266 50%, #FF6B7A 100%)";
};

const getThumbShadow = (value: number, isDragging: boolean): string => {
  if (value <= 33) {
    return isDragging
      ? "0 8px 24px rgba(0, 230, 118, 0.8)"
      : "0 4px 12px rgba(0, 230, 118, 0.6)";
  }
  if (value <= 66) {
    return isDragging
      ? "0 8px 24px rgba(255, 214, 0, 0.8)"
      : "0 4px 12px rgba(255, 214, 0, 0.6)";
  }
  return isDragging
    ? "0 8px 24px rgba(255, 68, 88, 0.8)"
    : "0 4px 12px rgba(255, 68, 88, 0.6)";
};

export const HornymeterThumb = styled.div<{
  value: number;
  isDragging: boolean;
}>`
  position: absolute;
  left: calc(${({ value }) => value}% - 0px);
  top: 50%;
  transform: translate(-50%, -50%)
    ${({ isDragging }) => (isDragging ? "scale(1.2)" : "scale(1)")};
  width: 26px;
  height: 26px;
  background: ${({ value }) => getThumbGradient(value)};
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${({ value, isDragging }) => getThumbShadow(value, isDragging)};
  transition: ${({ isDragging }) =>
    isDragging ? "none" : "left 0ms, transform 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)"};
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  animation: ${({ value }) => (value > 80 ? shake : "none")} 0.5s ease-in-out
    infinite;
  will-change: left;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(-50%, -50%, 0)
    ${({ isDragging }) => (isDragging ? "scale(1.2)" : "scale(1)")};

  span {
    font-size: 14px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    animation: ${({ value }) => (value > 80 ? pulse : "none")} 0.8s ease-in-out
      infinite;
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
  }
`;

const getLevelBadgeColor = (value: number): string => {
  if (value <= 33)
    return "linear-gradient(135deg, rgba(0, 230, 118, 0.15), rgba(102, 255, 153, 0.15))";
  if (value <= 66)
    return "linear-gradient(135deg, rgba(255, 214, 0, 0.15), rgba(255, 235, 59, 0.15))";
  return "linear-gradient(135deg, rgba(255, 68, 88, 0.15), rgba(255, 107, 122, 0.15))";
};

const getLevelBadgeTextColor = (value: number): string => {
  if (value <= 33) return "#00E676";
  if (value <= 66) return "#FFD600";
  return "#FF4458";
};

export const LevelBadge = styled.div<{ value: number }>`
  padding: 4px 10px;
  background: ${({ value }) => getLevelBadgeColor(value)};
  border: 1px solid ${({ value }) => getLevelBadgeTextColor(value)}33;
  border-radius: 9999px;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: ${({ value }) => getLevelBadgeTextColor(value)};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 2px 8px ${({ value }) => getLevelBadgeTextColor(value)}40;
  transition: all 300ms ease-in-out;

  @media (max-width: 480px) {
    font-size: 8px;
    padding: 3px 8px;
  }
`;

const getValueColor = (value: number): string => {
  if (value <= 33) return "#00E676";
  if (value <= 66) return "#FFD600";
  return "#FF4458";
};

export const HornymeterValue = styled.div<{ value: number }>`
  display: flex;
  align-items: baseline;
  gap: 6px;
  justify-content: center;
  margin-top: 2px;

  span {
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    font-size: 18px;
    font-weight: 700;
    background: ${({ value }) => getHornynessGradient(value)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 8px ${({ value }) => getValueColor(value)}60);

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

export const HornymeterDescription = styled.span`
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

export const EmojiParticle = styled.div<{ delay: number }>`
  position: absolute;
  font-size: 20px;
  animation: ${float} 600ms ease-out forwards;
  animation-delay: ${({ delay }) => delay}ms;
  pointer-events: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;
