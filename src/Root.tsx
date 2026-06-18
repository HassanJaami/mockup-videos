import "./index.css";
import { Composition } from "remotion";
import { CustomerStory, customerStorySchema, computeTotalDuration } from "./CustomerStory";
import { CUSTOMERS } from "./customers";
import type { CustomerStoryData } from "./CustomerStory/schema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {CUSTOMERS.map(({ id, data }) => (
        <Composition
          key={id}
          id={id}
          component={CustomerStory}
          calculateMetadata={({ props }: { props: CustomerStoryData }) => ({
            durationInFrames: computeTotalDuration((props.features ?? []).length),
          })}
          durationInFrames={computeTotalDuration(5)}
          fps={30}
          width={1920}
          height={1080}
          schema={customerStorySchema}
          defaultProps={data}
        />
      ))}
    </>
  );
};
