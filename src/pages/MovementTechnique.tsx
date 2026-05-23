import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Exercise = {
  id: string;
  title: string;
  duration: number; // seconds
  instruction: string;
  why: string;
  illustration: (progress: number) => JSX.Element;
};

// Simple SVG figure helpers - all use semantic stroke colors via currentColor
const Figure = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 200 240" className="w-full h-64 text-primary" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const EXERCISES: Exercise[] = [
  {
    id: "shake",
    title: "Therapeutic Shaking (TRE)",
    duration: 60,
    instruction: "Stand with knees soft. Let your whole body shake gently — arms loose, jaw relaxed. Allow tremors to move through legs and torso. Don't force it.",
    why: "Neurogenic tremors discharge stored survival energy from the muscles (Berceli, 2008). Used with refugees and combat veterans to reduce PTSD symptoms.",
    illustration: (p) => {
      const sway = Math.sin(p * Math.PI * 8) * 4;
      return (
        <Figure>
          <circle cx={100 + sway} cy="40" r="18" />
          <line x1={100 + sway} y1="58" x2="100" y2="140" />
          <line x1="100" y1="80" x2={70 + sway} y2="120" />
          <line x1="100" y1="80" x2={130 - sway} y2="120" />
          <line x1="100" y1="140" x2={80 + sway} y2="210" />
          <line x1="100" y1="140" x2={120 - sway} y2="210" />
        </Figure>
      );
    },
  },
  {
    id: "voo",
    title: "Voo Sound + Belly Breath",
    duration: 90,
    instruction: "Inhale deeply through nose. On the long exhale, make a low 'Vooooo' sound (like a foghorn) from your belly. Feel the vibration. Repeat slowly.",
    why: "Vagus nerve stimulation through vocal cord vibration (Levine, Somatic Experiencing). Slows heart rate and signals safety to the brainstem.",
    illustration: (p) => {
      const breath = 1 + Math.sin(p * Math.PI * 2) * 0.15;
      return (
        <Figure>
          <circle cx="100" cy="40" r="18" />
          <line x1="100" y1="58" x2="100" y2="140" />
          <ellipse cx="100" cy="110" rx={20 * breath} ry={18 * breath} strokeDasharray="3 3" />
          <line x1="100" y1="80" x2="70" y2="115" />
          <line x1="100" y1="80" x2="130" y2="115" />
          <line x1="100" y1="140" x2="85" y2="210" />
          <line x1="100" y1="140" x2="115" y2="210" />
        </Figure>
      );
    },
  },
  {
    id: "wall-push",
    title: "Wall Push (Orienting Strength)",
    duration: 45,
    instruction: "Face a wall, palms flat at shoulder height. Push firmly for 5 seconds as if moving the wall. Release. Notice your arms, back, legs. Repeat 5 times.",
    why: "Activates the fight response in a contained way, completing thwarted self-protective impulses stored in the nervous system (Peter Levine).",
    illustration: (p) => {
      const push = Math.sin(p * Math.PI * 4) > 0 ? 6 : 0;
      return (
        <Figure>
          <line x1="170" y1="20" x2="170" y2="220" strokeWidth="5" />
          <circle cx={90 - push} cy="60" r="18" />
          <line x1={90 - push} y1="78" x2={90 - push} y2="150" />
          <line x1={90 - push} y1="95" x2={160 - push} y2="80" />
          <line x1={90 - push} y1="95" x2={160 - push} y2="100" />
          <line x1={90 - push} y1="150" x2={75 - push} y2="215" />
          <line x1={90 - push} y1="150" x2={105 - push} y2="215" />
        </Figure>
      );
    },
  },
  {
    id: "butterfly",
    title: "Butterfly Hug (Bilateral)",
    duration: 60,
    instruction: "Cross arms over chest, hands on opposite shoulders. Tap alternately — left, right, left, right — slowly, like a heartbeat. Breathe naturally.",
    why: "Bilateral stimulation (EMDR protocol, Artigas & Jarero) lowers amygdala activity and helps process traumatic memory in refugees and disaster survivors.",
    illustration: (p) => {
      const tap = Math.sin(p * Math.PI * 6);
      return (
        <Figure>
          <circle cx="100" cy="40" r="18" />
          <line x1="100" y1="58" x2="100" y2="150" />
          <line x1="100" y1="85" x2={75} y2={tap > 0 ? 95 : 105} />
          <line x1="100" y1="85" x2={125} y2={tap < 0 ? 95 : 105} />
          <circle cx="75" cy={tap > 0 ? 95 : 105} r="5" fill="currentColor" opacity={tap > 0 ? 1 : 0.3} />
          <circle cx="125" cy={tap < 0 ? 95 : 105} r="5" fill="currentColor" opacity={tap < 0 ? 1 : 0.3} />
          <line x1="100" y1="150" x2="85" y2="215" />
          <line x1="100" y1="150" x2="115" y2="215" />
        </Figure>
      );
    },
  },
  {
    id: "forward-fold",
    title: "Forward Fold + Release",
    duration: 60,
    instruction: "Stand, soft knees. Slowly fold forward, letting head and arms hang heavy. Sway gently. Roll up one vertebra at a time. Repeat 3 times.",
    why: "Inverts the body, calms sympathetic arousal, and releases the long fascia line that holds chronic 'freeze' tension (van der Kolk, The Body Keeps the Score).",
    illustration: (p) => {
      const fold = Math.min(1, p * 2);
      const headY = 40 + fold * 130;
      const headX = 100;
      return (
        <Figure>
          <circle cx={headX} cy={headY} r="16" />
          <path d={`M 100 140 Q 100 ${140 - fold * 30} ${headX} ${headY + 16}`} />
          <line x1={headX} y1={headY + 20} x2={headX - 20} y2={headY + 60} />
          <line x1={headX} y1={headY + 20} x2={headX + 20} y2={headY + 60} />
          <line x1="100" y1="140" x2="85" y2="215" />
          <line x1="100" y1="140" x2="115" y2="215" />
        </Figure>
      );
    },
  },
  {
    id: "self-hug",
    title: "Self-Hug + Sway",
    duration: 45,
    instruction: "Wrap arms around yourself. Squeeze gently. Sway side to side like rocking a child. Hum softly if it feels right.",
    why: "Deep pressure + rhythmic rocking releases oxytocin and activates the ventral vagal 'safe & social' system (Porges, Polyvagal Theory).",
    illustration: (p) => {
      const sway = Math.sin(p * Math.PI * 3) * 8;
      return (
        <Figure>
          <circle cx={100 + sway} cy="40" r="18" />
          <line x1={100 + sway} y1="58" x2={100 + sway / 2} y2="150" />
          <path d={`M ${100 + sway} 90 Q ${70 + sway} 110 ${100 + sway / 2} 130`} />
          <path d={`M ${100 + sway} 90 Q ${130 + sway} 110 ${100 + sway / 2} 130`} />
          <line x1={100 + sway / 2} y1="150" x2="85" y2="215" />
          <line x1={100 + sway / 2} y1="150" x2="115" y2="215" />
        </Figure>
      );
    },
  },
];

