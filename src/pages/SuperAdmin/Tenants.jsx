import { useState, useEffect } from 'react';
import { Search, ExternalLink, ArrowLeft, Plus, Filter, Loader, AlertCircle, Check, X } from 'lucide-react';
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
      const response = await fetch('http://localhost:3001/api/superadmin/backoffice-users', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const result = await response.json();
        setUsers(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showAlert('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (backofficeId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/superadmin/backoffice-users/${backofficeId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSelectedUser(result.data);
      }
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
          const response = await fetch(
            `http://localhost:3001/api/superadmin/backoffice-users/${backofficeId}/settings`,
            {
              method: 'PUT',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
            }
          );

          if (response.ok) {
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
      const response = await fetch(
        `http://localhost:3001/api/superadmin/backoffice-users/${selectedUser.backoffice_id}/domain`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ custom_domain: customDomain.trim() })
        }
      );

      const result = await response.json();

      if (response.ok) {
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
          const response = await fetch(
            `http://localhost:3001/api/superadmin/backoffice-users/${backofficeId}/domain`,
            {
              method: 'DELETE',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' }
            }
          );

          if (response.ok) {
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
          <SheetContent side="right" className="w-full sm:max-w-md border-l p-0 overflow-y-auto">
            {selectedUser && (
              <div className="flex flex-col h-full bg-slate-50/30">
                <SheetHeader className="p-6 bg-white border-b sticky top-0 z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <SheetTitle className="text-xl font-bold">{selectedUser.name}</SheetTitle>
                      <SheetDescription className="text-slate-500 mt-0.5">{selectedUser.email}</SheetDescription>
                    </div>
                    <Badge variant={selectedUser.status === 'active' ? 'default' : 'secondary'} className="px-3">
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant={selectedUser.status === 'active' ? 'destructive' : 'default'}
                      size="sm"
                      className="h-8 px-4"
                      onClick={() => updateUserStatus(
                        selectedUser.backoffice_id,
                        selectedUser.status === 'active' ? 'inactive' : 'active'
                      )}
                    >
                      {selectedUser.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-4" asChild>
                      <a href={selectedUser.active_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-2" />
                        Visit Store
                      </a>
                    </Button>
                  </div>
                </SheetHeader>

                <div className="p-6">
                  <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-slate-100/50 p-1 rounded-lg border w-full">
                      <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                      <TabsTrigger value="store" className="flex-1">Branding</TabsTrigger>
                      <TabsTrigger value="domain" className="flex-1">Domain</TabsTrigger>
                      <TabsTrigger value="support" className="flex-1">Contact</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border-none shadow-sm bg-blue-50/50">
                          <CardContent className="pt-4 p-4">
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Products</p>
                            <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedUser.stats?.products || 0}</h3>
                          </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm bg-purple-50/50">
                          <CardContent className="pt-4 p-4">
                            <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">Categories</p>
                            <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedUser.stats?.categories || 0}</h3>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="border shadow-none">
                        <CardHeader className="pb-3 border-b bg-slate-50/50">
                          <CardTitle className="text-sm">Account Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-y-4 pt-4">
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Backoffice ID</p>
                            <p className="text-sm font-semibold text-slate-900">{selectedUser.backoffice_id}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Created At</p>
                            <p className="text-sm font-semibold text-slate-900">{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Subscription Plan</p>
                            <div className="mt-1">
                              <Badge variant="outline" className="capitalize">{selectedUser.subscription_plan} Plan</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="store" className="space-y-4">
                      <Card className="border shadow-none">
                        <CardContent className="p-6 space-y-6">
                          <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-dashed border-slate-200 overflow-hidden shadow-inner">
                              {selectedUser.branding?.logo_url ? (
                                <img src={selectedUser.branding.logo_url} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
                              ) : (
                                <Plus className="w-6 h-6 text-slate-300" />
                              )}
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] text-slate-400 font-bold uppercase">Store Name</label>
                              <p className="text-lg font-bold text-slate-900">{selectedUser.store_name}</p>
                            </div>
                          </div>
                          <Separator className="opacity-50" />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Primary Color</p>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg shadow-sm border border-white" style={{ backgroundColor: selectedUser.branding?.primary_color || '#3b82f6' }}></div>
                                <span className="font-mono text-sm font-medium">{selectedUser.branding?.primary_color || '#3b82f6'}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Active Template</p>
                              <Badge variant="outline">Template {selectedUser.template_id}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="domain" className="space-y-4">
                      <Card className="border shadow-none">
                        <CardHeader className="pb-3 border-b bg-slate-50/50">
                          <CardTitle className="text-sm">Connectivity</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">System Subdomain</p>
                              <p className="text-sm font-medium mt-0.5">{selectedUser.subdomain}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(selectedUser.active_url, '_blank')}>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          </div>

                          {selectedUser.custom_domain ? (
                            <div className="p-4 rounded-lg bg-blue-50/30 border border-blue-100 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">Custom Domain</p>
                                  <h4 className="text-md font-bold text-slate-900 mt-1">{selectedUser.custom_domain}</h4>
                                </div>
                                <Badge variant={selectedUser.custom_domain_status === 'verified' ? 'default' : 'secondary'} className="text-[10px] h-5">
                                  {selectedUser.custom_domain_status}
                                </Badge>
                              </div>
                              <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => removeCustomDomain(selectedUser.backoffice_id)}>
                                Remove Custom Domain
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center py-6 border-2 border-dashed rounded-xl bg-white">
                              {!showDomainSetup ? (
                                <div className="space-y-3">
                                  <p className="text-xs text-slate-500">Enable brand authority with a custom domain</p>
                                  <Button variant="secondary" size="sm" className="h-8" onClick={() => setShowDomainSetup(true)}>
                                    <Plus className="w-3.5 h-3.5 mr-2" />
                                    Setup Domain
                                  </Button>
                                </div>
                              ) : (
                                <div className="px-4 space-y-3 text-left">
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-semibold">Enter domain name</label>
                                    <Input 
                                      placeholder="store.yourdomain.com" 
                                      value={customDomain} 
                                      onChange={(e) => setCustomDomain(e.target.value)} 
                                      className="h-9 text-sm"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button className="flex-1 h-8 text-xs" onClick={setupCustomDomain} disabled={domainLoading}>
                                      {domainLoading ? <Loader className="w-3 h-3 animate-spin mr-2" /> : 'Confirm'}
                                    </Button>
                                    <Button variant="ghost" className="h-8 text-xs" onClick={() => setShowDomainSetup(false)}>Cancel</Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="support" className="space-y-4">
                      <Card className="border shadow-none">
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <div className="bg-slate-100 p-2.5 rounded-lg h-fit">
                                <AlertCircle className="w-4 h-4 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Support Email</p>
                                <p className="text-sm font-semibold text-slate-900 mt-1">{selectedUser.contact?.email || selectedUser.email}</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="bg-slate-100 p-2.5 rounded-lg h-fit">
                                <Plus className="w-4 h-4 text-slate-600 rotate-45" />
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phone Number</p>
                                <p className="text-sm font-semibold text-slate-900 mt-1">{selectedUser.contact?.phone || 'Not provided'}</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="bg-slate-100 p-2.5 rounded-lg h-fit">
                                <Filter className="w-4 h-4 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Business Address</p>
                                <p className="text-sm font-semibold text-slate-900 mt-1 leading-relaxed">
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