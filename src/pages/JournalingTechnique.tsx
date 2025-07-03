
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Save, Download, Trash2, BookOpen } from "lucide-react";

const JournalingTechnique = () => {
  const [entries, setEntries] = useState<Array<{id: string, date: string, content: string, mood: string}>>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentMood, setCurrentMood] = useState('neutral');
  const [showPrompts, setShowPrompts] = useState(true);

  const prompts = [
    "How am I feeling right now?",
    "What am I grateful for today?",
    "What is one thing that brought me peace today?",
    "What emotions am I experiencing?",
    "What do I need right now to feel safe?",
    "What would I tell a friend who felt like this?",
    "What small victory can I celebrate today?"
  ];

  const moods = [
    { value: 'great', emoji: '😊', label: 'Great' },
    { value: 'good', emoji: '🙂', label: 'Good' },
    { value: 'neutral', emoji: '😐', label: 'Neutral' },
    { value: 'difficult', emoji: '😔', label: 'Difficult' },
    { value: 'very-difficult', emoji: '😢', label: 'Very Difficult' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('journal-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      content: currentEntry,
      mood: currentMood
    };
    
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
    setCurrentEntry('');
    alert('Entry saved safely on your device');
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
  };

  const exportEntries = () => {
    const text = entries.map(entry => 
      `Date: ${entry.date}\nMood: ${entry.mood}\n\n${entry.content}\n\n---\n\n`
    ).join('');
    
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `journal-entries-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4">
      <div className="w-full max-w-4xl rounded-lg shadow-lg p-8 bg-white dark:bg-secondary space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <BookOpen className="text-blue-500" />
            Safe Journaling Space
          </h1>
          <p className="text-muted-foreground">
            Write your thoughts safely. Everything stays on your device only.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Write New Entry</h2>
            
            {showPrompts && (
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Gentle Prompts:</h3>
                <div className="space-y-1">
                  {prompts.slice(0, 3).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentEntry(prompt + '\n\n')}
                      className="block text-left text-sm text-blue-800 dark:text-blue-200 hover:underline"
                    >
                      • {prompt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowPrompts(false)}
                  className="text-xs text-blue-600 dark:text-blue-300 mt-2 underline"
                >
                  Hide prompts
                </button>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium">How are you feeling?</label>
              <div className="flex gap-2 flex-wrap">
                {moods.map(mood => (
                  <button
                    key={mood.value}
                    onClick={() => setCurrentMood(mood.value)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentMood === mood.value 
                        ? 'bg-primary text-white' 
                        : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }`}
                  >
                    {mood.emoji} {mood.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Write whatever comes to mind... there's no wrong way to do this."
              className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />

            <div className="flex gap-2">
              <button
                onClick={saveEntry}
                disabled={!currentEntry.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                Save Entry
              </button>
              
              {!showPrompts && (
                <button
                  onClick={() => setShowPrompts(true)}
                  className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80"
                >
                  Show Prompts
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Entries ({entries.length})</h2>
              {entries.length > 0 && (
                <button
                  onClick={exportEntries}
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-accent text-accent-foreground hover:bg-accent/80"
                >
                  <Download size={14} />
                  Export
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {entries.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Your entries will appear here. Everything stays private on your device.
                </p>
              ) : (
                entries.map(entry => (
                  <div key={entry.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="text-xs text-muted-foreground">
                        {entry.date} • {moods.find(m => m.value === entry.mood)?.emoji} {entry.mood}
                      </div>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete entry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{entry.content.substring(0, 200)}{entry.content.length > 200 ? '...' : ''}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-green-900 dark:text-green-100">Why Journaling Helps:</h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• Helps process difficult emotions safely</li>
            <li>• Reduces stress and anxiety</li>
            <li>• Improves emotional awareness and regulation</li>
            <li>• Creates a record of your healing journey</li>
            <li>• Provides a healthy outlet for expression</li>
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

export default JournalingTechnique;
