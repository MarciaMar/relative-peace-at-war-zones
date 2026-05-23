import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SessionTracker from "@/components/SessionTracker";
import { Play, Pause, RotateCcw, Hand } from "lucide-react";

/**
 * EFT Tapping (Emotional Freedom Techniques)
 * Evidence-based sequence: 9 acupressure points, tapped ~7 times each
 * while repeating a reminder phrase. A full round takes ~60-90 seconds.
 * Research (Church et al., 2012-2022) suggests 3-10 rounds reduce cortisol,
 * anxiety, PTSD symptoms via vagus-nerve / amygdala down-regulation.
 */

type Point = {
  id: string;
  label: string;
  short: string;
  // position on the SVG (viewBox 200x360)
  cx: number;
  cy: number;
  cue: string;
};

const POINTS: Point[] = [
  { id: "kc",  label: "Karate Chop (side of hand)", short: "Setup",    cx: 30,  cy: 250, cue: "Even though I feel this, I deeply and completely accept myself." },
  { id: "eb",  label: "Eyebrow (start of brow)",    short: "Eyebrow",  cx: 88,  cy: 70,  cue: "This feeling…" },
  { id: "se",  label: "Side of Eye",                short: "Side Eye", cx: 70,  cy: 80,  cue: "I notice it…" },
  { id: "ue",  label: "Under Eye",                  short: "Under Eye",cx: 88,  cy: 92,  cue: "It's here in my body…" },
  { id: "un",  label: "Under Nose",                 short: "Nose",     cx: 100, cy: 108, cue: "I'm safe right now…" },
  { id: "ch",  label: "Chin (crease below lip)",    short: "Chin",     cx: 100, cy: 128, cue: "I can let this soften…" },
  { id: "cb",  label: "Collarbone",                 short: "Collar",   cx: 85,  cy: 168, cue: "Releasing what I can…" },
  { id: "ua",  label: "Under Arm (4in below pit)",  short: "Underarm", cx: 55,  cy: 210, cue: "Letting my body calm…" },
  { id: "th",  label: "Top of Head (crown)",        short: "Crown",    cx: 100, cy: 38,  cue: "I choose peace, breath, and ease." },
];

const TAPS_PER_POINT = 7;
const SECONDS_PER_POINT = 6; // ~7 taps + phrase
const RECOMMENDED_ROUNDS = 3;

