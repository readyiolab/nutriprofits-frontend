import { useState, useEffect } from 'react';
import { Search, ExternalLink, ArrowLeft, Plus, Filter, Loader, AlertCircle, Check, X } from 'lucide-react';
import api from '@/config/apiConfig';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Tenants = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDomainSetup, setShowDomainSetup] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [domainLoading, setDomainLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(null);
  
  // Confirmation Dialog State
  const [confirmConfig, setConfirmConfig] = useState({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
    variant: 'default'
  });

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  useEffect(() => {
    fetchBackofficeUsers();
  }, []);

  const fetchBackofficeUsers = async () => {
    try {
      const response = await api.get('/superadmin/backoffice-users');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showAlert('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (backofficeId) => {
    try {
      const response = await api.get(`/superadmin/backoffice-users/${backofficeId}`);
      setSelectedUser(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      showAlert('Failed to load user details', 'error');
    }
  };

  const updateUserStatus = async (backofficeId, newStatus) => {
    setConfirmConfig({
      open: true,
      title: `Confirm ${newStatus === 'active' ? 'Activation' : 'Deactivation'}`,
      description: `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this user account? This will affect their store's accessibility.`,
      variant: newStatus === 'active' ? 'default' : 'destructive',
      onConfirm: async () => {
        try {
          const response = await api.put(
            `/superadmin/backoffice-users/${backofficeId}/settings`,
            { status: newStatus }
          );

          if (response.data.success) {
            fetchBackofficeUsers();
            viewUserDetails(backofficeId);
            showAlert(`User status updated to ${newStatus}`, 'success');
          } else {
            showAlert('Failed to update status', 'error');
          }
        } catch (error) {
          console.error('Failed to update status:', error);
          showAlert('Error updating status', 'error');
        }
      }
    });
  };

  const setupCustomDomain = async () => {
    if (!customDomain.trim()) {
      showAlert('Please enter a domain', 'error');
      return;
    }

    setDomainLoading(true);
    try {
      const response = await api.post(
        `/superadmin/backoffice-users/${selectedUser.backoffice_id}/domain`,
        { custom_domain: customDomain.trim() }
      );

      const result = response.data;

      if (result.success) {
        showAlert('Custom domain setup initiated! Check user email for DNS instructions.', 'success');
        setShowDomainSetup(false);
        setCustomDomain('');
        viewUserDetails(selectedUser.backoffice_id);
      } else {
        showAlert(result.message || 'Failed to setup domain', 'error');
      }
    } catch (error) {
      console.error('Failed to setup domain:', error);
      showAlert('Error setting up domain', 'error');
    } finally {
      setDomainLoading(false);
    }
  };

  const removeCustomDomain = async (backofficeId) => {
    setConfirmConfig({
      open: true,
      title: "Remove Custom Domain",
      description: "Are you sure you want to remove this custom domain? The store will revert to its system subdomain.",
      variant: 'destructive',
      onConfirm: async () => {
        try {
          const response = await api.delete(
            `/superadmin/backoffice-users/${backofficeId}/domain`
          );

          if (response.data.success) {
            showAlert('Custom domain removed successfully', 'success');
            viewUserDetails(backofficeId);
            fetchBackofficeUsers();
          } else {
            showAlert('Failed to remove domain', 'error');
          }
        } catch (error) {
          console.error('Failed to remove domain:', error);
          showAlert('Error removing domain', 'error');
        }
      }
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (user.subdomain || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 animate-spin text-blue-600" />
          <p className="text-slate-600">Loading tenants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Alert */}
        {alert && (
          <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
            {alert.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Tenants Management</h1>
            <p className="text-slate-500 text-sm">Monitor and manage all storefront accounts</p>
          </div>
          <Button size="sm" className="shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Tenant
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by name, email, or subdomain..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-10 border-slate-200"
            />
          </div>

          <Select value={filterStatus} onValueChange={(value) => {
            setFilterStatus(value);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="h-10 border-slate-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active Accounts</SelectItem>
              <SelectItem value="inactive">Inactive Accounts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tenant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Store URL</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {paginatedUsers.map((user) => (
                    <tr key={user.backoffice_id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={user.active_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                        >
                          {user.subdomain.substring(0, 25)}{user.subdomain.length > 25 ? '...' : ''}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="capitalize text-[10px] h-5">
                          {user.subscription_plan}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-slate-300'}`} />
                          <span className="text-xs font-medium text-slate-600 capitalize">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => viewUserDetails(user.backoffice_id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginatedUsers.length === 0 && (
              <div className="text-center py-20 bg-white">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-4">
                  <Search className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-slate-900 font-medium">No tenants found</p>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search terms</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span>-
              <span className="font-semibold text-slate-900">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of 
              <span className="font-semibold text-slate-900">{filteredUsers.length}</span> results
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 border-slate-200"
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (currentPage > 3) pageNum = currentPage - 2 + i;
                  if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                }
                if (pageNum <= totalPages) {
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="h-8 w-8 p-0 border-slate-200"
                    >
                      {pageNum}
                    </Button>
                  );
                }
                return null;
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 border-slate-200"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Detail Sheet */}
        <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
          <SheetContent side="right" className="w-full sm:max-w-[600px] border-l p-0 overflow-y-auto bg-slate-50/50">
            {selectedUser && (
              <div className="flex flex-col h-full bg-transparent">
                {/* Header Section */}
                <SheetHeader className="p-8 pb-6 bg-white border-b sticky top-0 z-20 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <SheetTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {selectedUser.name}
                      </SheetTitle>
                      <SheetDescription className="text-slate-500 mt-1.5 text-[15px] font-medium">
                        {selectedUser.email}
                      </SheetDescription>
                    </div>
                    <Badge 
                      variant={selectedUser.status === 'active' ? 'default' : 'secondary'} 
                      className={`px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm ${selectedUser.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    >
                      {selectedUser.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant={selectedUser.status === 'active' ? 'destructive' : 'default'}
                      className={`flex-1 font-semibold shadow-sm ${selectedUser.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                      onClick={() => updateUserStatus(
                        selectedUser.backoffice_id,
                        selectedUser.status === 'active' ? 'inactive' : 'active'
                      )}
                    >
                      {selectedUser.status === 'active' ? 'Deactivate Access' : 'Activate Account'}
                    </Button>
                    <Button variant="outline" className="flex-1 font-semibold shadow-sm border-slate-200 hover:bg-slate-50" asChild>
                      <a href={selectedUser.active_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 text-slate-500" />
                        Visit Live Store
                      </a>
                    </Button>
                  </div>
                </SheetHeader>

                {/* Content Section */}
                <div className="p-8 pt-6">
                  <Tabs defaultValue="overview" className="space-y-8">
                    <TabsList className="bg-white/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-200/60 shadow-sm w-full flex">
                      <TabsTrigger value="overview" className="flex-1 rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium">Overview</TabsTrigger>
                      <TabsTrigger value="store" className="flex-1 rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium">Branding</TabsTrigger>
                      <TabsTrigger value="domain" className="flex-1 rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium">Domain</TabsTrigger>
                      <TabsTrigger value="support" className="flex-1 rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium">Contact</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6 mt-0">
                      <div className="grid grid-cols-2 gap-5">
                        <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-blue-50/50 to-white">
                          <CardContent className="p-5">
                            <p className="text-[11px] text-blue-600 font-bold uppercase tracking-widest mb-2">Total Products</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selectedUser.stats?.products || 0}</h3>
                          </CardContent>
                        </Card>
                        <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-purple-50/50 to-white">
                          <CardContent className="p-5">
                            <p className="text-[11px] text-purple-600 font-bold uppercase tracking-widest mb-2">Categories</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selectedUser.stats?.categories || 0}</h3>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="py-4 border-b bg-slate-50/50">
                          <CardTitle className="text-[13px] uppercase tracking-wider font-bold text-slate-600">Account Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-2 gap-y-6">
                            <div>
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Tenant ID</p>
                              <p className="font-mono text-sm font-semibold text-slate-700 bg-slate-100/50 p-1.5 rounded w-fit">{selectedUser.backoffice_id}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Date Joined</p>
                              <p className="text-sm font-semibold text-slate-800">{new Date(selectedUser.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="col-span-2 pt-2 border-t border-slate-100">
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">Active Subscription</p>
                              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg">
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                <span className="text-sm font-bold capitalize text-slate-800 tracking-wide">{selectedUser.subscription_plan} Plan</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="store" className="space-y-6 mt-0">
                      <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="py-4 border-b bg-slate-50/50">
                          <CardTitle className="text-[13px] uppercase tracking-wider font-bold text-slate-600">Store Branding</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-6 pb-6">
                            <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center border border-dashed border-slate-300 overflow-hidden shrink-0">
                              {selectedUser.branding?.logo_url ? (
                                <img src={selectedUser.branding.logo_url} alt="Logo" className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300" />
                              ) : (
                                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">No Logo</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Store Name</p>
                              <p className="text-xl font-bold text-slate-900 tracking-tight">{selectedUser.store_name}</p>
                            </div>
                          </div>
                          
                          <Separator className="bg-slate-100" />
                          
                          <div className="grid grid-cols-2 gap-6 pt-6">
                            <div>
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">Theme Color</p>
                              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 w-fit">
                                <div 
                                  className="w-6 h-6 rounded-md shadow-sm border border-slate-200" 
                                  style={{ backgroundColor: selectedUser.branding?.primary_color || '#3b82f6' }}
                                ></div>
                                <span className="font-mono text-xs font-bold text-slate-700 uppercase tracking-widest">
                                  {selectedUser.branding?.primary_color || '#3B82F6'}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">Store Template</p>
                              <Badge variant="outline" className="px-3 py-1.5 text-xs font-bold bg-slate-50 border-slate-200 text-slate-700">
                                Template ID: {selectedUser.template_id}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="domain" className="space-y-6 mt-0">
                      <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="py-4 border-b bg-slate-50/50">
                          <CardTitle className="text-[13px] uppercase tracking-wider font-bold text-slate-600">Connectivity</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                          <div>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">System Subdomain</p>
                            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl group hover:border-blue-200 transition-colors">
                              <p className="text-sm font-semibold text-slate-800">{selectedUser.subdomain}</p>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50" onClick={() => window.open(selectedUser.active_url, '_blank')}>
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Custom Domain</p>
                            {selectedUser.custom_domain ? (
                              <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between shadow-sm">
                                <div>
                                  <div className="flex items-center gap-3">
                                    <h4 className="text-base font-bold text-slate-900 tracking-tight">{selectedUser.custom_domain}</h4>
                                    <Badge variant={selectedUser.custom_domain_status === 'verified' ? 'default' : 'outline'} className={`lowercase h-5 px-2 py-0 ${selectedUser.custom_domain_status === 'verified' ? 'bg-green-500' : 'bg-amber-100 text-amber-700 border-amber-200 font-bold'}`}>
                                      {selectedUser.custom_domain_status}
                                    </Badge>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-100 font-semibold h-8" onClick={() => removeCustomDomain(selectedUser.backoffice_id)}>
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-center transition-all hover:bg-slate-50">
                                {!showDomainSetup ? (
                                  <div className="flex flex-col items-center justify-center space-y-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-1">
                                      <ExternalLink className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <p className="text-[13px] font-medium text-slate-600">Connect a custom domain to establish brand authority.</p>
                                    <Button variant="default" size="sm" className="h-9 mt-2 font-semibold shadow-sm bg-slate-800 hover:bg-slate-900" onClick={() => setShowDomainSetup(true)}>
                                      <Plus className="w-4 h-4 mr-1.5" />
                                      Add Custom Domain
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="text-left max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-200">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Enter Domain Name</label>
                                    <Input 
                                      placeholder="e.g. store.yourbrand.com" 
                                      value={customDomain} 
                                      onChange={(e) => setCustomDomain(e.target.value)} 
                                      className="h-10 text-sm border-slate-300 shadow-sm focus-visible:ring-blue-500 mb-4"
                                      autoFocus
                                    />
                                    <div className="flex gap-3">
                                      <Button className="flex-1 h-9 font-semibold shadow-sm" onClick={setupCustomDomain} disabled={domainLoading}>
                                        {domainLoading ? <Loader className="w-3.5 h-3.5 animate-spin mr-2" /> : <Check className="w-3.5 h-3.5 mr-2" />}
                                        Verify & Connect
                                      </Button>
                                      <Button variant="outline" className="flex-1 h-9 font-semibold" onClick={() => { setShowDomainSetup(false); setCustomDomain(''); }}>Cancel</Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="support" className="space-y-6 mt-0">
                      <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="py-4 border-b bg-slate-50/50">
                          <CardTitle className="text-[13px] uppercase tracking-wider font-bold text-slate-600">Support Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 gap-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-xl shrink-0 mt-0.5">
                                <AlertCircle className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Customer Support Email</p>
                                <p className="text-sm font-semibold text-slate-900">{selectedUser.contact?.email || selectedUser.email}</p>
                              </div>
                            </div>
                            <Separator className="bg-slate-100" />
                            <div className="flex items-start gap-4">
                              <div className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl shrink-0 mt-0.5">
                                <Plus className="w-4 h-4 text-purple-600 rotate-45" />
                              </div>
                              <div>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Business Phone Contact</p>
                                <p className="text-sm font-semibold text-slate-900">{selectedUser.contact?.phone || 'Not provided'}</p>
                              </div>
                            </div>
                            <Separator className="bg-slate-100" />
                            <div className="flex items-start gap-4">
                              <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl shrink-0 mt-0.5">
                                <Filter className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Registered Address</p>
                                <p className="text-sm font-semibold text-slate-900 leading-relaxed max-w-sm">
                                  {selectedUser.contact?.address || 'Mumbai, MH, India'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Global Confirmation Dialog */}
        <AlertDialog 
          open={confirmConfig.open} 
          onOpenChange={(open) => setConfirmConfig(prev => ({ ...prev, open }))}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmConfig.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {confirmConfig.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmConfig.onConfirm}
                className={confirmConfig.variant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Tenants;