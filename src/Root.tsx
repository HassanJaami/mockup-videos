import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
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

      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
