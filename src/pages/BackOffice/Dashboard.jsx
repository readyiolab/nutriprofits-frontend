import React, { useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Products',
      value: '2,543',
      change: '+12.5%',
      trend: 'up',
      icon: <Package className="h-5 w-5 text-blue-600" />,
    },
    {
      title: 'Total Categories',
      value: '1,234',
      change: '+8.3%',
      trend: 'up',
      icon: <ShoppingCart className="h-5 w-5 text-green-600" />,
    },
    
    
    
  ];

  const [categories,setCategories] = useState(0)
  const [product,setProduct] =useState(0)


  const API_BASE_URL = "http://localhost:3001/api/backoffice/product-categories";

 

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
            
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              
            </CardContent>
          </Card>
        ))}
      </div>

      

      
    </div>
  );
};

export default Dashboard;