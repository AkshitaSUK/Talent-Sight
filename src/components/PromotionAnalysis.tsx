import React from 'react';
import { Award, TrendingUp, Users, Star } from 'lucide-react';
import MetricCard from './MetricCard';
import DonutChart from './DonutChart';
import BarChart from './BarChart';

interface PromotionAnalysisProps {
  filters: {
    country: string;
    timeline: string;
    department: string;
  };
}

const PromotionAnalysis: React.FC<PromotionAnalysisProps> = ({ filters }) => {
  const metrics = [
    {
      title: 'Total Promotions',
      value: '324',
      change: '+18.2%',
      trend: 'up',
      icon: Award,
      color: 'cyan'
    },
    {
      title: 'Promotion Rate',
      value: '11.4%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Internal Mobility',
      value: '156',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Leadership Promotions',
      value: '42',
      change: '+15.3%',
      trend: 'up',
      icon: Star,
      color: 'pink'
    }
  ];

  const countryPromotions = [
    { name: 'US', value: 142, color: 'cyan' },
    { name: 'India', value: 98, color: 'green' },
    { name: 'UK', value: 45, color: 'purple' },
    { name: 'Germany', value: 25, color: 'pink' },
    { name: 'Canada', value: 14, color: 'yellow' }
  ];

  const careerLevels = [
    { name: 'Individual Contributor', value: 45, color: 'cyan' },
    { name: 'Senior IC', value: 32, color: 'green' },
    { name: 'Team Lead', value: 15, color: 'purple' },
    { name: 'Manager', value: 6, color: 'pink' },
    { name: 'Senior Manager', value: 2, color: 'yellow' }
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Promotions by Country</h3>
          <BarChart data={countryPromotions} />
        </div>

        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Career Level Distribution</h3>
          <DonutChart data={careerLevels} />
        </div>
      </div>

      {/* Promotion Pipeline */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">Promotion Pipeline</h3>
        <div className="space-y-4">
          {[
            { level: 'Ready Now', count: 87, color: 'green' },
            { level: 'Ready in 6 months', count: 124, color: 'cyan' },
            { level: 'Ready in 1 year', count: 203, color: 'purple' },
            { level: 'Development needed', count: 156, color: 'pink' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                <span className="text-white font-medium">{item.level}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-white">{item.count}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-${item.color}-500`}
                    style={{ width: `${(item.count / 203) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionAnalysis;
