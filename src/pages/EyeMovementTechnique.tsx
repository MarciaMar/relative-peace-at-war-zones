import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw, Eye } from "lucide-react";

const EyeMovementTechnique = () => {
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [seconds, setSeconds] = useState(0);
  const [sets, setSets] = useState(0);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const speedMs = { slow: 1600, medium: 1100, fast: 700 }[speed];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((s) => {
          const next = s + 1;
          if (next % 30 === 0) setSets((x) => x + 1);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const reset = () => {
    setIsActive(false);
    setSeconds(0);
    setSets(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4 pb-12">
      <div className="w-full max-w-2xl rounded-lg shadow-lg p-8 bg-white dark:bg-secondary space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <Eye className="text-purple-500" />
            Eye Movement (Bilateral Stimulation)
          </h1>
          <p className="text-muted-foreground">
            A gentle self-help version of bilateral stimulation used in EMDR-style therapy.
            Moving your eyes side-to-side while holding a calm thought helps the brain
            settle distressing feelings.
          </p>
        </div>

        {/* Simple eye illustration in pure CSS */}
        <div className="flex justify-center gap-8 py-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="relative w-20 h-12 bg-white border-2 border-foreground rounded-full overflow-hidden shadow-inner"
              aria-hidden
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-foreground"
                style={{
                  left: '50%',
                  marginLeft: '-12px',
                  animation: isActive ? `eyeTrack ${speedMs}ms ease-in-out infinite alternate` : 'none',
                }}
              >
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Moving dot to follow */}
        <div className="relative h-24 bg-accent/40 rounded-lg overflow-hidden border">
          <div
            ref={dotRef}
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary shadow-lg"
            style={{
              left: 0,
              animation: isActive ? `dotTrack ${speedMs * 2}ms ease-in-out infinite` : 'none',
            }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Keep your head still. Follow the dot with your eyes only.
        </p>

        <style>{`
          @keyframes eyeTrack {
            from { transform: translateX(-18px); }
            to   { transform: translateX(18px); }
          }
          @keyframes dotTrack {
            0%   { left: 0%; }
            50%  { left: calc(100% - 2.5rem); }
            100% { left: 0%; }
          }
        `}</style>

        <div className="flex gap-2 justify-center flex-wrap">
          {(['slow','medium','fast'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                speed === s ? 'bg-primary text-white' : 'bg-accent text-accent-foreground hover:bg-accent/80'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="text-center space-y-1">
          <p className="text-2xl font-semibold">{seconds}s</p>
          <p className="text-sm text-muted-foreground">Completed sets (30s each): {sets}</p>
          <div className="flex gap-4 justify-center pt-2">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 font-semibold"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/40 rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">How to do it (easy steps):</h3>
          <ol className="text-sm text-purple-900 dark:text-purple-100 space-y-2 list-decimal pl-5">
            <li>Sit comfortably. Take one slow breath in and out.</li>
            <li>Bring to mind something mildly stressful (not your worst memory).</li>
            <li>Press Start. Keep your head still and follow the moving dot with your eyes, left to right, for about 30 seconds.</li>
            <li>Stop, breathe, and notice what you feel. Is it a little softer?</li>
            <li>Repeat 2–4 sets. End by thinking of a safe, calm place.</li>
          </ol>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/40 rounded-lg p-4 text-sm">
          <strong>Safety:</strong> This is a calming self-help exercise, not therapy. If
          difficult memories or strong emotions come up, stop and use Grounding (5-4-3-2-1)
          or Breathing. For trauma, please seek a trained EMDR therapist when possible.
        </div>

        <div className="text-center">
          <Link to="/techniques" className="text-primary underline hover-scale">
            ← Back to Techniques
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EyeMovementTechnique;
