// src/components/superadmin/Dashboard.jsx
import { Users, Building2, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">SuperAdmin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tenants</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">142</p>
             
            </div>
            
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tenants</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">138</p>
           
            </div>
            
          </div>
        </div>

        

        
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">Activity log coming soon...</p>
      </div>
    </div>
  );
}