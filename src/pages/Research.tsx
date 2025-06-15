
import { Link } from "react-router-dom";

const Research = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-2">
    <div className="w-full max-w-lg bg-white dark:bg-secondary rounded-lg shadow-lg p-8 text-center space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-2">Self-Assessment & Research</h2>
      <p className="text-lg text-muted-foreground mb-4">
        If you wish, you can try a short before/after check-in to see the effect of each technique for yourself.
        You may also help science by choosing to anonymously share your results for collective learning.
      </p>
      <div className="py-4">
        <span className="block py-6 text-muted-foreground italic">Coming soon: Mood tracker & brief questionnaires</span>
      </div>
      <Link to="/" className="text-primary underline hover-scale">← Back to Home</Link>
    </div>
  </div>
);

export default Research;
