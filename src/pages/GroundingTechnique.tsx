
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Ear, Hand, Nose, Zap } from "lucide-react";

const GroundingTechnique = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<{[key: number]: string[]}>({});
  const [currentResponse, setCurrentResponse] = useState('');

  const steps = [
    {
      number: 5,
      sense: "See",
      icon: Eye,
      color: "blue",
      instruction: "Look around and name 5 things you can see",
      examples: ["a door", "my hands", "a window", "the ceiling", "a phone"]
    },
    {
      number: 4,
      sense: "Touch",
      icon: Hand,
      color: "green",
      instruction: "Notice 4 things you can feel/touch",
      examples: ["my feet on the floor", "the chair under me", "my clothes", "the temperature"]
    },
    {
      number: 3,
      sense: "Hear",
      icon: Ear,
      color: "purple",
      instruction: "Listen and identify 3 things you can hear",
      examples: ["my breathing", "sounds outside", "someone talking"]
    },
    {
      number: 2,
      sense: "Smell",
      icon: Nose,
      color: "orange",
      instruction: "Find 2 things you can smell",
      examples: ["the air", "my clothes", "something nearby"]
    },
    {
      number: 1,
      sense: "Taste",
      icon: Zap,
      color: "red",
      instruction: "Notice 1 thing you can taste",
      examples: ["my mouth", "something I drank", "toothpaste"]
    }
  ];

  const addResponse = () => {
    if (!currentResponse.trim()) return;
    
    const stepResponses = responses[currentStep] || [];
    setResponses({
      ...responses,
      [currentStep]: [...stepResponses, currentResponse.trim()]
    });
    setCurrentResponse('');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setResponses({});
    setCurrentResponse('');
  };

  const currentStepData = steps[currentStep];
  const isComplete = currentStep === steps.length - 1 && (responses[currentStep]?.length || 0) >= 1;
  const currentResponses = responses[currentStep] || [];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg p-8 bg-white dark:bg-secondary space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">5-4-3-2-1 Grounding</h1>
          <p className="text-muted-foreground">
            Use your senses to feel present and safe in this moment
          </p>
        </div>

        <div className="flex justify-center space-x-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === currentStep 
                  ? `bg-${currentStepData.color}-500 text-white` 
                  : index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
              }`}
            >
              {step.number}
            </div>
          ))}
        </div>

        <div className={`border-l-4 border-${currentStepData.color}-500 bg-${currentStepData.color}-50 dark:bg-${currentStepData.color}-900 p-6 rounded-lg`}>
          <div className="flex items-center gap-3 mb-4">
            <currentStepData.icon size={32} className={`text-${currentStepData.color}-600`} />
            <div>
              <h2 className="text-xl font-bold">
                Step {currentStep + 1}: {currentStepData.instruction}
              </h2>
              <p className={`text-${currentStepData.color}-700 dark:text-${currentStepData.color}-300 text-sm`}>
                Take your time and really notice each one
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentResponses.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">What you've noticed:</h3>
                <ul className="space-y-1">
                  {currentResponses.map((response, i) => (
                    <li key={i} className={`text-${currentStepData.color}-800 dark:text-${currentStepData.color}-200 flex items-center gap-2`}>
                      <span className="w-1 h-1 bg-current rounded-full"></span>
                      {response}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentResponses.length < currentStepData.number && (
              <div className="space-y-3">
                <input
                  type="text"
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  placeholder={`I can ${currentStepData.sense.toLowerCase()}...`}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addResponse()}
                />
                <button
                  onClick={addResponse}
                  disabled={!currentResponse.trim()}
                  className={`w-full py-2 rounded-lg bg-${currentStepData.color}-500 text-white hover:bg-${currentStepData.color}-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
                >
                  Add ({currentResponses.length + 1}/{currentStepData.number})
                </button>
              </div>
            )}

            <div className="text-xs opacity-70">
              <p><strong>Examples:</strong> {currentStepData.examples.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80"
            >
              Previous
            </button>
          )}
          
          {currentResponses.length >= currentStepData.number && currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 font-medium"
            >
              Next Step
            </button>
          )}
          
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            Start Over
          </button>
        </div>

        {isComplete && (
          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
              Well done! 🌟
            </h3>
            <p className="text-green-800 dark:text-green-200 text-sm">
              You've completed the 5-4-3-2-1 grounding exercise. Notice how you feel now compared to when you started. 
              This technique helps bring you back to the present moment when feeling overwhelmed or anxious.
            </p>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">How Grounding Helps:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Interrupts anxiety and panic cycles</li>
            <li>• Brings awareness back to the present moment</li>
            <li>• Activates the parasympathetic nervous system</li>
            <li>• Provides a sense of control and safety</li>
            <li>• Can be done anywhere, anytime</li>
          </ul>
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

export default GroundingTechnique;
