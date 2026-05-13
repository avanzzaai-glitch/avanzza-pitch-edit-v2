import React from "react";
import {
  AbsoluteFill,
  Video,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  staticFile,
} from "remotion";
import { CAPTIONS } from "./captions";

const AVANZZA_BLUE = "#0A0F2C";
const AVANZZA_ACCENT = "#4F8EF7";
const AVANZZA_WHITE = "#FFFFFF";
const AVANZZA_GOLD = "#F5C842";

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [30, 55], [20, 0], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [90, 110], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${AVANZZA_BLUE} 0%, #0d1a4a 60%, #0a2060 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(79,142,247,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.08) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,142,247,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 72,
            fontWeight: 900,
            color: AVANZZA_WHITE,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          AVANZZA
        </div>
        <div
          style={{
            width: "100%",
            height: 3,
            background: `linear-gradient(90deg, transparent, ${AVANZZA_ACCENT}, ${AVANZZA_GOLD}, ${AVANZZA_ACCENT}, transparent)`,
            margin: "8px 0",
          }}
        />
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 18,
            color: AVANZZA_ACCENT,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 300,
          }}
        >
          AI AGENCY
        </div>
      </div>

      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 40,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 300,
            letterSpacing: 1,
          }}
        >
          Contenido con IA para tu negocio
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CaptionOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  const activeCaption = CAPTIONS.find((c) => frame >= c.start && frame < c.end);

  if (!activeCaption) return null;

  const progress = frame - activeCaption.start;
  const opacity = interpolate(progress, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [activeCaption.end - 8, activeCaption.end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalOpacity = opacity * fadeOut;
  const scale = interpolate(progress, [0, 8], [0.92, 1], { extrapolateRight: "clamp" });

  const isImpact = activeCaption.type === "impact";
  const isQuestion = activeCaption.type === "question";

  const renderText = () => {
    const { text, highlight } = activeCaption;
    if (!highlight) return text;
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span style={{ color: AVANZZA_GOLD, fontWeight: 900 }}>{highlight}</span>
        {parts[1] || ""}
      </>
    );
  };

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 220,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 20,
          right: 20,
          opacity: finalOpacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        {isQuestion && (
          <div
            style={{
              display: "inline-block",
              background: AVANZZA_ACCENT,
              color: AVANZZA_WHITE,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 3,
              padding: "3px 12px",
              borderRadius: 4,
              marginBottom: 8,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            PREGÚNTATE
          </div>
        )}
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: isImpact ? 34 : 28,
            fontWeight: isImpact ? 900 : 700,
            color: AVANZZA_WHITE,
            lineHeight: 1.25,
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            letterSpacing: isImpact ? 0.5 : 0,
          }}
        >
          {renderText()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const LowerThird: React.FC<{ showAt: number }> = ({ showAt }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - showAt;

  if (relFrame < 0 || relFrame > 200) return null;

  const slideX = interpolate(relFrame, [0, 25], [-300, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(relFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(relFrame, [175, 200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 20,
          opacity: opacity * exitOpacity,
          transform: `translateX(${slideX}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 4,
            height: 50,
            background: `linear-gradient(to bottom, ${AVANZZA_ACCENT}, ${AVANZZA_GOLD})`,
            borderRadius: 2,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 20,
              fontWeight: 900,
              color: AVANZZA_WHITE,
              letterSpacing: 1,
            }}
          >
            AVANZZA AI
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 13,
              color: AVANZZA_ACCENT,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Contenido · Automatización · IA
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        top: 24,
        right: 20,
        fontFamily: "sans-serif",
        fontSize: 14,
        fontWeight: 800,
        color: "rgba(255,255,255,0.55)",
        letterSpacing: 3,
        textTransform: "uppercase",
      }}
    >
      AVANZZA
    </div>
  </AbsoluteFill>
);

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const logoScale = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const logoOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const ctaOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" });
  const ctaY = interpolate(frame, [55, 80], [20, 0], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [45, 80], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${AVANZZA_BLUE} 0%, #0d1a4a 60%, #0a2060 100%)`,
        opacity: bgOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(79,142,247,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.08) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,142,247,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: AVANZZA_WHITE,
            letterSpacing: 8,
          }}
        >
          AVANZZA
        </div>
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, transparent, ${AVANZZA_ACCENT}, ${AVANZZA_GOLD}, ${AVANZZA_ACCENT}, transparent)`,
            width: `${lineWidth}%`,
            margin: "8px auto",
          }}
        />
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 16,
            color: AVANZZA_ACCENT,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          AI AGENCY
        </div>
      </div>

      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          marginTop: 50,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: AVANZZA_ACCENT,
            borderRadius: 50,
            padding: "14px 40px",
            display: "inline-block",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: AVANZZA_WHITE,
              letterSpacing: 1,
            }}
          >
            Empieza hoy 🚀
          </span>
        </div>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: 1,
          }}
        >
          avanzza.ai
        </div>
      </div>
    </AbsoluteFill>
  );
};

const INTRO_DURATION = 120;
const VIDEO_DURATION = 2862;
const OUTRO_DURATION = 150;

export const PitchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <Intro />
      </Sequence>

      <Sequence from={INTRO_DURATION} durationInFrames={VIDEO_DURATION}>
        <AbsoluteFill>
          <Video src={staticFile("pitch.mp4")} style={{ width: "100%", height: "100%" }} />
          <Watermark />
          <CaptionOverlay />
          <LowerThird showAt={50} />
          <LowerThird showAt={1400} />
          <LowerThird showAt={2400} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={INTRO_DURATION + VIDEO_DURATION} durationInFrames={OUTRO_DURATION}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