const MovementTechnique = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (activeIdx === null) return;
    const start = Date.now();
    const id = setInterval(() => {
      const s = (Date.now() - start) / 1000;
      const ex = EXERCISES[activeIdx];
      if (s >= ex.duration) {
        setElapsed(ex.duration);
        setActiveIdx(null);
        clearInterval(id);
      } else {
        setElapsed(s);
      }
    }, 50);
    return () => clearInterval(id);
  }, [activeIdx]);

  return (
    <div className="min-h-screen bg-background pt-8 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Movement & Somatic Release</h1>
        <p className="text-muted-foreground mb-6">
          Trauma and stress live in the body. These six research-based exercises gently discharge
          stored survival energy, regulate the vagus nerve, and bring you back into the present.
          Move slowly — sensation matters more than performance.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6 text-sm">
          <strong>How to practice:</strong> Choose one exercise. Tap Start. Follow the moving figure
          and the timer. Pause anytime. Notice sensations after each round — that noticing is the
          healing.
        </div>

        <div className="space-y-6">
          {EXERCISES.map((ex, i) => {
            const isActive = activeIdx === i;
            const progress = isActive ? elapsed / ex.duration : 0;
            return (
              <div key={ex.id} className="bg-white dark:bg-secondary border rounded-lg p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-xl font-semibold">{i + 1}. {ex.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">Recommended: {ex.duration}s</p>
                  </div>
                  <button
                    onClick={() => {
                      if (isActive) { setActiveIdx(null); setElapsed(0); }
                      else { setElapsed(0); setActiveIdx(i); }
                    }}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:opacity-90"
                  >
                    {isActive ? "Stop" : "Start"}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 items-center">
                  <div className="bg-muted/40 rounded p-3">
                    {ex.illustration(progress)}
                    {isActive && (
                      <div className="mt-2">
                        <div className="h-2 bg-muted rounded overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                        <div className="text-center text-sm text-muted-foreground mt-1">
                          {Math.ceil(ex.duration - elapsed)}s
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold mb-1">How to do it</div>
                      <p>{ex.instruction}</p>
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-primary">Why it works</div>
                      <p className="text-muted-foreground">{ex.why}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-sm">
          <strong>Safety:</strong> If any movement triggers strong distress, stop, open your eyes,
          name 3 things you see, and feel your feet on the floor. These tools support — they do not
          replace — care from a trauma-informed clinician where available.
        </div>

        <div className="mt-8 text-center">
          <Link to="/techniques" className="text-primary underline">← Back to Techniques</Link>
        </div>
      </div>
    </div>
  );
};

export default MovementTechnique;
