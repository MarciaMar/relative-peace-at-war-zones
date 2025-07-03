
import { Link } from "react-router-dom";
import { BookOpenCheck, HeartPulse, Headphones, Pen, MoveRight, Wind, Eye, Hand } from "lucide-react";

const techniqueData = [
  {
    title: "Breathing",
    icon: Wind,
    description: "Simple, evidence-based exercises to calm the body and mind.",
    link: "/technique/breathing",
    ready: true
  },
  {
    title: "Journaling",
    icon: Pen,
    description: "Write, reflect, and track your mood safely and privately.",
    link: "/technique/journaling",
    ready: true
  },
  {
    title: "Grounding (5-4-3-2-1)",
    icon: Hand,
    description: "Use your senses to feel present and safe in the moment.",
    link: "/technique/grounding",
    ready: true
  },
  {
    title: "Progressive Muscle Relaxation",
    icon: HeartPulse,
    description: "Tense and release muscles to reduce physical stress.",
    link: "/technique/pmr",
    ready: true
  },
  {
    title: "Tapping (EFT)",
    icon: BookOpenCheck,
    description: "Relieve stress using acupressure points and affirmations.",
    link: "/technique/tapping",
    ready: false
  },
  {
    title: "Eye Movement (Bilateral)",
    icon: Eye,
    description: "Safe DIY eye movement for processing stress.",
    link: "/technique/emdr",
    ready: false
  },
  {
    title: "Self-Soothing & Havening",
    icon: Hand,
    description: "Hands-on havening and self-comfort exercises.",
    link: "/technique/havening",
    ready: false
  },
  {
    title: "Movement",
    icon: MoveRight,
    description: "Gentle, accessible somatic and stretching exercises.",
    link: "/technique/movement",
    ready: false
  },
  {
    title: "Healing Frequencies",
    icon: Headphones,
    description: "Soothing Hz soundscapes for sleep, calm and focus.",
    link: "/technique/frequencies",
    ready: false
  }
];

const TechniquesList = () => (
  <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4">
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-primary">Techniques Library</h2>
      <p className="mb-8 text-muted-foreground">
        Pick any of the techniques below and try what feels helpful. No sign-up or tracking needed.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {techniqueData.map(({ title, icon: Icon, description, link, ready }) => (
          <div
            key={title}
            className={`bg-white dark:bg-secondary border rounded-lg p-5 flex gap-4 items-center transition-all ${
              ready 
                ? 'hover:shadow-lg cursor-pointer hover:scale-105' 
                : 'opacity-60'
            }`}
          >
            <div className="flex-shrink-0">
              <Icon size={32} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold flex items-center gap-2">
                {title}
                {ready && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>}
                {!ready && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Coming Soon</span>}
              </div>
              <div className="text-muted-foreground text-sm">{description}</div>
              {ready && (
                <Link to={link} className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
                  Try this technique →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
        <h3 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">Quick Start Guide:</h3>
        <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <li><strong>1. Start with Breathing:</strong> Most accessible and immediately effective</li>
          <li><strong>2. Try Grounding:</strong> Perfect when feeling overwhelmed or disconnected</li>
          <li><strong>3. Use Journaling:</strong> For processing emotions and thoughts safely</li>
          <li><strong>4. Add Muscle Relaxation:</strong> When carrying physical tension</li>
        </ol>
        <p className="text-xs text-blue-700 dark:text-blue-300 mt-4">
          <strong>Note:</strong> These techniques are self-help tools. If you're in crisis, please reach out to local emergency services or mental health professionals.
        </p>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Link to="/" className="text-primary underline hover-scale">← Back to Home</Link>
      </div>
    </div>
  </div>
);

export default TechniquesList;
