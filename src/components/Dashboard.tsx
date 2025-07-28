import React, { useState } from 'react';
import { Users, TrendingUp, Award, Filter, Calendar, Globe, Building } from 'lucide-react';
import PeopleDistribution from './PeopleDistribution';
import PromotionAnalysis from './PromotionAnalysis';
import TrendsSection from './TrendsSection';
import FilterPanel from './FilterPanel';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [activeSection, setActiveSection] = useState<'people' | 'promotion' | 'trends'>('people');
  const [filters, setFilters] = useState({
    country: 'all',
    timeline: '12m',
    department: 'all'
  });

  const sections = [
    { id: 'people', label: 'People Distribution', icon: Users },
    { id: 'promotion', label: 'Promotion Analysis', icon: Award },
    { id: 'trends', label: 'Trends', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Talent Sight
                </h1>
                <p className="text-gray-400 text-sm">Strategic People Planning Dashboard</p>
              </div>
            </div>
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex space-x-4 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'bg-gray-900/50 border border-gray-800 text-gray-400 hover:bg-gray-800/50 hover:border-gray-700'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="transition-all duration-500 ease-in-out">
          {activeSection === 'people' && <PeopleDistribution filters={filters} />}
          {activeSection === 'promotion' && <PromotionAnalysis filters={filters} />}
          {activeSection === 'trends' && <TrendsSection filters={filters} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
