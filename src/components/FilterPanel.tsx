import React from 'react';
import { Filter, Calendar, Globe, Building } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    country: string;
    timeline: string;
    department: string;
  };
  setFilters: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const countries = ['all', 'US', 'UK', 'India', 'Germany', 'Canada', 'Australia'];
  const timelines = ['3m', '6m', '12m', '24m'];
  const departments = ['all', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 text-gray-400">
        <Filter className="w-4 h-4" />
        <span className="text-sm">Filters:</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Globe className="w-4 h-4 text-cyan-400" />
        <select
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        >
          {countries.map(country => (
            <option key={country} value={country}>
              {country === 'all' ? 'All Countries' : country}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-green-400" />
        <select
          value={filters.timeline}
          onChange={(e) => setFilters({ ...filters, timeline: e.target.value })}
          className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
        >
          {timelines.map(timeline => (
            <option key={timeline} value={timeline}>
              {timeline.replace('m', ' months')}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Building className="w-4 h-4 text-purple-400" />
        <select
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept === 'all' ? 'All Departments' : dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;