import React from 'react';
import {
  AbsoluteFill,
  Video,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  staticFile,
} from 'remotion';

const AVANZZA_BLUE = '#0A0F2C';
const AVANZZA_ACCENT = '#4F8EF7';
const AVANZZA_GOLD = '#F5C842';
const WHITE = '#FFFFFF';

const captions = [
  { start: 0, end: 80, text: '¿Qué pasaría si tu negocio tuviera', type: 'question' },
  { start: 80, end: 160, text: 'contenido todos los días sin que tú grabaras?', type: 'question' },
  { start: 160, end: 240, text: 'Te voy a mostrar cómo.', type: 'impact' },
  { start: 240, end: 350, text: 'Imagínate tener a alguien presentando', type: 'normal' },
  { start: 350, end: 480, text: 'tus productos en tu floristería', type: 'normal' },
  { start: 480, end: 600, text: 'sin contratar a nadie.', highlight: 'sin contratar', type: 'normal' },
  { start: 600, end: 720, text: 'Con IA puedes poner tu marca donde quieras.', highlight: 'Con IA', type: 'impact' },
  { start: 720, end: 850, text: 'Una suite de lujo, un café en París,', type: 'normal' },
  { start: 850, end: 950, text: 'donde tú decidas sin viajar.', highlight: 'sin viajar', type: 'impact' },
  { start: 950, end: 1100, text: 'Este café en París no existe.', type: 'impact' },
  { start: 1100, end: 1250, text: 'Lo creó la IA. Así de fácil.', highlight: 'Lo creó la IA', type: 'impact' },
  { start: 1250, end: 1380, text: '¿Y si tu producto apareciera en un lugar así?', type: 'question' },
  { start: 1380, end: 1520, text: 'Con IA generativa cualquier marca', highlight: 'cualquier marca', type: 'normal' },
  { start: 1520, end: 1650, text: 'tiene contenido de nivel mundial', type: 'impact' },
  { start: 1650, end: 1780, text: 'sin salir de tu ciudad.', highlight: 'sin salir de tu ciudad', type: 'impact' },
  { start: 1780, end: 1920, text: 'Tu restaurante puede tener contenido así', type: 'normal' },
  { start: 1920, end: 2050, text: 'en una cava medieval, con quesos', type: 'normal' },
  { start: 2050, end: 2180, text: 'artesanales y vino reserva.', type: 'normal' },
  { start: 2180, end: 2320, text: 'Sin salir de México.', highlight: 'Sin salir de México', type: 'impact' },
  { start: 2320, end: 2450, text: '8 escenarios. 1 avatar. Cero cámaras.', highlight: 'Cero cámaras', type: 'impact' },
  { start: 2450, end: 2580, text: 'Así funciona la IA para tu negocio.', type: 'normal' },
  { start: 2580, end: 2700, text: 'Tu marca ya está usando esto.', highlight: 'Tu marca', type: 'impact' },
  { start: 2700, end: 2862, text: 'Porque tu competencia ya lo está pensando.', highlight: 'tu competencia', type: 'question' },
];

const Intro = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 40], [0.85, 1], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(frame, [80, 110], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: AVANZZA_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: exitOpacity }}>
      <div style={{
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}>
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: WHITE,
          letterSpacing: 6,
          marginBottom: 12,
        }}>AVANZZA</div>
        <div style={{
          width: 120,
          height: 2,
          background: `linear-gradient(90deg, ${AVANZZA_ACCENT}, ${AVANZZA_GOLD})`,
          margin: '12px auto 16px',
        }} />
        <div style={{
          fontSize: 16,
          color: AVANZZA_ACCENT,
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}>AI Agency</div>
      </div>
    </AbsoluteFill>
  );
};

const CaptionOverlay = () => {
  const frame = useCurrentFrame();

  const activeCaption = captions.find(c => frame >= c.start && frame < c.end);

  if (!activeCaption) return null;

  const progress = frame - activeCaption.start;
  const opacity = interpolate(progress, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [activeCaption.end - 8, activeCaption.end], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalOpacity = opacity * fadeOut;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 240,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
      }} />

      <div style={{
        position: 'absolute',
        bottom: 80,
        left: 16,
        right: 16,
        opacity: finalOpacity,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: activeCaption.type === 'impact' ? 32 : 26,
          fontWeight: activeCaption.type === 'impact' ? 900 : 700,
          color: WHITE,
          lineHeight: 1.3,
          textShadow: '0 4px 16px rgba(0,0,0,0.8)',
        }}>
          {activeCaption.highlight ? (
            <>
              {activeCaption.text.split(activeCaption.highlight)[0]}
              <span style={{ color: AVANZZA_GOLD, fontWeight: 900 }}>{activeCaption.highlight}</span>
              {activeCaption.text.split(activeCaption.highlight)[1]}
            </>
          ) : activeCaption.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Watermark = () => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    <div style={{
      position: 'absolute',
      top: 20,
      right: 16,
      fontSize: 12,
      fontWeight: 800,
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: 2,
      textTransform: 'uppercase',
    }}>AVANZZA</div>
  </AbsoluteFill>
);

const LowerThird = ({ showAt }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - showAt;

  if (relFrame < 0 || relFrame > 200) return null;

  const opacity = interpolate(relFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(relFrame, [175, 200], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute',
        bottom: 160,
        left: 20,
        opacity: opacity * exitOpacity,
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 900,
          color: WHITE,
          letterSpacing: 1,
          marginBottom: 2,
        }}>AVANZZA AI</div>
        <div style={{
          fontSize: 11,
          color: AVANZZA_ACCENT,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>Contenido • IA • Automatización</div>
      </div>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 40], [0.9, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: AVANZZA_BLUE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity }}>
      <div style={{ textAlign: 'center', transform: `scale(${scale})`, marginBottom: 40 }}>
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: WHITE,
          letterSpacing: 5,
          marginBottom: 10,
        }}>AVANZZA</div>
        <div style={{
          fontSize: 14,
          color: AVANZZA_ACCENT,
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}>AI Agency</div>
      </div>

      <div style={{
        background: AVANZZA_ACCENT,
        borderRadius: 50,
        padding: '12px 32px',
        marginBottom: 20,
      }}>
        <div style={{
          fontSize: 16,
          fontWeight: 900,
          color: WHITE,
          letterSpacing: 1,
        }}>Empieza hoy 🚀</div>
      </div>

      <div style={{
        fontSize: 14,
        color: 'rgba(255,255,255,0.65)',
        letterSpacing: 1,
      }}>avanzza.ai</div>
    </AbsoluteFill>
  );
};

export const PitchVideo = () => {
  const INTRO = 120;
  const MAIN = 2862;
  const OUTRO = 150;

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Sequence from={0} durationInFrames={INTRO}>
        <Intro />
      </Sequence>

      <Sequence from={INTRO} durationInFrames={MAIN}>
        <AbsoluteFill>
          <Video src={staticFile('pitch.mp4')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Watermark />
          <CaptionOverlay />
          <LowerThird showAt={50} />
          <LowerThird showAt={1400} />
          <LowerThird showAt={2400} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={INTRO + MAIN} durationInFrames={OUTRO}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
