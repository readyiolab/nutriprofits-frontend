import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, TrendingUp, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3001/api/backoffice/product-categories';

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both in parallel for speed
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/categories`, { credentials: 'include' }),
        ]);

        if (!productsRes.ok) throw new Error('Failed to load products');
        if (!categoriesRes.ok) throw new Error('Failed to load categories');

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        // Safely extract arrays
        const products = Array.isArray(productsData)
          ? productsData
          : productsData?.data || productsData?.products || [];

        const categories = Array.isArray(categoriesData)
          ? categoriesData
          : categoriesData?.data || categoriesData?.categories || [];

        setProductCount(products.length);
        setCategoryCount(categories.length);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      title: 'Total Products',
      value: productCount !== null ? productCount.toLocaleString() : '-',
      change: '+12.5%',
      trend: 'up',
      icon: <Package className="h-5 w-5 text-blue-600" />,
    },
    {
      title: 'Total Categories',
      value: categoryCount !== null ? categoryCount.toLocaleString() : '-',
      change: '+8.3%',
      trend: 'up',
      icon: <ShoppingCart className="h-5 w-5 text-green-600" />,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading dashboard stats...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error loading data</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;