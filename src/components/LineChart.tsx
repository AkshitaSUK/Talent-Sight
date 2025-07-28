import React from 'react';

interface LineChartProps {
  data: Array<{
    month: string;
    headcount: number;
    newHires: number;
    attrition: number;
  }>;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const maxHeadcount = Math.max(...data.map(d => d.headcount));
  const maxOther = Math.max(...data.map(d => Math.max(d.newHires, d.attrition)));

  return (
    <div className="h-64 relative">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id="headcountGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="0"
            y1={i * 40}
            x2="400"
            y2={i * 40}
            stroke="#374151"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Headcount line */}
        <polyline
          points={data.map((d, i) => `${(i * 60) + 30},${200 - (d.headcount / maxHeadcount) * 160}`).join(' ')}
          fill="none"
          stroke="url(#headcountGradient)"
          strokeWidth="3"
          className="drop-shadow-lg"
        />
        
        {/* New hires line */}
        <polyline
          points={data.map((d, i) => `${(i * 60) + 30},${200 - (d.newHires / maxOther) * 160}`).join(' ')}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />
        
        {/* Attrition line */}
        <polyline
          points={data.map((d, i) => `${(i * 60) + 30},${200 - (d.attrition / maxOther) * 160}`).join(' ')}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle
              cx={(i * 60) + 30}
              cy={200 - (d.headcount / maxHeadcount) * 160}
              r="4"
              fill="#06b6d4"
              className="drop-shadow-lg"
            />
            <circle
              cx={(i * 60) + 30}
              cy={200 - (d.newHires / maxOther) * 160}
              r="3"
              fill="#10b981"
            />
            <circle
              cx={(i * 60) + 30}
              cy={200 - (d.attrition / maxOther) * 160}
              r="3"
              fill="#ef4444"
            />
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 left-0 flex space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
          <span className="text-gray-400">Headcount</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">New Hires</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-400">Attrition</span>
        </div>
      </div>
    </div>
  );
};

export default LineChart;