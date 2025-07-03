
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw, Heart } from "lucide-react";

const BreathingTechnique = () => {
  const [isActive, setIsActive] = useState(false);
  const [technique, setTechnique] = useState<'4-7-8' | '4-4-4' | 'box'>('4-7-8');
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);

  const techniques = {
    '4-7-8': { inhale: 4, hold: 7, exhale: 8, pause: 0 },
    '4-4-4': { inhale: 4, hold: 4, exhale: 4, pause: 0 },
    'box': { inhale: 4, hold: 4, exhale: 4, pause: 4 }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            const currentTechnique = techniques[technique];
            if (phase === 'inhale') {
              setPhase('hold');
              return currentTechnique.hold;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return currentTechnique.exhale;
            } else if (phase === 'exhale' && technique === 'box') {
              setPhase('pause');
              return currentTechnique.pause;
            } else {
              setPhase('inhale');
              setCycles(prev => prev + 1);
              return currentTechnique.inhale;
            }
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, technique]);

  const resetBreathing = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(techniques[technique].inhale);
    setCycles(0);
  };

  const changeTechnique = (newTechnique: typeof technique) => {
    setTechnique(newTechnique);
    setIsActive(false);
    setPhase('inhale');
    setCount(techniques[newTechnique].inhale);
    setCycles(0);
  };

  const getInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Inhale slowly through nose';
      case 'hold': return 'Hold your breath';
      case 'exhale': return 'Exhale slowly through mouth';
      case 'pause': return 'Pause and rest';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg p-8 bg-white dark:bg-secondary space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <Heart className="text-red-500" />
            Breathing Techniques
          </h1>
          <p className="text-muted-foreground">
            Evidence-based breathing exercises to calm your nervous system and reduce stress
          </p>
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          {Object.keys(techniques).map((tech) => (
            <button
              key={tech}
              onClick={() => changeTechnique(tech as typeof technique)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                technique === tech 
                  ? 'bg-primary text-white' 
                  : 'bg-accent text-accent-foreground hover:bg-accent/80'
              }`}
            >
              {tech === '4-7-8' ? '4-7-8 Calming' : tech === '4-4-4' ? 'Equal Breathing' : 'Box Breathing'}
            </button>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center text-white text-4xl font-bold transition-all duration-1000 ${
            phase === 'inhale' ? 'bg-blue-500 scale-110' : 
            phase === 'hold' ? 'bg-purple-500 scale-105' : 
            phase === 'exhale' ? 'bg-green-500 scale-95' :
            'bg-gray-400 scale-90'
          }`}>
            {count}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold capitalize">{phase.replace('_', ' ')}</h2>
            <p className="text-muted-foreground">{getInstruction()}</p>
            <p className="text-sm text-muted-foreground">Completed cycles: {cycles}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 font-semibold"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={resetBreathing}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">How it helps:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <li>• <strong>4-7-8:</strong> Activates relaxation response, great for anxiety and sleep</li>
            <li>• <strong>Equal Breathing:</strong> Balances nervous system, good for focus</li>
            <li>• <strong>Box Breathing:</strong> Used by military and first responders for stress</li>
          </ul>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Safety:</strong> Stop if you feel dizzy. Practice regularly for best results.
          </p>
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

export default BreathingTechnique;
