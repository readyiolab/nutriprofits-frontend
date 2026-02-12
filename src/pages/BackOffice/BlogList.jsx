import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";

const BlogList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch blogs
  const {
    data: blogsData,
    loading,
    error,
    refetch,
  } = useFetch("/api/blogs/my-blogs", {
    immediate: true,
    showToast: false,
  });

  const blogs = blogsData?.blogs || [];

  const filteredBlogs = useMemo(() => {
    if (!searchTerm.trim()) {
      return blogs;
    }
    const term = searchTerm.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(term) ||
        blog.author?.toLowerCase().includes(term) ||
        blog.status?.toLowerCase().includes(term)
    );
  }, [blogs, searchTerm]);

  // Delete blog
  const { fetchData: deleteBlog, loading: deleteLoading } = useFetch("", {
    method: "DELETE",
    immediate: false,
    showToast: true,
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = async (blogId) => {
    await deleteBlog(`/api/blogs/${blogId}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { variant: "default", className: "bg-green-100 text-green-800" },
      draft: { variant: "secondary", className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Badge variant={config.variant} className={config.className}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Failed to Load Blogs
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">
            Manage your blog content and articles
          </p>
        </div>
        <Button
          onClick={() => navigate("/backoffice/blog/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            All Blog Posts
          </CardTitle>
          <CardDescription>
            {blogsData?.count || 0} total blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No blogs found" : "No blog posts yet"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Create your first blog post to get started"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => navigate("/backoffice/blog/new")}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create New Post
                </Button>
              )}
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlogs.map((blog) => (
                    <TableRow key={blog.blog_id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            /{blog.slug}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(blog.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {blog.author || "Unknown"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(blog.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate(`/backoffice/blog/edit/${blog.blog_id}`)
                            }
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                disabled={deleteLoading}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete blog post?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete "{blog.title}" and remove
                                  it from your blog.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(blog.blog_id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogList;