import React from 'react';

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="h-64 flex items-end justify-between space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <div
              className={`w-full bg-gradient-to-t from-${item.color}-500 to-${item.color}-400 rounded-t-lg transition-all duration-500 hover:scale-105`}
              style={{ height: `${(item.value / maxValue) * 200}px` }}
            />
            <div className="mt-2 text-center">
              <div className="text-sm font-semibold text-white">{item.value}</div>
              <div className="text-xs text-gray-400">{item.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;