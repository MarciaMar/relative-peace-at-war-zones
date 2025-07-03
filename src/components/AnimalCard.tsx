import React from "react";
import { LucideIcon, PawPrint, Ship, Eye, Bot, SmilePlus } from "lucide-react";

type AnimalCardProps = {
  name: string;
  icon?: LucideIcon;
  colorClass?: string;
  story: string;
};

const AnimalCard: React.FC<AnimalCardProps> = ({
  name,
  icon: Icon,
  colorClass = "bg-primary/10",
  story,
}) => (
  <div className={`rounded-2xl shadow-lg p-4 flex flex-col items-center ${colorClass} hover:scale-105 transition-transform cursor-pointer w-44 h-56`}>
    <div className="mb-2">
      {Icon ? <Icon size={48} className="text-primary" aria-label={name} /> : <PawPrint size={48} className="text-primary" />}
    </div>
    <div className="font-extrabold text-lg text-center mb-1">{name}</div>
    <div className="text-xs text-center text-muted-foreground">{story}</div>
  </div>
);

export default AnimalCard;
