import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Headphones } from "lucide-react";

type Freq = {
  name: string;
  carrier: number; // Hz
  beat: number; // Hz difference between ears
  band: string;
  duration: number; // minutes recommended
  description: string;
  evidence: string;
};

const FREQUENCIES: Freq[] = [
  {
    name: "Delta — Deep Sleep & Recovery",
    carrier: 200,
    beat: 2.5,
    band: "Delta (0.5–4 Hz)",
    duration: 30,
    description:
      "Encourages deep, restorative sleep and bodily healing. Best used lying down before sleep.",
    evidence:
      "Studies suggest delta-frequency binaural beats may improve sleep quality and reduce anxiety (Jirakittayakorn & Wongsawat, 2018).",
  },
  {
    name: "Theta — Deep Relaxation & Trauma Soothing",
    carrier: 210,
    beat: 6,
    band: "Theta (4–8 Hz)",
    duration: 20,
    description:
      "Supports meditation, emotional release and creative insight. Useful after distressing events.",
    evidence:
      "Theta entrainment has been associated with reduced state-anxiety and improved meditative depth (Wahbeh et al., 2007).",
  },
  {
    name: "Alpha — Calm Focus & Anxiety Relief",
    carrier: 240,
    beat: 10,
    band: "Alpha (8–13 Hz)",
    duration: 15,
    description:
      "Promotes relaxed alertness, reduces anxiety, and helps with mild stress and worry.",
    evidence:
      "Alpha binaural beats are linked to reduced pre-operative and general anxiety (Padmanabhan et al., 2005).",
  },
  {
    name: "Low Beta — Gentle Focus & Mood Lift",
    carrier: 250,
    beat: 14,
    band: "Beta (13–30 Hz)",
    duration: 15,
    description:
      "Helps mental clarity, light focus and a small lift in mood when feeling foggy or low.",
    evidence:
      "Beta-range entrainment has shown small improvements in attention and mood (Lane et al., 1998).",
  },
  {
    name: "Gamma — Compassion & Cognitive Integration",
    carrier: 300,
    beat: 40,
    band: "Gamma (30–50 Hz)",
    duration: 10,
    description:
      "Associated with loving-kindness states and integrative thinking. Use sitting upright.",
    evidence:
      "40 Hz gamma activity is observed in long-term meditators during compassion practice (Lutz et al., 2004).",
  },
];

const Player = ({ freq }: { freq: Freq }) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ left: OscillatorNode; right: OscillatorNode; gain: GainNode } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [remaining, setRemaining] = useState(freq.duration * 60);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          stop();
          return freq.duration * 60;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const start = async () => {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    const merger = ctx.createChannelMerger(2);
    const gain = ctx.createGain();
    gain.gain.value = 0.08;

    const left = ctx.createOscillator();
    const right = ctx.createOscillator();
    left.frequency.value = freq.carrier;
    right.frequency.value = freq.carrier + freq.beat;
    left.type = "sine";
    right.type = "sine";

    left.connect(merger, 0, 0);
    right.connect(merger, 0, 1);
    merger.connect(gain).connect(ctx.destination);

    left.start();
    right.start();
    nodesRef.current = { left, right, gain };
    setPlaying(true);
  };

  const stop = () => {
    nodesRef.current?.left.stop();
    nodesRef.current?.right.stop();
    ctxRef.current?.close();
    nodesRef.current = null;
    ctxRef.current = null;
    setPlaying(false);
  };

  useEffect(() => () => { try { stop(); } catch {} }, []);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="bg-white dark:bg-secondary border rounded-lg p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="font-semibold text-lg">{freq.name}</h3>
          <p className="text-xs text-muted-foreground">
            {freq.band} • Beat {freq.beat} Hz • Carrier {freq.carrier} Hz • {freq.duration} min
          </p>
        </div>
        <button
          onClick={playing ? stop : start}
          className="bg-primary text-primary-foreground rounded-full p-3 hover:opacity-90"
          aria-label={playing ? "Stop" : "Play"}
        >
          {playing ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      <p className="text-sm mb-2">{freq.description}</p>
      <p className="text-xs text-muted-foreground italic mb-2">{freq.evidence}</p>
      {playing && (
        <div className="text-sm font-mono text-primary">Time left: {mm}:{ss}</div>
      )}
    </div>
  );
};

const FrequenciesTechnique = () => (
  <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4 pb-12">
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl md:text-4xl font-bold mb-3 text-primary">Healing Frequencies</h2>
      <p className="text-muted-foreground mb-4">
        Five evidence-informed binaural beats. Each combines two slightly different tones — one
        in each ear — and your brain perceives the difference as a rhythmic "beat" that can gently
        guide your state.
      </p>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 flex gap-3">
        <Headphones className="text-yellow-700 dark:text-yellow-300 flex-shrink-0" />
        <div className="text-sm text-yellow-900 dark:text-yellow-100">
          <strong>Use stereo headphones</strong> — binaural beats only work when each ear hears a
          different tone. Keep volume low and comfortable. Avoid if you have epilepsy, wear a
          pacemaker, or are pregnant; consult a doctor first.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {FREQUENCIES.map((f) => (
          <Player key={f.name} freq={f} />
        ))}
      </div>

      <div className="mt-8 text-xs text-muted-foreground">
        References: Jirakittayakorn & Wongsawat (2018); Wahbeh et al. (2007); Padmanabhan et al.
        (2005); Lane et al. (1998); Lutz et al. (2004).
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/techniques" className="text-primary underline">← Back to Techniques</Link>
      </div>
    </div>
  </div>
);

export default FrequenciesTechnique;
