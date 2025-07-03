import React from "react";
import AnimalCard from "../components/AnimalCard";
import { PawPrint, Ship, Eye, Bot, SmilePlus } from "lucide-react";
import { Link } from "react-router-dom";

const animalFriends = [
  {
    name: "Slow Sloth",
    icon: PawPrint,
    colorClass: "bg-green-100 dark:bg-green-900",
    story: "I love to take deep breaths and move slowly. Will you breathe with me and learn to find calm?",
  },
  {
    name: "Wise Owl",
    icon: Eye,
    colorClass: "bg-yellow-100 dark:bg-yellow-800",
    story: "They say wisdom comes from listening. Let's try gentle reflection games and learn together.",
  },
  {
    name: "Pretty Ship",
    icon: Ship,
    colorClass: "bg-blue-100 dark:bg-blue-900",
    story: "I’m different—I have no legs, but I travel everywhere with the help of my friends. It’s beautiful to be yourself!",
  },
  {
    name: "Soft Wolf",
    icon: SmilePlus,
    colorClass: "bg-purple-100 dark:bg-purple-900",
    story: "I’m the best friend of Pretty Ship, always ready to help and carry her, because friends care for each other!",
  },
  {
    name: "GAGI the Red Robot",
    icon: Bot,
    colorClass: "bg-red-100 dark:bg-red-900",
    story: "I try my best to understand every animal’s feelings and help humans learn kindness, empathy, and love.",
  },
];

const KidsHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-100 dark:from-blue-900 dark:via-green-900 dark:to-yellow-800 flex flex-col items-center pt-10 px-3">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-10 bg-white/80 dark:bg-secondary/90 space-y-8 animate-fade-in">
        <div className="text-3xl md:text-4xl font-bold text-center text-primary mb-2">Welcome to Animal Friends!</div>
        <div className="text-md md:text-lg text-muted-foreground text-center mb-6">
          Meet your animal friends and learn fun ways to feel better, be yourself, and care for each other. Play games, try calming exercises, and share kindness with GAGI and friends!
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {animalFriends.map(({ name, icon, colorClass, story }) => (
            <AnimalCard key={name} name={name} icon={icon} colorClass={colorClass} story={story} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/kids/breathe">
            <button className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 font-extrabold text-lg animate-bounce">
              Start with Calm Breathing
            </button>
          </Link>
        </div>
        <div className="pt-4 text-center">
          <Link to="/" className="text-primary underline hover-scale">← Back to Main App</Link>
        </div>
      </div>
    </div>
  );
};

export default KidsHome;
