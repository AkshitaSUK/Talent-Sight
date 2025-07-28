import React, { useEffect, useState } from 'react';
import { Users, UserPlus, UserMinus, TrendingDown } from 'lucide-react';
import MetricCard from './MetricCard';
import BarChart from './BarChart';
import LineChart from './LineChart';

interface PeopleDistributionProps {
  filters: {
    country: string;
    timeline: string;
    department: string;
  };
}

const PeopleDistribution: React.FC<PeopleDistributionProps> = ({ filters }) => {
  const [metrics, setMetrics] = useState([
    {
      title: 'Total Headcount',
      value: '2,847',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'cyan'
    },
    {
      title: 'New Hires',
      value: '184',
      change: '+12.3%',
      trend: 'up',
      icon: UserPlus,
      color: 'green'
    },
    {
      title: 'Attrition',
      value: '97',
      change: '-3.1%',
      trend: 'down',
      icon: UserMinus,
      color: 'red'
    },
    {
      title: 'Attrition Rate',
      value: '3.4%',
      change: '-0.8%',
      trend: 'down',
      icon: TrendingDown,
      color: 'purple'
    }
  ]);

  const [countryData, setCountryData] = useState([
    { name: 'US', value: 1247, color: 'cyan' },
    { name: 'India', value: 892, color: 'green' },
    { name: 'UK', value: 341, color: 'purple' },
    { name: 'Germany', value: 267, color: 'pink' },
    { name: 'Canada', value: 100, color: 'yellow' }
  ]);

  const [timelineData, setTimelineData] = useState([
    { month: 'Jan', headcount: 2650, newHires: 45, attrition: 32 },
    { month: 'Feb', headcount: 2683, newHires: 52, attrition: 19 },
    { month: 'Mar', headcount: 2724, newHires: 61, attrition: 20 },
    { month: 'Apr', headcount: 2756, newHires: 48, attrition: 16 },
    { month: 'May', headcount: 2789, newHires: 55, attrition: 22 },
    { month: 'Jun', headcount: 2821, newHires: 49, attrition: 17 },
    { month: 'Jul', headcount: 2847, newHires: 43, attrition: 17 }
  ]);

  useEffect(() => {
    // Fetch or compute new data based on filters
    console.log('Filters updated:', filters);

    // Example: Fetch new data from an API
    // fetch(`/api/data?country=${filters.country}&timeline=${filters.timeline}&department=${filters.department}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setMetrics(data.metrics);
    //     setCountryData(data.countryData);
    //     setTimelineData(data.timelineData);
    //   });

    // For demonstration, let's simulate data update
    setMetrics(prevMetrics => prevMetrics.map(metric => ({
      ...metric,
      value: (parseInt(metric.value.replace(',', '')) + Math.floor(Math.random() * 100)).toLocaleString()
    })));

    setCountryData(prevCountryData => prevCountryData.map(country => ({
      ...country,
      value: country.value + Math.floor(Math.random() * 50)
    })));

    setTimelineData(prevTimelineData => prevTimelineData.map(data => ({
      ...data,
      headcount: data.headcount + Math.floor(Math.random() * 50),
      newHires: data.newHires + Math.floor(Math.random() * 10),
      attrition: data.attrition + Math.floor(Math.random() * 5)
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Headcount by Country</h3>
          <BarChart data={countryData} />
        </div>

        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Timeline Trends</h3>
          <LineChart data={timelineData} />
        </div>
      </div>

      {/* Distribution Table */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Distribution</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Country</th>
                <th className="text-right py-3 px-4 text-gray-400">Headcount</th>
                <th className="text-right py-3 px-4 text-gray-400">New Hires</th>
                <th className="text-right py-3 px-4 text-gray-400">Attrition</th>
                <th className="text-right py-3 px-4 text-gray-400">Attrition Rate</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {countryData.map((country, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3 px-4 font-medium">{country.name}</td>
                  <td className="py-3 px-4 text-right">{country.value.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-green-400">{Math.floor(country.value * 0.08)}</td>
                  <td className="py-3 px-4 text-right text-red-400">{Math.floor(country.value * 0.03)}</td>
                  <td className="py-3 px-4 text-right">3.2%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PeopleDistribution;
