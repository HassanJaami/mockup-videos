import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "./constants";
import {
  CHALLENGE_DURATION,
  INTRO_DURATION,
  OUTRO_DURATION,
  RESULT_DURATION,
  SOLUTION_DURATION,
  TOTAL_DURATION,
} from "./constants";
import { IntroScene } from "./IntroScene";
import { OutroScene } from "./OutroScene";
import { ResultScene } from "./ResultScene";
import { customerStorySchema } from "./schema";
import { StoryScene } from "./StoryScene";

export { customerStorySchema, TOTAL_DURATION };

const CHALLENGE_START = INTRO_DURATION;
const SOLUTION_START = CHALLENGE_START + CHALLENGE_DURATION;
const RESULT_START = SOLUTION_START + SOLUTION_DURATION;
const OUTRO_START = RESULT_START + RESULT_DURATION;

export const CustomerStory: React.FC<
  import("./schema").CustomerStoryData
> = (props) => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
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

      <Sequence from={SOLUTION_START} durationInFrames={SOLUTION_DURATION}>
        <StoryScene
          sectionLabel="The Solution"
          headline={props.solution.headline}
          description={props.solution.description}
          screenshot={props.solution.screenshot}
          accentColor={props.accentColor}
          sceneDuration={SOLUTION_DURATION}
        />
      </Sequence>

      <Sequence from={RESULT_START} durationInFrames={RESULT_DURATION}>
        <ResultScene result={props.result} accentColor={props.accentColor} />
      </Sequence>

      <Sequence from={OUTRO_START} durationInFrames={OUTRO_DURATION}>
        <OutroScene
          customerName={props.customerName}
          accentColor={props.accentColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
