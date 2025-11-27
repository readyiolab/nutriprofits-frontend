import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Info,
  MessageSquare,
  HelpCircle,
  Settings,
  Menu,
  X,
  LogOut,
  Palette ,
  Layout ,
  ChevronRight,
  Home,
  Section,
  KeyRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DomainVerificationProvider } from "@/contexts/DomainVerificationContext";
import DomainVerificationBanner from "@/components/DomainVerificationBanner";

const BackOfficeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const PRIMARY_COLOR = "#3B82F6";
  const SECONDARY_COLOR = "#1E293B";

const menuGroups = [
  {
    title: null,
    items: [
      { id: "", label: "Dashboard", icon: LayoutDashboard, exact: true }
    ],
  },
  {
    title: "Products",
    items: [
      { id: "product/page-content", label: "Page Content", icon: Section },
      { id: "products", label: "All Products", icon: Package },
    ],
  },
  {
    title: "Categories",
    items: [
      { id: "categories/page-content", label: "Page Content", icon: Section },
      { id: "categories", label: "All Categories", icon: FolderTree },
    ],
  },
  {
    title: "Pages",
    items: [
      { id: "about", label: "About Us", icon: Info },
      { id: "contact", label: "Contact", icon: MessageSquare },
      { id: "faqs", label: "FAQ's", icon: HelpCircle },
    ],
  },
  {
    title: "Site Settings",
    items: [
      { id: "site-branding", label: "Site Branding", icon: Palette },
      { id: "footer-content", label: "Footer Content", icon: Layout },
      { id: "settings", label: "Settings", icon: Settings },
      { id: "change-password", label: "Change Password", icon: KeyRound } // Better icon for password
    ],
  },
];

  const isActive = (path, exact) => {
    const currentPath = location.pathname;
    const fullPath = `/backoffice/${path}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/backoffice";

    if (exact) {
      return currentPath === fullPath || (path === "" && currentPath === "/backoffice");
    }
    return currentPath.startsWith(fullPath);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("backofficeId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");
    navigate("/backoffice/login");
  };

  return (
    <DomainVerificationProvider>
      <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "#F8FAFC" }}>
        {/* Domain Verification Banner */}
        <DomainVerificationBanner />
        
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
              style={{ color: "white" }}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: PRIMARY_COLOR }}>
                <Home className="h-5 w-5" style={{ color: "white" }} />
              </div>
              
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:opacity-80" style={{ color: "white" }}>
                  <Avatar className="h-9 w-9 border-2" style={{ borderColor: PRIMARY_COLOR }}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback style={{ backgroundColor: PRIMARY_COLOR, color: "white" }}>
                      AD
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
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ backgroundColor: SECONDARY_COLOR }}
        >
          <div className="flex flex-col h-full">
            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
              {menuGroups.map((group) => (
                <div key={group.title || "main"}>
                  {group.title && (
                    <h3 className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {group.title}
                    </h3>
                  )}
                  <div className="space-y-2">
                    {group.items.map((item) => {
                      const active = isActive(item.id, item.exact);
                      const toPath = item.id === "" ? "/backoffice" : `/backoffice/${item.id}`;
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.id}
                          to={toPath}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                            active
                              ? "text-white font-semibold shadow-lg scale-105"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                          style={{
                            backgroundColor: active ? PRIMARY_COLOR : "transparent",
                          }}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium truncate">
                            {item.label}
                          </span>
                          {active && <ChevronRight className="h-4 w-4 ml-auto" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            
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
        style={{ backgroundColor: SECONDARY_COLOR }}
      >
        <div className="flex items-center justify-center h-full px-4">
          <p className="text-xs md:text-sm text-gray-400">
            © 2025 BackOffice Portal • Restricted Access Only
          </p>
        </div>
      </footer>
      </div>
    </DomainVerificationProvider>
  );
};

export default BackOfficeLayout;