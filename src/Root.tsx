import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { CustomerStory, customerStorySchema, TOTAL_DURATION } from "./CustomerStory";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CustomerStory"
        component={CustomerStory}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
        schema={customerStorySchema}
        defaultProps={{
          customerName: "Acme Corp",
          tagline: "How Acme doubled their conversion rate in 60 days",
          accentColor: "#6366F1" as const,
          challenge: {
            headline: "Low conversion rates were killing growth",
            description:
              "Acme's landing pages were converting at just 1.2%, far below industry average. Every ad dollar spent was generating minimal returns.",
            screenshot: "customers/acme/challenge.png",
          },
          solution: {
            headline: "Streamlined onboarding with a smarter funnel",
            description:
              "Using our platform, Acme identified friction points and rebuilt their entire conversion funnel in days — not months.",
            screenshot: "customers/acme/solution.png",
          },
          result: {
            headline: "2× conversions in just 60 days",
            stats: [
              { value: "2.4×", label: "Conversion Rate" },
              { value: "60%", label: "Lower CAC" },
              { value: "$180k", label: "Revenue Added" },
            ],
            quote:
              "This tool completely transformed how we think about our funnel. We saw results in the first week.",
            authorName: "Sarah Chen",
            authorTitle: "Head of Growth, Acme Corp",
            screenshot: "customers/acme/result.png",
          },
        }}
      />

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
