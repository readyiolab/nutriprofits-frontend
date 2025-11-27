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
  ChevronRight,
  Home,
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

  const PRIMARY_COLOR = '#3B82F6';
  const SECONDARY_COLOR = '#1E293B';

  const menuItems = [
    { id: '', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'create-user', label: 'Create Tenant', icon: UserPlus },
    { id: 'change-password', label: 'Change Password', icon: KeyRound },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path, exact) => {
    const currentPath = location.pathname;
    const fullPath = `/superadmin/${path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/superadmin';
    
    if (exact) {
      return currentPath === fullPath || (path === '' && currentPath === '/superadmin');
    }
    return currentPath.startsWith(fullPath);
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear cookie on backend
      const response = await fetch('http://localhost:3001/api/superadmin/logout', {
        method: 'POST',
        credentials: 'include', // Important: Send cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem('superadmin_user');
        localStorage.removeItem('superadminId');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        
        console.log('✅ Logged out successfully');
        // Redirect to login
        navigate('/superadmin/login');
      } else {
        console.error('Logout failed');
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout error. Please try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top Header */}
      <header 
        className="h-16 z-50 shadow-sm border-b flex-shrink-0"
        style={{ backgroundColor: SECONDARY_COLOR, borderColor: PRIMARY_COLOR }}
      >
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden hover:opacity-80"
              style={{ color: 'white' }}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center gap-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <Home className="h-5 w-5" style={{ color: 'white' }} />
              </div>
              
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 hover:opacity-80"
                  style={{ color: 'white' }}
                >
                  <Avatar className="h-9 w-9 border-2" style={{ borderColor: PRIMARY_COLOR }}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}>
                      SA
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline font-medium text-sm">Admin</span>
                  <ChevronRight className="h-4 w-4 hidden md:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
               
                
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-64 z-40 flex-shrink-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative fixed inset-y-0 left-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ backgroundColor: SECONDARY_COLOR }}
        >
          <div className="flex flex-col h-full">
            <nav className="flex-1 p-3 md:p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const active = isActive(item.id, item.exact);
                const toPath = item.id === '' ? '/superadmin' : `/superadmin/${item.id}`;
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.id}
                    to={toPath}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-all duration-200 group ${
                      active
                        ? 'text-white font-semibold shadow-lg scale-105'
                        : 'text-gray-400 hover:text-white hover:bg-opacity-10'
                    }`}
                    style={{
                      backgroundColor: active ? PRIMARY_COLOR : 'transparent',
                    }}
                  >
                    <IconComponent className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                    {active && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div 
              className="p-3 md:p-4 border-t"
              style={{ borderColor: PRIMARY_COLOR, opacity: 0.8 }}
            >
              <p className="text-xs text-gray-400 text-center truncate">
                © 2025 SuperAdmin
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer 
        className="h-14 border-t z-20 flex-shrink-0"
        style={{ 
          backgroundColor: SECONDARY_COLOR, 
          borderColor: PRIMARY_COLOR
        }}
      >
        <div className="flex items-center justify-center h-full px-4">
          <p className="text-xs md:text-sm text-gray-400">
            © 2025 SuperAdmin Portal • Restricted Access Only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SuperAdminLayout;