const TappingTechnique = () => {
  const [running, setRunning] = useState(false);
  const [pointIdx, setPointIdx] = useState(0);
  const [round, setRound] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_POINT);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        // advance point
        setPointIdx((i) => {
          if (i < POINTS.length - 1) return i + 1;
          // next round
          setRound((r) => r + 1);
          return 0;
        });
        return SECONDS_PER_POINT;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (round > RECOMMENDED_ROUNDS) setRunning(false);
  }, [round]);

  const reset = () => {
    setRunning(false);
    setPointIdx(0);
    setRound(1);
    setSecondsLeft(SECONDS_PER_POINT);
  };

  const current = POINTS[pointIdx];
  const done = round > RECOMMENDED_ROUNDS;

  return (

    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4 pb-12">
      <div className="w-full max-w-3xl rounded-lg shadow-lg p-6 md:p-8 bg-white dark:bg-secondary space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <Hand /> Tapping (EFT)
          </h1>
          <p className="text-muted-foreground">
            Gently tap 9 acupressure points to calm the nervous system, reduce stress and trauma activation.
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-4 text-sm leading-relaxed">
          <h2 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">How it works — the vagus nerve</h2>
          <p className="text-blue-900 dark:text-blue-100">
            The <strong>vagus nerve</strong> is the longest cranial nerve and the main highway of the
            parasympathetic ("rest &amp; digest") system. It connects the face, throat, heart and gut to the brainstem.
            Gentle tapping on the face, collarbone and torso sends rhythmic, safe sensory signals along
            vagal branches. This activates the <em>ventral vagal</em> state — slowing the heart, deepening
            breathing, and signalling the amygdala (the brain's threat alarm) that the body is safe.
          </p>
          <p className="mt-2 text-blue-900 dark:text-blue-100">
            Combining the tap with naming the feeling lets the prefrontal cortex re-engage with the emotional
            memory <em>while</em> the body is calm — similar to the mechanism behind EMDR. Clinical trials
            (Church 2013; Sebastian &amp; Nelms 2017) show measurable drops in cortisol, PTSD and anxiety scores
            after 3–10 rounds.
          </p>
        </div>

        {/* Body diagram + sequence */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="flex justify-center">
            <svg viewBox="0 0 200 360" className="w-full max-w-[260px] h-auto">
              {/* Head */}
              <ellipse cx="100" cy="80" rx="42" ry="52" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {/* Neck */}
              <rect x="88" y="128" width="24" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {/* Torso */}
              <path d="M55 150 Q100 145 145 150 L150 250 Q100 260 50 250 Z" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {/* Arms */}
              <path d="M55 150 Q30 200 35 260" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <path d="M145 150 Q170 200 165 260" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {/* Hand for karate-chop */}
              <ellipse cx="30" cy="258" rx="10" ry="14" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {/* Eyes */}
              <circle cx="85" cy="78" r="3" fill="hsl(var(--foreground))" />
              <circle cx="115" cy="78" r="3" fill="hsl(var(--foreground))" />
              {/* Mouth */}
              <path d="M88 110 Q100 116 112 110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

              {/* Points */}
              {POINTS.map((p, i) => {
                const active = i === pointIdx && running;
                return (
                  <g key={p.id}>
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r={active ? 9 : 5}
                      fill={i === pointIdx ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                      stroke="white"
                      strokeWidth="1.5"
                      className={active ? "animate-pulse" : ""}
                    />
                    <text x={p.cx + 10} y={p.cy + 3} fontSize="9" fill="hsl(var(--foreground))">
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Round {Math.min(round, RECOMMENDED_ROUNDS)} of {RECOMMENDED_ROUNDS} · Point {pointIdx + 1}/{POINTS.length}
              </div>
              <div className="text-xl font-semibold mt-1">{current.label}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Tap gently with 2 fingers, ~{TAPS_PER_POINT} times
              </div>
              <div className="mt-3 italic">"{current.cue}"</div>
              {running && (
                <div className="mt-3 text-4xl font-bold text-primary text-center">{secondsLeft}</div>
              )}
              {done && (
                <div className="mt-3 p-3 rounded bg-green-50 dark:bg-green-900/40 text-green-900 dark:text-green-100 text-sm">
                  Round complete. Take a slow breath. Re-rate your distress 0–10. If still &gt; 3, do another round.
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { if (done) reset(); setRunning((r) => !r); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
              >
                {running ? <><Pause size={18}/> Pause</> : <><Play size={18}/> {done ? "Start again" : "Start tapping"}</>}
              </button>
              <button onClick={reset} className="px-4 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600">
                <RotateCcw size={18} />
              </button>
            </div>

            <ol className="text-xs text-muted-foreground space-y-1 mt-2">
              {POINTS.map((p, i) => (
                <li key={p.id} className={i === pointIdx ? "text-primary font-medium" : ""}>
                  {i + 1}. {p.short}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Protocol */}
        <div className="bg-purple-50 dark:bg-purple-900/40 rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Recommended protocol</h3>
          <ol className="list-decimal pl-5 space-y-1 text-purple-900 dark:text-purple-100">
            <li>Rate your distress from 0 (calm) to 10 (overwhelming).</li>
            <li>Name what you feel: "Even though I feel <em>(this)</em>, I deeply and completely accept myself." Tap the side of the hand 3×.</li>
            <li>Tap each of the 8 points ~7 times while repeating a short reminder phrase ("this fear", "this tightness").</li>
            <li>Take a slow breath. Re-rate. Repeat for <strong>3 rounds</strong> (or up to 10 for strong trauma activation).</li>
            <li>For trauma memories use the "Tell the Story" technique with a trained practitioner — pause and tap whenever distress rises above 4.</li>
          </ol>
        </div>

        <div className="text-xs text-muted-foreground">
          <strong>Safety:</strong> Tapping is a self-help tool. For severe trauma or PTSD, please work with a
          qualified clinician (search "EFT International" or "ACEP certified practitioner").
        </div>

        <div className="text-center">
          <SessionTracker techniqueName="Tapping (EFT)" />

          <Link to="/techniques" className="text-primary underline">← Back to Techniques</Link>
        </div>
      </div>
    </div>
  );
};

export default TappingTechnique;
