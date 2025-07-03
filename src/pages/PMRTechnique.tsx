
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, SkipForward, RotateCcw, Zap } from "lucide-react";

const PMRTechnique = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'instruction' | 'tense' | 'release' | 'notice'>('instruction');
  const [timeLeft, setTimeLeft] = useState(0);

  const muscleGroups = [
    {
      name: "Face & Head",
      instruction: "Scrunch up your face - close eyes tight, clench jaw, furrow brow",
      location: "Face, forehead, jaw, around eyes"
    },
    {
      name: "Neck & Shoulders",
      instruction: "Lift shoulders up to ears and tense neck muscles",
      location: "Neck, shoulders, upper back"
    },
    {
      name: "Arms & Hands",
      instruction: "Make tight fists and tense your arms",
      location: "Hands, forearms, upper arms"
    },
    {
      name: "Chest & Back",
      instruction: "Take a deep breath and tense chest and back muscles",
      location: "Chest, upper back, between shoulder blades"
    },
    {
      name: "Stomach",
      instruction: "Tighten your stomach muscles like someone might poke you",
      location: "Abdominal muscles, core"
    },
    {
      name: "Legs & Feet",
      instruction: "Point your toes and tense your leg muscles",
      location: "Thighs, calves, feet, toes"
    }
  ];

  const phases = {
    instruction: { duration: 0, message: "Get ready to tense these muscles" },
    tense: { duration: 5, message: "Tense and hold (don't hold your breath)" },
    release: { duration: 3, message: "Release and let go completely" },
    notice: { duration: 10, message: "Notice the difference - feel the relaxation" }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            // Move to next phase
            if (phase === 'tense') {
              setPhase('release');
              return 3;
            } else if (phase === 'release') {
              setPhase('notice');
              return 10;
            } else if (phase === 'notice') {
              // Move to next muscle group or end
              if (currentStep < muscleGroups.length - 1) {
                setCurrentStep(curr => curr + 1);
                setPhase('instruction');
                setIsActive(false);
                return 0;
              } else {
                // End of session
                setIsActive(false);
                setPhase('instruction');
                return 0;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, currentStep]);

  const startCurrentPhase = () => {
    if (phase === 'instruction') {
      setPhase('tense');
      setTimeLeft(5);
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  };

  const skipToNext = () => {
    if (currentStep < muscleGroups.length - 1) {
      setCurrentStep(currentStep + 1);
      setPhase('instruction');
      setIsActive(false);
      setTimeLeft(0);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setPhase('instruction');
    setIsActive(false);
    setTimeLeft(0);
  };

  const currentGroup = muscleGroups[currentStep];
  const isComplete = currentStep === muscleGroups.length - 1 && phase === 'instruction' && !isActive;

  const getPhaseColor = () => {
    switch (phase) {
      case 'tense': return 'bg-red-500';
      case 'release': return 'bg-blue-500';
      case 'notice': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getPhaseMessage = () => {
    if (phase === 'instruction') {
      return `Focus on: ${currentGroup.location}`;
    }
    return phases[phase].message;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg p-8 bg-white dark:bg-secondary space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <Zap className="text-yellow-500" />
            Progressive Muscle Relaxation
          </h1>
          <p className="text-muted-foreground">
            Tense and release muscle groups to reduce physical stress and tension
          </p>
        </div>

        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            Step {currentStep + 1} of {muscleGroups.length}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / muscleGroups.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">{currentGroup.name}</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
            <p className="text-blue-900 dark:text-blue-100 font-medium">
              {currentGroup.instruction}
            </p>
          </div>

          {timeLeft > 0 && (
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-white text-3xl font-bold transition-all duration-500 ${getPhaseColor()}`}>
              {timeLeft}
            </div>
          )}

          <div className="space-y-2">
            <p className="text-lg font-medium capitalize">
              {phase === 'instruction' ? 'Ready?' : phase}
            </p>
            <p className="text-muted-foreground">
              {getPhaseMessage()}
            </p>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={startCurrentPhase}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 font-medium"
            >
              {phase === 'instruction' ? (
                <>
                  <Play size={20} />
                  Start This Group
                </>
              ) : (
                <>
                  {isActive ? <Pause size={20} /> : <Play size={20} />}
                  {isActive ? 'Pause' : 'Resume'}
                </>
              )}
            </button>
            
            {currentStep < muscleGroups.length - 1 && (
              <button
                onClick={skipToNext}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80"
              >
                <SkipForward size={20} />
                Skip
              </button>
            )}
            
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
            >
              <RotateCcw size={20} />
              Restart
            </button>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
              Session Complete! 🌟
            </h3>
            <p className="text-green-800 dark:text-green-200 text-sm">
              Take a moment to notice how your body feels now. You've systematically released tension from all major muscle groups. 
              This is what relaxation feels like - try to remember this feeling.
            </p>
          </div>
        )}

        <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-purple-900 dark:text-purple-100">How PMR Helps:</h3>
          <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
            <li>• Teaches your body the difference between tension and relaxation</li>
            <li>• Reduces physical symptoms of stress and anxiety</li>
            <li>• Improves sleep quality and reduces insomnia</li>
            <li>• Lowers blood pressure and heart rate</li>
            <li>• Can help with chronic pain and headaches</li>
          </ul>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-3">
            <strong>Tip:</strong> Practice regularly for best results. Start with once daily, ideally before bed.
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

export default PMRTechnique;
