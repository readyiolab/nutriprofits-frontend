import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  FileText,
  Upload,
  Loader,
  CheckCircle,
  AlertCircle,
  Download,
  X,
  Calendar,
  Users,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE_URL = 'http://localhost:3001/api/backoffice-training';

  // Fetch all trainings
  const fetchTrainings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/trainings`, {
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        setTrainings(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch trainings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (25MB)
      if (file.size > 25 * 1024 * 1024) {
        setErrors({ file: 'File size must be less than 25MB' });
        return;
      }
      setSelectedFile(file);
      setErrors({ ...errors, file: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (selectedFile) {
      formDataToSend.append('document', selectedFile);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainings`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Training created successfully!');
        setShowCreateDialog(false);
        resetForm();
        fetchTrainings();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(result.message || 'Failed to create training');
      }
    } catch (error) {
      console.error('Failed to create training:', error);
      alert('Error creating training');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (selectedFile) {
      formDataToSend.append('document', selectedFile);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainings/${selectedTraining.training_id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Training updated successfully!');
        setShowEditDialog(false);
        resetForm();
        fetchTrainings();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(result.message || 'Failed to update training');
      }
    } catch (error) {
      console.error('Failed to update training:', error);
      alert('Error updating training');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (trainingId) => {
    if (!confirm('Are you sure you want to delete this training?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/trainings/${trainingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Training deleted successfully!');
        fetchTrainings();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(result.message || 'Failed to delete training');
      }
    } catch (error) {
      console.error('Failed to delete training:', error);
      alert('Error deleting training');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (training) => {
    setSelectedTraining(training);
    setFormData({
      title: training.title,
      description: training.description,
    });
    setShowEditDialog(true);
  };

  const openViewDialog = (training) => {
    setSelectedTraining(training);
    setShowViewDialog(true);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '' });
    setSelectedFile(null);
    setErrors({});
    setSelectedTraining(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileIcon = (type) => {
    if (!type) return <FileText className="w-4 h-4" />;
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('image')) return '🖼️';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-3">
                
                Training Management
              </h1>
              <p className="text-slate-600">
                Create and manage training materials for all backoffice users
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setShowCreateDialog(true)}
              className="bg-blue-500 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Training
            </Button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Trainings</p>
                  <p className="text-3xl font-bold text-slate-900">{trainings.length}</p>
                </div>
                <BookOpen className="w-10 h-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Active Trainings</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {trainings.filter(t => t.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">With Documents</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {trainings.filter(t => t.document_url).length}
                  </p>
                </div>
                <FileText className="w-10 h-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trainings List */}
        <Card>
          <CardHeader>
            <CardTitle>All Training Materials</CardTitle>
            <CardDescription>
              Manage training content visible to all backoffice users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : trainings.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg mb-2">No training materials yet</p>
                <p className="text-slate-400 text-sm mb-4">
                  Create your first training to get started
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Training
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainings.map((training) => (
                    <TableRow key={training.training_id}>
                      <TableCell className="font-medium">
                        {training.title}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {training.description}
                      </TableCell>
                      <TableCell>
                        {training.document_url ? (
                          <div className="flex items-center gap-2">
                            <span>{getFileIcon(training.document_type)}</span>
                            <span className="text-sm text-slate-600 truncate max-w-[150px]">
                              {training.document_name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">No document</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(training.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={training.status === 'active' ? 'default' : 'secondary'}
                          className={training.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {training.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewDialog(training)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(training)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(training.training_id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Create New Training
              </DialogTitle>
              <DialogDescription>
                Add training materials that will be visible to all backoffice users
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Sales Training Module 1"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe the training content..."
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document">
                    Document (Optional)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="document"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.txt,.csv,.zip"
                    />
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Selected: {selectedFile.name}
                    </p>
                  )}
                  {errors.file && (
                    <p className="text-sm text-red-500">{errors.file}</p>
                  )}
                  <p className="text-xs text-slate-500">
                    Supported: PDF, Word, Excel, PowerPoint, Images (Max 25MB)
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateDialog(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Training'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                Edit Training
              </DialogTitle>
              <DialogDescription>
                Update training material information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                {selectedTraining?.document_url && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-900">
                      Current document: {selectedTraining.document_name}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="edit-document">
                    Replace Document (Optional)
                  </Label>
                  <Input
                    id="edit-document"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.txt,.csv,.zip"
                  />
                  {selectedFile && (
                    <p className="text-sm text-green-600">
                      New file: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditDialog(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Training'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Training Details
              </DialogTitle>
            </DialogHeader>
            {selectedTraining && (
              <div className="space-y-4 py-4">
                <div>
                  <Label className="text-slate-500">Title</Label>
                  <p className="text-lg font-semibold mt-1">{selectedTraining.title}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-slate-500">Description</Label>
                  <p className="mt-1 whitespace-pre-wrap">{selectedTraining.description}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-slate-500">Document</Label>
                  {selectedTraining.document_url ? (
                    <div className="mt-2 p-4 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getFileIcon(selectedTraining.document_type)}</div>
                        <div>
                          <p className="font-medium">{selectedTraining.document_name}</p>
                          <p className="text-sm text-slate-500">{selectedTraining.document_type}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(selectedTraining.document_url, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ) : (
                    <p className="text-slate-400 mt-1">No document attached</p>
                  )}
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-500">Created</Label>
                    <p className="mt-1">{formatDate(selectedTraining.created_at)}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500">Status</Label>
                    <div className="mt-1">
                      <Badge variant={selectedTraining.status === 'active' ? 'default' : 'secondary'}>
                        {selectedTraining.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TrainingManagement;