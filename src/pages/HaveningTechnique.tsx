import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw, Hand } from "lucide-react";

/**
 * Self-Soothing Havening Touch
 * Based on Ronald Ruden's Havening Techniques® and polyvagal-informed self-soothing.
 * Research: Thandi et al. 2015 (single-session reductions in depression/anxiety),
 * Sebastian & Nelms 2017 meta-analysis of psychosensory therapies.
 */

type Step = {
  id: string;
  title: string;
  instruction: string;
  duration: number;
};

const STEPS: Step[] = [
  { id: "settle",    title: "1. Settle & rate",      instruction: "Sit comfortably. Notice your distress from 0 (calm) to 10 (overwhelmed). Take one slow breath out, longer than in.", duration: 20 },
  { id: "palms",     title: "2. Palm Havening",      instruction: "Rub your palms slowly together as if washing your hands gently. Imagine warmth and safety building between them.", duration: 30 },
  { id: "arms",      title: "3. Arm Havening",       instruction: "Cross your arms. Slowly stroke from the top of each shoulder down to the elbows. Soft, steady, downward.", duration: 45 },
  { id: "face",      title: "4. Face Havening",      instruction: "With both hands, gently stroke from forehead down the sides of your face to the chin. Eyes soft or closed.", duration: 45 },
  { id: "distract",  title: "5. Gentle distraction", instruction: "While still stroking, hum a familiar tune, count slowly down from 20, or picture walking on a calm beach (one step per count).", duration: 40 },
  { id: "integrate", title: "6. Re-rate & breathe",  instruction: "Stop. Drop your hands. Notice your body. Re-rate the distress 0–10. If above 3, repeat steps 3–5.", duration: 20 },
];

const TOTAL = STEPS.reduce((a, s) => a + s.duration, 0);

const HaveningTechnique = () => {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intRef.current = setInterval(() => {
      setElapsed((e) => (e + 1 > TOTAL ? TOTAL : e + 1));
    }, 1000);
    return () => { if (intRef.current) clearInterval(intRef.current); };
  }, [running]);

  useEffect(() => { if (elapsed >= TOTAL) setRunning(false); }, [elapsed]);

  let acc = 0;
  let stepIdx = 0;
  for (let i = 0; i < STEPS.length; i++) {
    if (elapsed < acc + STEPS[i].duration) { stepIdx = i; break; }
    acc += STEPS[i].duration;
    stepIdx = i;
  }
  const step = STEPS[stepIdx];
  const stepElapsed = elapsed - acc;
  const stepLeft = Math.max(0, step.duration - stepElapsed);

  const progress = Math.min(1, elapsed / TOTAL);
  const mouthCY = 118 + progress * 14;
  const mouthW = 16 + progress * 10;
  const showEyeArcs = progress > 0.6;
  const arcDip = showEyeArcs ? 76 - (progress - 0.6) * 6 : 0;

  const reset = () => { setRunning(false); setElapsed(0); };
  const done = elapsed >= TOTAL;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4 pb-12">
      <div className="w-full max-w-3xl rounded-lg shadow-lg p-6 md:p-8 bg-white dark:bg-secondary space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <Hand /> Self-Soothing · Havening Touch
          </h1>
          <p className="text-muted-foreground">
            Gentle, slow self-touch on palms, arms and face to calm the nervous system.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-4 text-sm leading-relaxed">
          <h2 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Why it works</h2>
          <p className="text-blue-900 dark:text-blue-100">
            Slow, gentle stroking of the palms, upper arms and face stimulates pressure receptors that
            send signals along the <strong>vagus nerve</strong>, switching the body out of "fight/flight"
            into the <em>ventral vagal</em> rest-and-restore state. EEG studies (Ruden, 2019) show this
            triggers <strong>delta-wave</strong> activity — the same waves seen in deep sleep — which
            reduces the emotional charge of distressing memories without re-traumatising the person.
          </p>
          <p className="mt-2 text-blue-900 dark:text-blue-100">
            A randomised study (Thandi, Tom &amp; Ruden, <em>J. Psychiatric &amp; Mental Health Nursing</em>,
            2015) found a single 30-minute Havening session significantly lowered depression, anxiety
            and impairment scores in healthcare workers, with effects sustained at 2-month follow-up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-full max-w-[240px] h-auto">
              <circle cx="100" cy="100" r={80 + progress * 8} fill="hsl(var(--primary) / 0.08)" />
              <circle cx="100" cy="100" r={70 + progress * 4} fill="hsl(var(--primary) / 0.12)" />
              <circle cx="100" cy="100" r="60" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle cx="74" cy="118" r="8" fill={`hsl(0 70% 70% / ${progress * 0.5})`} />
              <circle cx="126" cy="118" r="8" fill={`hsl(0 70% 70% / ${progress * 0.5})`} />
              {showEyeArcs ? (
                <>
                  <path d={`M 82 76 Q 88 ${arcDip} 94 76`} fill="none" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                  <path d={`M 106 76 Q 112 ${arcDip} 118 76`} fill="none" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <circle cx="88" cy="88" r="4" fill="hsl(var(--foreground))" />
                  <circle cx="112" cy="88" r="4" fill="hsl(var(--foreground))" />
                </>
              )}
              <path
                d={`M ${100 - mouthW} 118 Q 100 ${mouthCY} ${100 + mouthW} 118`}
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ transition: "all 1s ease-out" }}
              />
            </svg>
            <div className="mt-2 text-xs text-muted-foreground">
              Calm building: {Math.round(progress * 100)}%
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Step {stepIdx + 1} of {STEPS.length}
              </div>
              <div className="text-lg font-semibold mt-1">{step.title}</div>
              <p className="text-sm mt-2">{step.instruction}</p>
              {running && (
                <div className="mt-3 text-4xl font-bold text-primary text-center">{stepLeft}s</div>
              )}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(elapsed / TOTAL) * 100}%` }}
                />
              </div>
              {done && (
                <div className="mt-3 p-3 rounded bg-green-50 dark:bg-green-900/40 text-green-900 dark:text-green-100 text-sm">
                  Session complete. Re-rate your distress. If still above 3, repeat — most people feel relief in 2–3 rounds.
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { if (done) reset(); setRunning((r) => !r); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
              >
                {running ? <><Pause size={18}/> Pause</> : <><Play size={18}/> {done ? "Start again" : elapsed > 0 ? "Resume" : "Begin"}</>}
              </button>
              <button onClick={reset} className="px-4 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/40 rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Evidence-based recommendations</h3>
          <ul className="list-disc pl-5 space-y-1 text-purple-900 dark:text-purple-100">
            <li><strong>Pace:</strong> stroke slowly — roughly one stroke per second.</li>
            <li><strong>Pressure:</strong> light to moderate, never painful. This is comfort, not massage.</li>
            <li><strong>Duration:</strong> a single round takes ~3–4 minutes; effective courses are 2–3 rounds daily for 2 weeks.</li>
            <li><strong>Distraction matters:</strong> humming, counting or imagining a peaceful walk occupies working memory and helps disrupt the distress signal.</li>
            <li><strong>Best for:</strong> acute stress, panic, sleep onset, re-settling after a flashback or nightmare.</li>
            <li><strong>Caution:</strong> for severe PTSD or dissociation, use with a qualified clinician (search "Certified Havening Techniques® Practitioner").</li>
          </ul>
        </div>

        <div className="text-center">
          <Link to="/techniques" className="text-primary underline">← Back to Techniques</Link>
        </div>
      </div>
    </div>
  );
};

export default HaveningTechnique;
