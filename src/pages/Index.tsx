
import { Link } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg p-8 bg-white dark:bg-secondary space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-5xl font-bold text-primary">
            Relative Peace
          </h1>
          <LanguageSelector />
        </div>
        <p className="text-lg md:text-xl text-muted-foreground">
          <b>Your humanitarian toolkit</b> for reducing trauma and building resilience in the face of war and conflict. 
          This free, open-source app brings together research-backed, self-guided techniques—breathing, movement, journaling, healing sounds, and more—to help you feel better with minimal effort, in your language, wherever you are. 
          <br />No data is collected unless you choose to participate in optional, anonymized self-tracking for your own insight and the greater good.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/techniques" className="flex-1">
            <button className="w-full py-3 rounded bg-primary text-white hover:bg-primary/90 font-semibold transition-colors">
              Explore Techniques
            </button>
          </Link>
          <Link to="/research" className="flex-1">
            <button className="w-full py-3 rounded bg-accent text-accent-foreground hover:bg-accent/90 font-semibold transition-colors">
              Self-Assessment & Research
            </button>
          </Link>
        </div>
        <div className="text-xs text-center text-muted-foreground pt-2">
          <span>
            Built for humanity. Free forever. Please share and help others find peace, even in the hardest times.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
