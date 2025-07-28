import React from 'react';

interface AreaChartProps {
  data: Array<{
    year: string;
    headcount: number;
    attrition: number;
    newHires: number;
    promotions: number;
  }>;
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const maxHeadcount = Math.max(...data.map(d => d.headcount));
  const maxValue = Math.max(...data.map(d => Math.max(d.newHires, d.promotions)));

  return (
    <div className="h-64 relative">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id="headcountArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hiresArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="promotionsArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
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
        
        {/* Headcount area */}
        <path
          d={`M 0 200 ${data.map((d, i) => `L ${(i * 120) + 50} ${200 - (d.headcount / maxHeadcount) * 160}`).join(' ')} L 400 200 Z`}
          fill="url(#headcountArea)"
        />
        
        {/* New hires area */}
        <path
          d={`M 0 200 ${data.map((d, i) => `L ${(i * 120) + 50} ${200 - (d.newHires / maxValue) * 160}`).join(' ')} L 400 200 Z`}
          fill="url(#hiresArea)"
        />
        
        {/* Promotions area */}
        <path
          d={`M 0 200 ${data.map((d, i) => `L ${(i * 120) + 50} ${200 - (d.promotions / maxValue) * 160}`).join(' ')} L 400 200 Z`}
          fill="url(#promotionsArea)"
        />
        
        {/* Lines */}
        <polyline
          points={data.map((d, i) => `${(i * 120) + 50},${200 - (d.headcount / maxHeadcount) * 160}`).join(' ')}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
        />
        
        <polyline
          points={data.map((d, i) => `${(i * 120) + 50},${200 - (d.newHires / maxValue) * 160}`).join(' ')}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />
        
        <polyline
          points={data.map((d, i) => `${(i * 120) + 50},${200 - (d.promotions / maxValue) * 160}`).join(' ')}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle
              cx={(i * 120) + 50}
              cy={200 - (d.headcount / maxHeadcount) * 160}
              r="4"
              fill="#06b6d4"
            />
            <circle
              cx={(i * 120) + 50}
              cy={200 - (d.newHires / maxValue) * 160}
              r="3"
              fill="#10b981"
            />
            <circle
              cx={(i * 120) + 50}
              cy={200 - (d.promotions / maxValue) * 160}
              r="3"
              fill="#8b5cf6"
            />
            <text
              x={(i * 120) + 50}
              y="195"
              textAnchor="middle"
              className="text-xs fill-gray-400"
            >
              {d.year}
            </text>
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 left-0 flex space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
          <span className="text-gray-400">Headcount</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">New Hires</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-gray-400">Promotions</span>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;