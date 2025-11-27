// src/components/superadmin/Analytics.jsx
import { TrendingUp, Users, Activity } from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-xl font-bold text-gray-800 mb-8">Analytics Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Growth</h3>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">+24.8%</p>
          <p className="text-sm text-gray-600 mt-2">vs last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">8,429</p>
          <p className="text-sm text-gray-600 mt-2">Across all tenants</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">System Health</h3>
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">99.9%</p>
          <p className="text-sm text-gray-600 mt-2">Uptime this month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Charts & Reports</h2>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <p className="text-gray-500">Chart integration (Recharts / Chart.js) goes here</p>
        </div>
      </div>
    </div>
  );
}