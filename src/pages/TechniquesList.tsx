
import { Link } from "react-router-dom";
import { BookOpenCheck, HeartPulse, Headphones, Pen, MoveRight, Wind } from "lucide-react";

// Technique card: expand with more info/links in future
const techniqueData = [
  {
    title: "Breathing",
    icon: Wind,
    description: "Simple, evidence-based exercises to calm the body and mind."
  },
  {
    title: "Vagus Nerve Soothing",
    icon: HeartPulse,
    description: "Gentle techniques to activate your natural calming system."
  },
  {
    title: "Tapping (EFT)",
    icon: BookOpenCheck,
    description: "Relieve stress using acupressure points and affirmations."
  },
  {
    title: "Eye Movement (Bilateral)",
    icon: MoveRight,
    description: "Safe DIY eye movement for processing stress."
  },
  {
    title: "Self-Soothing & Havening",
    icon: HeartPulse,
    description: "Hands-on havening and self-comfort exercises."
  },
  {
    title: "Self-Hypnosis",
    icon: BookOpenCheck,
    description: "Easy scripts for deep relaxation and self-guided healing."
  },
  {
    title: "Journaling",
    icon: Pen,
    description: "Write, reflect, and track your mood simply."
  },
  {
    title: "Movement",
    icon: MoveRight,
    description: "Gentle, accessible somatic and stretching exercises."
  },
  {
    title: "Healing Frequencies",
    icon: Headphones,
    description: "Soothing Hz soundscapes for sleep, regenerating calm and focus."
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
        {techniqueData.map(({ title, icon: Icon, description }) => (
          <div
            key={title}
            className="bg-white dark:bg-secondary border rounded-lg p-5 flex gap-4 items-center hover:shadow-lg transition-shadow"
          >
            <div className="flex-shrink-0">
              <Icon size={32} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold">{title}</div>
              <div className="text-muted-foreground text-sm">{description}</div>
              {/* Will link to detail page in future */}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/" className="text-primary underline hover-scale">← Back to Home</Link>
      </div>
    </div>
  </div>
);

export default TechniquesList;
