import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  CHALLENGE_DURATION,
  COLORS,
  computeTotalDuration,
  FEATURE_DURATION,
  INTRO_DURATION,
  OUTRO_DURATION,
  RESULT_DURATION,
} from "./constants";
import { FeatureTourScene } from "./FeatureTourScene";
import { IntroScene } from "./IntroScene";
import { OutroScene } from "./OutroScene";
import { ResultScene } from "./ResultScene";
import { customerStorySchema, type CustomerStoryData } from "./schema";
import { StoryScene } from "./StoryScene";

export { computeTotalDuration, customerStorySchema };

export const CustomerStory: React.FC<CustomerStoryData> = (props) => {
  const { features } = props;

  const CHALLENGE_START = INTRO_DURATION;
  const FEATURES_START = CHALLENGE_START + CHALLENGE_DURATION;
  const RESULT_START = FEATURES_START + features.length * FEATURE_DURATION;
  const OUTRO_START = RESULT_START + RESULT_DURATION;

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Background music — loops automatically, fades out in last 60 frames */}
      <Audio
        src={staticFile("music/background.mp3")}
        volume={(f) => {
          const total = computeTotalDuration(features.length);
          // Fade in over first 30 frames, fade out over last 60 frames
          if (f < 30) return (f / 30) * 0.35;
          if (f > total - 60) return ((total - f) / 60) * 0.35;
          return 0.35;
        }}
        loop
      />

      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroScene
          customerName={props.customerName}
          tagline={props.tagline}
          accentColor={props.accentColor}
        />
      </Sequence>
      <Sequence from={CHALLENGE_START} durationInFrames={CHALLENGE_DURATION}>
        <StoryScene
          sectionLabel="The Challenge"
          headline={props.challenge.headline}
          description={props.challenge.description}
          screenshot={props.challenge.screenshot}
          accentColor={props.accentColor}
          sceneDuration={CHALLENGE_DURATION}
        />
      </Sequence>
      {features.map((feature, i) => (
        <Sequence
          key={`${feature.screenshot}-${i}`}
          from={FEATURES_START + i * FEATURE_DURATION}
          durationInFrames={FEATURE_DURATION}
        >
          <FeatureTourScene
            screenshot={feature.screenshot}
            label={feature.label}
            index={i}
            total={features.length}
            accentColor={props.accentColor}
          />
        </Sequence>
      ))}
      <Sequence from={RESULT_START} durationInFrames={RESULT_DURATION}>
        <ResultScene result={props.result} accentColor={props.accentColor} />
      </Sequence>
      <Sequence
        from={OUTRO_START}
        durationInFrames={OUTRO_DURATION}
        style={{
          translate: "66px -24.5px",
        }}
      >
        <OutroScene
          customerName={props.customerName}
          websiteUrl={props.websiteUrl}
          accentColor={props.accentColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
