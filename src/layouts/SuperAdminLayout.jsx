// src/layouts/SuperAdminLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  KeyRound,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Optional: Protect route
  // React.useEffect(() => {
  //   const token = localStorage.getItem('superadmin_token');
  //   if (!token) {
  //     navigate('/superadmin/login');
  //   }
  // }, [navigate]);

  const menuItems = [
    { id: '', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, exact: true },
    { id: 'tenants', label: 'Tenants', icon: <Users className="h-5 w-5" /> },
    { id: 'create-user', label: 'Create Tenant', icon: <UserPlus className="h-5 w-5" /> },
    { id: 'change-password', label: 'Change Password', icon: <KeyRound className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const isActive = (path, exact) => {
    const currentPath = location.pathname;
    const fullPath = `/superadmin/${path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/superadmin';
    
    if (exact) {
      return currentPath === fullPath || (path === '' && currentPath === '/superadmin');
    }
    return currentPath.startsWith(fullPath);
  };

  const handleLogout = () => {
    localStorage.removeItem('superadmin_token');
    navigate('/superadmin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 shadow-sm">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              
              <span className="text-xl font-medium text-gray-800 hidden sm:inline">SuperAdmin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline font-medium">Super Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.id, item.exact);
            const toPath = item.id === '' ? '/superadmin' : `/superadmin/${item.id}`;

            return (
              <Link
                key={item.id}
                to={toPath}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 lg:left-64">
      <div className="flex items-center justify-center h-full text-sm text-gray-500">
        © 2025 SuperAdmin Portal • Restricted Access Only
      </div>
    </footer>
    </div>
  );
};

export default SuperAdminLayout;