
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw } from "lucide-react";

const KidsBreathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else {
              setPhase('inhale');
              setCycles(prev => prev + 1);
              return 4;
            }
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleBreathing = () => {
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(4);
    setCycles(0);
  };

  const getInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In Slowly 🌸';
      case 'hold': return 'Hold Your Breath 🫧';
      case 'exhale': return 'Breathe Out Gently 🍃';
    }
  };

  const getSlothMessage = () => {
    if (cycles === 0) return "Hi! I'm Slow Sloth. Let's breathe together and feel calm. 🦥";
    if (cycles < 3) return "You're doing great! Keep breathing with me. 🦥💚";
    if (cycles < 5) return "Feel how calm your body is getting? Well done! 🦥✨";
    return "Wow! You're a breathing expert now! I'm so proud! 🦥🌟";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 flex flex-col items-center pt-8 px-4">
      <div className="w-full max-w-md rounded-3xl shadow-2xl p-8 bg-white/90 dark:bg-secondary/90 space-y-6 text-center">
        
        <h1 className="text-2xl font-bold text-primary mb-4">Calm Breathing with Slow Sloth</h1>
        
        <div className="bg-green-50 dark:bg-green-900 rounded-2xl p-4 mb-6">
          <p className="text-sm text-green-800 dark:text-green-200">{getSlothMessage()}</p>
        </div>

        <div className="space-y-6">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-white text-6xl font-bold transition-all duration-1000 ${
            phase === 'inhale' ? 'bg-blue-400 scale-110' : 
            phase === 'hold' ? 'bg-purple-400 scale-105' : 
            'bg-green-400 scale-95'
          }`}>
            {count}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">{getInstruction()}</h2>
            <p className="text-muted-foreground">Completed cycles: {cycles}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={toggleBreathing}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold transition-colors"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={resetBreathing}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-semibold transition-colors"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-sm">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Instructions:</strong> Follow the circle and breathe with Slow Sloth. 
              Inhale for 4 counts, hold for 4, exhale for 4. This helps your body feel calm and safe.
            </p>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Link to="/kids" className="block text-primary underline hover-scale">
            ← Back to Animal Friends
          </Link>
          <Link to="/" className="block text-muted-foreground underline text-sm">
            Go to Main App
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KidsBreathing;
