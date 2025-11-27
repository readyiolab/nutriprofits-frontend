import { useState, useEffect } from 'react';
import { Users, Store, TrendingUp, DollarSign, Activity, ArrowUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [error, setError] = useState(null);

  // Color Scheme
  const PRIMARY = '#3B82F6'; // Blue
  const SECONDARY = '#1E293B'; // Dark Slate

  useEffect(() => {
    fetchDashboardData();
  }, []);



 const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/superadmin/backoffice-users', {
        method: 'GET',
        credentials: 'include', // ✅ Important: Include cookies in request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        // Unauthorized - let Protected Route handle it
        // Clear localStorage so Protected Route can catch it
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('superadminId');
        localStorage.removeItem('superadmin_user');
        localStorage.removeItem('userRole');
        setError('Session expired. Please login again.');
        return;
      }

      if (response.ok) {
        const result = await response.json();
        const users = result.data || [];
        
        // Calculate stats
        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(u => u.status === 'active').length,
        });

        // Get recent 5 users
        setRecentUsers(users.slice(0, 5));
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, change, gradientFrom, gradientTo }) => (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-t-4"
      style={{ borderColor: gradientFrom }}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-2" style={{ color: SECONDARY }}>
              {typeof value === 'number' && label.includes('Revenue') ? `$${value}` : value}
            </h3>
          </div>
          <div 
            className="p-3 md:p-4 rounded-lg"
            style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>

        {change !== undefined && (
          <div className="flex items-center gap-1 text-xs md:text-sm font-semibold text-green-600">
            <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
            <span>{change}% this month</span>
          </div>
        )}
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => (
    <span 
      className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{
        backgroundColor: status === 'active' ? '#D1FAE5' : '#FEE2E2',
        color: status === 'active' ? '#065F46' : '#7F1D1D'
      }}
    >
      {status === 'active' ? '● Active' : '● Inactive'}
    </span>
  );

  const PlanBadge = ({ plan }) => (
    <span 
      className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap capitalize"
      style={{
        backgroundColor: `${PRIMARY}15`,
        color: PRIMARY
      }}
    >
      {plan}
    </span>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="flex flex-col items-center gap-4">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-4"
            style={{ 
              borderColor: `${PRIMARY}30`,
              borderTopColor: PRIMARY
            }}
          ></div>
          <p className="text-gray-600 text-sm md:text-base">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 md:p-6 lg:p-8" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2" style={{ color: SECONDARY }}>
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Welcome back! Here's your overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers}
            
           
          />
          <StatCard
            icon={Activity}
            label="Active Users"
            value={stats.activeUsers}
            
          />
          <StatCard
            icon={Store}
            label="Total Stores"
            value={stats.totalUsers}
           
          />
        
        </div>

        {/* Recent Users Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Section Header */}
          <div 
            className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200"
            style={{ backgroundColor: `${PRIMARY}08` }}
          >
            <h2 className="text-lg md:text-xl font-semibold" style={{ color: SECONDARY }}>
              Recent Users
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">Latest backoffice users created</p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: `${PRIMARY}05` }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Store</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.backoffice_id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.store_name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <PlanBadge plan={user.subscription_plan} />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={user.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <div key={user.backoffice_id} className="p-4 space-y-3 hover:bg-gray-50 transition">
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Store</p>
                    <p className="text-gray-900 font-medium">{user.store_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Plan</p>
                    <PlanBadge plan={user.subscription_plan} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <StatusBadge status={user.status} />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {recentUsers.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <Users className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-sm md:text-base">No users yet</p>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;