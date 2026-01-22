import { useState, useEffect } from "react";
import {
  HornymeterContainer,
  HornymeterHeader,
  HornymeterLabel,
  SliderWrapper,
  HornymeterSlider,
  HornymeterTrack,
  HornymeterFill,
  HornymeterThumb,
  HornymeterValue,
  HornymeterIcon,
  HornymeterDescription,
  HornymeterGlow,
  LevelBadge,
  EmojiParticle
} from "./styles";
import {
  getHorninessTone,
  getHorninessEmoji,
} from "../../utils/hornymeterMessages";

interface HornymeterProps {
  value: number;
  onChange: (value: number) => void;
}

export const Hornymeter = ({ value, onChange }: HornymeterProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (Math.abs(value - prevValue) > 10) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevValue(value);
  }, [value, prevValue]);

  // Removed - now using utility functions from hornymeterMessages

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      onChange(newValue);
    });
  };

  return (
    <HornymeterContainer>
      <HornymeterGlow value={value} isDragging={isDragging} />
      <HornymeterHeader>
        <HornymeterLabel>
          <HornymeterIcon value={value} isDragging={isDragging}>
            {getHorninessEmoji(value)}
          </HornymeterIcon>
          HORNYMETER
        </HornymeterLabel>
        <LevelBadge value={value}>{getHorninessTone(value)}</LevelBadge>
      </HornymeterHeader>

      <SliderWrapper>
        <HornymeterSlider
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          onInput={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchCancel={() => setIsDragging(false)}
        />
        <HornymeterTrack>
          <HornymeterFill value={value} isDragging={isDragging} />
          <HornymeterThumb value={value} isDragging={isDragging}>
            <span>{getHorninessEmoji(value)}</span>
          </HornymeterThumb>
          {showParticles && (
            <>
              <EmojiParticle delay={0}>{getHorninessEmoji(value)}</EmojiParticle>
              <EmojiParticle delay={100}>{getHorninessEmoji(value)}</EmojiParticle>
              <EmojiParticle delay={200}>{getHorninessEmoji(value)}</EmojiParticle>
            </>
          )}
        </HornymeterTrack>
      </SliderWrapper>

      <HornymeterValue value={value}>
        <span>{value}%</span>
        <HornymeterDescription>
          {getHorninessTone(value)}
        </HornymeterDescription>
      </HornymeterValue>
    </HornymeterContainer>
  );
};
