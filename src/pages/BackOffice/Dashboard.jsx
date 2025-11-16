import React from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingCart className="h-5 w-5 text-green-600" />,
    },
    {
      title: 'Total Customers',
      value: '8,462',
      change: '+23.1%',
      trend: 'up',
      icon: <Users className="h-5 w-5 text-purple-600" />,
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '-4.3%',
      trend: 'down',
      icon: <DollarSign className="h-5 w-5 text-orange-600" />,
    },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', status: 'Completed', amount: '$99.99' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch', status: 'Processing', amount: '$299.99' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Laptop Backpack', status: 'Pending', amount: '$49.99' },
    { id: '#ORD-004', customer: 'Sarah Williams', product: 'Desk Lamp', status: 'Completed', amount: '$39.99' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Running Shoes', status: 'Shipped', amount: '$129.99' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: '$24,497', stock: 156 },
    { name: 'Smart Watch', sales: 189, revenue: '$56,681', stock: 89 },
    { name: 'Laptop Backpack', sales: 156, revenue: '$7,794', stock: 234 },
    { name: 'Running Shoes', sales: 134, revenue: '$17,413', stock: 67 },
  ];

  const categories = [
    { name: 'Electronics', count: 450, color: 'bg-blue-500' },
    { name: 'Fashion', count: 680, color: 'bg-pink-500' },
    { name: 'Home & Living', count: 320, color: 'bg-green-500' },
    { name: 'Sports', count: 290, color: 'bg-orange-500' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-700',
      Processing: 'bg-blue-100 text-blue-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Shipped: 'bg-purple-100 text-purple-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

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
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.count} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${category.color} h-2 rounded-full`}
                      style={{ width: `${(category.count / 680) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products this month</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sales</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4">{product.sales}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">{product.revenue}</td>
                    <td className="py-3 px-4">
                      <Badge variant={product.stock < 100 ? 'destructive' : 'secondary'}>
                        {product.stock}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;