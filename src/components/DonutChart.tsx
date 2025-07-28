import React from 'react';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const colorMap = {
    cyan: '#06b6d4',
    green: '#10b981',
    purple: '#8b5cf6',
    pink: '#ec4899',
    yellow: '#f59e0b'
  };

  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage * 2.51} ${251 - percentage * 2.51}`;
            const strokeDashoffset = -cumulativePercentage * 2.51;
            cumulativePercentage += percentage;

            return (
              <circle
                key={index}
                cx="100"
                cy="100"
                r="40"
                fill="transparent"
                stroke={colorMap[item.color as keyof typeof colorMap]}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 hover:stroke-[25]"
                transform="rotate(-90 100 100)"
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{total}%</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
        </div>
      </div>
      
      <div className="ml-8 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorMap[item.color as keyof typeof colorMap] }}
            />
            <span className="text-sm text-gray-400">{item.name}</span>
            <span className="text-sm font-semibold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;