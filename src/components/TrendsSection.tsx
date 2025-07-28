import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Users, UserPlus, Briefcase } from 'lucide-react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import AreaChart from './AreaChart';

interface TrendsSectionProps {
  filters: {
    country: string;
    timeline: string;
    department: string;
  };
}

const TrendsSection: React.FC<TrendsSectionProps> = ({ filters }) => {
  const [metrics, setMetrics] = useState([
    {
      title: 'Bench Strength',
      value: '87%',
      change: '+3.2%',
      trend: 'up',
      icon: Users,
      color: 'cyan'
    },
    {
      title: 'Attrition Trend',
      value: '3.4%',
      change: '-0.8%',
      trend: 'down',
      icon: TrendingDown,
      color: 'green'
    },
    {
      title: 'Headcount Growth',
      value: '12.3%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'New Hire Velocity',
      value: '26/month',
      change: '+15.6%',
      trend: 'up',
      icon: UserPlus,
      color: 'pink'
    }
  ]);

  const [yearOverYearData, setYearOverYearData] = useState([
    { year: '2020', headcount: 2150, attrition: 8.2, newHires: 245, promotions: 187 },
    { year: '2021', headcount: 2380, attrition: 7.8, newHires: 298, promotions: 234 },
    { year: '2022', headcount: 2620, attrition: 6.9, newHires: 356, promotions: 289 },
    { year: '2023', headcount: 2847, attrition: 5.4, newHires: 412, promotions: 324 }
  ]);

  const [departmentTrends, setDepartmentTrends] = useState([
    { dept: 'Engineering', growth: 18.5, attrition: 4.2, color: 'cyan' },
    { dept: 'Sales', growth: 12.3, attrition: 6.1, color: 'green' },
    { dept: 'Marketing', growth: 9.8, attrition: 3.7, color: 'purple' },
    { dept: 'HR', growth: 7.2, attrition: 2.9, color: 'pink' },
    { dept: 'Finance', growth: 5.4, attrition: 2.1, color: 'yellow' }
  ]);

  useEffect(() => {
    console.log('Filters updated:', filters);

    // Simulate fetching new data based on filters
    setMetrics(prevMetrics => prevMetrics.map(metric => ({
      ...metric,
      value: (parseFloat(metric.value) + Math.random() * 5).toFixed(1) + '%'
    })));

    setYearOverYearData(prevData => prevData.map(data => ({
      ...data,
      headcount: data.headcount + Math.floor(Math.random() * 50),
      attrition: parseFloat((data.attrition + Math.random()).toFixed(1)),
      newHires: data.newHires + Math.floor(Math.random() * 20),
      promotions: data.promotions + Math.floor(Math.random() * 10)
    })));

    setDepartmentTrends(prevTrends => prevTrends.map(dept => ({
      ...dept,
      growth: parseFloat((dept.growth + Math.random()).toFixed(1)),
      attrition: parseFloat((dept.attrition + Math.random()).toFixed(1))
    })));
  }, [filters]);

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Year over Year Analysis */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">Year over Year Analysis</h3>
        <AreaChart data={yearOverYearData} />
      </div>

      {/* Department Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Department Growth Trends</h3>
          <div className="space-y-4">
            {departmentTrends.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Briefcase className={`w-5 h-5 text-${dept.color}-400`} />
                  <span className="text-white font-medium">{dept.dept}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-sm font-semibold text-${dept.color}-400`}>
                      +{dept.growth}%
                    </div>
                    <div className="text-xs text-gray-400">Growth</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-400">
                      {dept.attrition}%
                    </div>
                    <div className="text-xs text-gray-400">Attrition</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Predictive Analytics</h3>
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
              <h4 className="text-cyan-400 font-semibold mb-2">Headcount Forecast</h4>
              <p className="text-gray-300 text-sm mb-2">Expected to reach 3,200 by end of year</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Attrition Risk</h4>
              <p className="text-gray-300 text-sm mb-2">Low risk - trending downward</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-2">Promotion Pipeline</h4>
              <p className="text-gray-300 text-sm mb-2">Strong pipeline with 87 ready now</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsSection;
