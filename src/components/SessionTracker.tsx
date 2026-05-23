import React, { useEffect, useRef, useState } from "react";
import { Download, Printer, Play, Square, Plus, RotateCcw } from "lucide-react";

interface SessionTrackerProps {
  techniqueName: string;
}

type Phase = "before" | "running" | "after" | "done";

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const Scale: React.FC<{
  value: number;
  onChange: (v: number) => void;
  label: string;
}> = ({ value, onChange, label }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-medium">
      <span>{label}</span>
      <span className="text-primary font-bold">{value} / 10</span>
    </div>
    <input
      type="range"
      min={0}
      max={10}
      step={1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-primary"
      aria-label={label}
    />
    <div className="flex justify-between text-xs text-muted-foreground">
      <span>0 — calm</span>
      <span>10 — extreme distress</span>
    </div>
  </div>
);

const SessionTracker: React.FC<SessionTrackerProps> = ({ techniqueName }) => {
  const [phase, setPhase] = useState<Phase>("before");
  const [before, setBefore] = useState(5);
  const [after, setAfter] = useState(5);
  const [steps, setSteps] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === "running") {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  const start = () => {
    setStartedAt(new Date());
    setElapsed(0);
    setSteps(0);
    setPhase("running");
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("after");
  };

  const finish = () => setPhase("done");

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("before");
    setBefore(5);
    setAfter(5);
    setSteps(0);
    setElapsed(0);
    setStartedAt(null);
  };

  const change = after - before;
  const changeLabel =
    change < 0 ? `↓ ${Math.abs(change)} (lower distress)` :
    change > 0 ? `↑ ${change} (higher distress)` :
    "no change";

  const summaryText = () => {
    const date = startedAt ?? new Date();
    return [
      `Relative Peace — Session Summary`,
      `Technique: ${techniqueName}`,
      `Date: ${date.toLocaleString()}`,
      `Duration: ${formatTime(elapsed)}`,
      `Steps / rounds completed: ${steps}`,
      ``,
      `Distress before: ${before} / 10`,
      `Distress after:  ${after} / 10`,
      `Change: ${changeLabel}`,
      ``,
      `Notes:`,
      `This summary is for your private self-monitoring. If distress`,
      `remains high or worsens, please seek a trusted person or`,
      `qualified support when possible.`,
    ].join("\n");
  };

  const download = () => {
    const blob = new Blob([summaryText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${techniqueName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const print = () => {
    const w = window.open("", "_blank", "width=600,height=700");
    if (!w) return;
    w.document.write(
      `<pre style="font-family: system-ui, sans-serif; white-space: pre-wrap; padding: 24px; line-height: 1.5;">${summaryText()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")}</pre>`
    );
    w.document.close();
    w.focus();
    w.print();
  };

  return (
    <div className="rounded-lg border border-border bg-accent/30 p-5 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-semibold text-foreground">
          Self-monitoring &amp; session summary
        </h3>
        {phase === "running" && (
          <span className="text-sm font-mono text-primary">
            ⏱ {formatTime(elapsed)} · {steps} steps
          </span>
        )}
      </div>

      {phase === "before" && (
        <>
          <p className="text-sm text-muted-foreground">
            Before you begin, gently notice your current stress level. There are
            no wrong answers — this builds self-awareness.
          </p>
          <Scale value={before} onChange={setBefore} label="My stress level right now" />
          <button
            onClick={start}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
          >
            <Play size={18} /> Start session
          </button>
        </>
      )}

      {phase === "running" && (
        <>
          <p className="text-sm text-muted-foreground">
            Practice the exercise above. Tap <em>+ Step</em> each time you
            complete a round, breath cycle, or step.
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSteps((s) => s + 1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/80"
            >
              <Plus size={18} /> Step ({steps})
            </button>
            <button
              onClick={stop}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
            >
              <Square size={18} /> End session
            </button>
          </div>
        </>
      )}

      {phase === "after" && (
        <>
          <p className="text-sm text-muted-foreground">
            Session length: <strong>{formatTime(elapsed)}</strong> · Steps:{" "}
            <strong>{steps}</strong>. Now gently re-check your stress level.
          </p>
          <Scale value={after} onChange={setAfter} label="My stress level now" />
          <button
            onClick={finish}
            className="w-full px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
          >
            Save summary
          </button>
        </>
      )}

      {phase === "done" && (
        <>
          <div className="rounded-md bg-background p-4 text-sm space-y-1">
            <div><strong>Technique:</strong> {techniqueName}</div>
            <div><strong>Duration:</strong> {formatTime(elapsed)}</div>
            <div><strong>Steps completed:</strong> {steps}</div>
            <div><strong>Before:</strong> {before} / 10</div>
            <div><strong>After:</strong> {after} / 10</div>
            <div><strong>Change:</strong> {changeLabel}</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={download}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
            >
              <Download size={18} /> Download
            </button>
            <button
              onClick={print}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/80"
            >
              <Printer size={18} /> Print
            </button>
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border font-semibold hover:bg-accent/50"
              aria-label="New session"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SessionTracker;
