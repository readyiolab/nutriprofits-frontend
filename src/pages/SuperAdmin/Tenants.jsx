import { useState, useEffect } from 'react';
import { Search, ExternalLink, ArrowLeft, Plus, Filter, Loader, AlertCircle, Check, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

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
    if (!confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this user?`)) {
      return;
    }

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
    if (!confirm('Are you sure you want to remove the custom domain?')) {
      return;
    }

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
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  // User Detail View (Full Screen)
  if (selectedUser) {
    return (
      <div className="min-h-screen bg-slate-50 ">
        <div >
          {/* Alert */}
          {alert && (
            <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
              {alert.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedUser(null);
              setShowDomainSetup(false);
            }}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedUser.name}</h1>
            <p className="text-slate-600">{selectedUser.email}</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Core user and store details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-500">Name</label>
                      <p className="text-slate-900 font-semibold mt-1">{selectedUser.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">Email</label>
                      <p className="text-slate-900 font-semibold mt-1 break-all">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">Store Name</label>
                      <p className="text-slate-900 font-semibold mt-1">{selectedUser.store_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">Subscription Plan</label>
                      <div className="mt-1">
                        <Badge variant="secondary" className="capitalize">
                          {selectedUser.subscription_plan}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Domain Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Domain Configuration</CardTitle>
                  <CardDescription>Active URLs and domain settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-500">Domain Type</label>
                    <p className="text-slate-900 font-semibold mt-1 capitalize">
                      {selectedUser.domain_type.replace('_', ' ')}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium text-slate-500 mb-2 block">Active URL</label>
                    <a
                      href={selectedUser.active_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {selectedUser.active_url}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {selectedUser.custom_domain && (
                    <>
                      <Separator />
                      <div>
                        <label className="text-sm font-medium text-slate-500 mb-2 block">Custom Domain</label>
                        <div className="space-y-3">
                          <p className="text-slate-900 font-semibold break-all">{selectedUser.custom_domain}</p>
                          <div className="flex items-center gap-3">
                            <Badge variant={selectedUser.custom_domain_status === 'verified' ? 'default' : 'secondary'}>
                              {selectedUser.custom_domain_status === 'verified' ? (
                                <>
                                  <Check className="w-3 h-3 mr-1" />
                                  Verified
                                </>
                              ) : (
                                <>
                                  <Loader className="w-3 h-3 mr-1 animate-spin" />
                                  Pending
                                </>
                              )}
                            </Badge>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeCustomDomain(selectedUser.backoffice_id)}
                            >
                              Remove Domain
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {!selectedUser.custom_domain && !showDomainSetup && (
                    <Button
                      onClick={() => setShowDomainSetup(true)}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Setup Custom Domain
                    </Button>
                  )}

                  {showDomainSetup && (
                    <div className="border-t pt-4 space-y-3">
                      <label className="text-sm font-medium text-slate-900">Enter Custom Domain</label>
                      <Input
                        type="text"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        placeholder="example.com"
                      />
                      <p className="text-sm text-slate-500">
                        Enter the domain you want to use for this store
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={setupCustomDomain}
                          disabled={domainLoading}
                          className="flex-1"
                        >
                          {domainLoading ? (
                            <>
                              <Loader className="w-4 h-4 mr-2 animate-spin" />
                              Setting up...
                            </>
                          ) : (
                            'Setup Domain'
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowDomainSetup(false);
                            setCustomDomain('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                  <CardDescription>Account creation and update history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-500">Created At</label>
                      <p className="text-slate-900 mt-1">{new Date(selectedUser.created_at).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500">Last Updated</label>
                      <p className="text-slate-900 mt-1">{new Date(selectedUser.updated_at).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Actions & Status */}
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-500 mb-2 block">Current Status</label>
                    <Badge 
                      variant={selectedUser.status === 'active' ? 'default' : 'secondary'}
                      className="text-sm"
                    >
                      {selectedUser.status === 'active' ? '● Active' : '● Inactive'}
                    </Badge>
                  </div>

                  <Button
                    variant={selectedUser.status === 'active' ? 'destructive' : 'default'}
                    className="w-full"
                    onClick={() => updateUserStatus(
                      selectedUser.backoffice_id,
                      selectedUser.status === 'active' ? 'inactive' : 'active'
                    )}
                  >
                    {selectedUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Backoffice ID</span>
                    <span className="text-sm font-mono font-semibold">{selectedUser.backoffice_id}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Plan</span>
                    <Badge variant="outline" className="capitalize">{selectedUser.subscription_plan}</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Domain Type</span>
                    <span className="text-sm font-semibold capitalize">{selectedUser.domain_type}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main List View
  return (
    <div className="min-h-screen bg-slate-50 ">
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
            <h1 className="text-xl font-bold text-slate-900 mb-2">Tenants Management</h1>
            <p className="text-slate-600">Manage all backoffice users and their stores</p>
          </div>
          <Button size="lg">
            <Plus className="w-4 h-4 mr-2" />
            New User
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
              className="pl-10"
            />
          </div>

          <Select value={filterStatus} onValueChange={(value) => {
            setFilterStatus(value);
            setCurrentPage(1);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Store</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Plan</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedUsers.map((user) => (
                    <tr key={user.backoffice_id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={`https://${user.subdomain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:underline text-sm"
                        >
                          {user.subdomain.substring(0, 30)}{user.subdomain.length > 30 ? '...' : ''}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="capitalize">
                          {user.subscription_plan}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status === 'active' ? '● Active' : '● Inactive'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          onClick={() => viewUserDetails(user.backoffice_id)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginatedUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600">No users found</p>
                {(searchTerm || filterStatus !== 'all') && (
                  <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of{' '}
              <span className="font-semibold">{filteredUsers.length}</span> users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tenants;