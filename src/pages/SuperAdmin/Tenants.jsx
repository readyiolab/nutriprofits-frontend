import { useState, useEffect } from 'react';
import { Search, ExternalLink, Eye, MoreVertical, X, Plus, Filter, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tenants = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [domainLoading, setDomainLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Color Scheme
  const PRIMARY = '#3B82F6'; // Blue
  const SECONDARY = '#1E293B'; // Dark Slate
  const SUCCESS = '#10B981';
  const WARNING = '#F59E0B';
  const ERROR = '#EF4444';

  useEffect(() => {
    fetchBackofficeUsers();
  }, []);

  const fetchBackofficeUsers = async () => {
    try {
      const token = localStorage.getItem('superadmin_token');
      const response = await fetch('http://localhost:3000/api/superadmin/backoffice-users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setUsers(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (backofficeId) => {
    try {
      const token = localStorage.getItem('superadmin_token');
      const response = await fetch(
        `http://localhost:3000/api/superadmin/backoffice-users/${backofficeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSelectedUser(result.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const updateUserStatus = async (backofficeId, newStatus) => {
    if (!confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this user?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('superadmin_token');
      const response = await fetch(
        `http://localhost:3000/api/superadmin/backoffice-users/${backofficeId}/settings`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (response.ok) {
        fetchBackofficeUsers();
        alert(`User status updated to ${newStatus}`);
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Error updating status');
    }
  };

  const setupCustomDomain = async () => {
    if (!customDomain.trim()) {
      alert('Please enter a domain');
      return;
    }

    setDomainLoading(true);
    try {
      const token = localStorage.getItem('superadmin_token');
      const response = await fetch(
        `http://localhost:3000/api/superadmin/backoffice-users/${selectedUser.backoffice_id}/domain`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ customDomain: customDomain.trim() })
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert('Custom domain setup initiated! Check user email for DNS instructions.');
        setShowDomainModal(false);
        setCustomDomain('');
        viewUserDetails(selectedUser.backoffice_id);
      } else {
        alert(result.message || 'Failed to setup domain');
      }
    } catch (error) {
      console.error('Failed to setup domain:', error);
      alert('Error setting up domain');
    } finally {
      setDomainLoading(false);
    }
  };

  const removeCustomDomain = async (backofficeId) => {
    if (!confirm('Are you sure you want to remove the custom domain?')) {
      return;
    }

    try {
      const token = localStorage.getItem('superadmin_token');
      const response = await fetch(
        `http://localhost:3000/api/superadmin/backoffice-users/${backofficeId}/domain`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        alert('Custom domain removed successfully');
        viewUserDetails(backofficeId);
        fetchBackofficeUsers();
      } else {
        alert('Failed to remove domain');
      }
    } catch (error) {
      console.error('Failed to remove domain:', error);
    }
  };

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StatusBadge = ({ status }) => (
    <span 
      className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{
        backgroundColor: status === 'active' ? '#D1FAE5' : '#FEE2E2',
        color: status === 'active' ? '#065F46' : '#7F1D1D'
      }}
    >
      {status === 'active' ? '● Active' : '● Inactive'}
    </span>
  );

  const PlanBadge = ({ plan }) => (
    <span 
      className="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={{
        backgroundColor: `${PRIMARY}15`,
        color: PRIMARY
      }}
    >
      {plan.charAt(0).toUpperCase() + plan.slice(1)}
    </span>
  );

  // User Details Modal
  const UserDetailsModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div 
          className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden"
          style={{ borderTop: `4px solid ${PRIMARY}` }}
        >
          {/* Modal Header */}
          <div className="p-4 md:p-6 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold" style={{ color: SECONDARY }}>
              User Details
            </h2>
            <button 
              onClick={() => setShowModal(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 md:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</p>
                <p className="text-gray-900 font-semibold mt-2 break-words">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-gray-900 font-semibold mt-2 break-all">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Store Name</p>
                <p className="text-gray-900 font-semibold mt-2 break-words">{selectedUser.store_name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</p>
                <div className="mt-2">
                  <StatusBadge status={selectedUser.status} />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Domain Type</p>
                <p className="text-gray-900 font-semibold mt-2 capitalize">{selectedUser.domain_type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subscription Plan</p>
                <div className="mt-2">
                  <PlanBadge plan={selectedUser.subscription_plan} />
                </div>
              </div>
            </div>

            {/* Active URL */}
            <div className="border-t pt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Active URL</p>
              <a
                href={selectedUser.active_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 break-all"
              >
                <span className="text-sm">{selectedUser.active_url}</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>

            {/* Custom Domain Section */}
            {selectedUser.custom_domain && (
              <div className="border-t pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Custom Domain</p>
                <p className="text-gray-900 font-semibold mb-2 break-all">{selectedUser.custom_domain}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    selectedUser.custom_domain_status === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedUser.custom_domain_status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                  </span>
                  <button 
                    onClick={() => removeCustomDomain(selectedUser.backoffice_id)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline"
                  >
                    Remove Domain
                  </button>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div>
                <p className="font-medium text-gray-500 uppercase tracking-wide">Created At</p>
                <p className="text-gray-900 mt-1">{new Date(selectedUser.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500 uppercase tracking-wide">Updated At</p>
                <p className="text-gray-900 mt-1">{new Date(selectedUser.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 md:p-6 border-t flex flex-col md:flex-row gap-2 md:gap-3">
            {!selectedUser.custom_domain && (
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowDomainModal(true);
                }}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-white transition-all text-sm md:text-base hover:shadow-lg"
                style={{ backgroundColor: PRIMARY }}
              >
                Setup Custom Domain
              </button>
            )}
            <button
              onClick={() => updateUserStatus(
                selectedUser.backoffice_id,
                selectedUser.status === 'active' ? 'inactive' : 'active'
              )}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-white transition-all text-sm md:text-base hover:shadow-lg"
              style={{ 
                backgroundColor: selectedUser.status === 'active' ? ERROR : SUCCESS
              }}
            >
              {selectedUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Domain Setup Modal
  const DomainSetupModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-xl w-full max-w-md shadow-2xl"
        style={{ borderTop: `4px solid ${PRIMARY}` }}
      >
        <div className="p-4 md:p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold" style={{ color: SECONDARY }}>
            Setup Custom Domain
          </h2>
          <button 
            onClick={() => {
              setShowDomainModal(false);
              setCustomDomain('');
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          <div>
            <label className="block text-sm md:text-base font-semibold mb-2" style={{ color: SECONDARY }}>
              Custom Domain
            </label>
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="example.com"
              className="w-full px-3 md:px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm md:text-base"
            />
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Enter the domain you want to use for this store
            </p>
          </div>

          <button
            onClick={setupCustomDomain}
            disabled={domainLoading}
            className="w-full px-4 py-2.5 md:py-3 rounded-lg text-white font-semibold transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: PRIMARY }}
          >
            {domainLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Setting up...
              </span>
            ) : (
              'Setup Domain'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="flex flex-col items-center gap-4">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-4"
            style={{ 
              borderColor: `${PRIMARY}30`,
              borderTopColor: PRIMARY
            }}
          ></div>
          <p className="text-gray-600 text-sm md:text-base">Loading tenants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 md:p-6 lg:p-8" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: SECONDARY }}>
              Tenants Management
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Manage all backoffice users and their stores
            </p>
          </div>
          <button
            onClick={() => navigate('/superadmin/create-user')}
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg text-white font-semibold transition-all text-sm md:text-base hover:shadow-lg active:scale-95 w-full md:w-auto"
            style={{ backgroundColor: PRIMARY }}
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span>New User</span>
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or subdomain..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* Filter Status */}
          <div className="relative">
            <Filter className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm md:text-base appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Users</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: `${PRIMARY}08` }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Store</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.backoffice_id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={`https://${user.subdomain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1.5 text-sm break-all"
                      >
                        <span>{user.subdomain.substring(0, 25)}{user.subdomain.length > 25 ? '...' : ''}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <PlanBadge plan={user.subscription_plan} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => viewUserDetails(user.backoffice_id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all text-sm hover:shadow-lg"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <div key={user.backoffice_id} className="p-4 space-y-3 hover:bg-gray-50 transition">
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs space-y-1">
                    <p className="text-gray-500 font-medium">Store:</p>
                    <a 
                      href={`https://${user.subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {user.subdomain.substring(0, 15)}{user.subdomain.length > 15 ? '...' : ''}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="text-gray-500 font-medium">Plan:</p>
                    <PlanBadge plan={user.subscription_plan} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <StatusBadge status={user.status} />
                  <button
                    onClick={() => viewUserDetails(user.backoffice_id)}
                    className="px-3 py-1.5 rounded-lg font-semibold text-white text-xs transition-all"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {paginatedUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-sm md:text-base">No users found</p>
              {searchTerm || filterStatus !== 'all' && (
                <p className="text-gray-500 text-xs md:text-sm mt-2">Try adjusting your search or filters</p>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-semibold">{filteredUsers.length}</span> users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? 'text-white'
                        : 'border-2 border-gray-200 hover:border-blue-500'
                    }`}
                    style={currentPage === page ? { backgroundColor: PRIMARY } : {}}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && <UserDetailsModal />}
      {showDomainModal && <DomainSetupModal />}
    </div>
  );
};

export default Tenants;