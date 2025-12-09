import React, { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: 'emerald' | 'purple' | 'blue' | 'orange';
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, color }) => {
  const colorStyles = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40",
    purple: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40",
    blue: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40",
    orange: "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40",
  };

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 ${colorStyles[color]} group`}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-slate-900/50 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};