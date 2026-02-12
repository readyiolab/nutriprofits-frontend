import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Save,
  ArrowLeft,
  FileText,
  User,
  Globe,
  Link,
  Image,
  Eye,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Code,
  Link2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks/useFetch";
import { useForm } from "@/hooks/useForm";
import { toast } from "sonner";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [generatedSlug, setGeneratedSlug] = useState("");
  const editorRef = useRef(null);
  const [editorReady, setEditorReady] = useState(false);

  // Rich text editor exec command
  const execCmd = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Sync content
    if (editorRef.current) {
      handleChange("content", editorRef.current.innerHTML);
    }
  }, []);

  // Fetch existing blog for editing
  const {
    data: blogData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch(
    isEditing ? `/api/blogs/${id}` : null,
    {
      immediate: isEditing,
      showToast: false,
    }
  );

  // Form initial state
  const initialState = useMemo(
    () => ({
      title: "",
      slug: "",
      content: "",
      image_url: "",
      author: "",
      meta_title: "",
      meta_description: "",
      status: "draft",
    }),
    []
  );

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/blogs/${id}` : `/api/blogs`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...formData,
        slug: formData.slug || generatedSlug,
      }),
    });

    const result = await response.json();

    if (result.success) {
      navigate("/backoffice/blog");
      return result;
    } else {
      throw new Error(result.message || "Failed to save blog");
    }
  };

  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit: onSubmit,
    loading,
  } = useForm(initialState, handleFormSubmit, {
    showToast: true,
    onSuccess: () => {
      toast.success(
        isEditing ? "Blog updated successfully!" : "Blog created successfully!"
      );
    },
  });

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[-\s]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Update slug when title changes
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = generateSlug(formData.title);
      setGeneratedSlug(slug);
    }
  }, [formData.title, formData.slug]);

  // Set form data when blog is loaded for editing
  useEffect(() => {
    if (isEditing && blogData) {
      setFormData({
        title: blogData.title || "",
        slug: blogData.slug || "",
        content: blogData.content || "",
        image_url: blogData.image_url || "",
        author: blogData.author || "",
        meta_title: blogData.meta_title || "",
        meta_description: blogData.meta_description || "",
        status: blogData.status || "draft",
      });
      // Set editor content
      if (editorRef.current && blogData.content) {
        editorRef.current.innerHTML = blogData.content;
      }
    }
  }, [blogData, isEditing, setFormData]);

  if (isEditing && fetchLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing && fetchError) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Failed to Load Blog
            </h3>
            <p className="text-gray-500 mb-4">{fetchError}</p>
            <Button
              onClick={() => navigate("/backoffice/blog")}
              variant="outline"
            >
              Back to Blog List
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/backoffice/blog")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing
              ? "Update your blog post content and settings"
              : "Write and publish a new blog post"}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Blog Content
                </CardTitle>
                <CardDescription>
                  Enter the main content for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog title..."
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    URL Slug
                  </Label>
                  <Input
                    id="slug"
                    placeholder="url-friendly-slug"
                    value={formData.slug || generatedSlug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                  />
                  {(formData.slug || generatedSlug) && (
                    <p className="text-sm text-gray-500">
                      URL: /blog/{formData.slug || generatedSlug}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Content *</Label>
                  {/* Rich Text Toolbar */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 border-b">
                      <button type="button" onClick={() => execCmd("bold")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Bold">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => execCmd("italic")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Italic">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => execCmd("underline")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Underline">
                        <Underline className="w-4 h-4" />
                      </button>
                      <div className="w-px h-5 bg-gray-300 mx-1" />
                      <button type="button" onClick={() => execCmd("formatBlock", "<h2>")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Heading 2">
                        <Heading1 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => execCmd("formatBlock", "<h3>")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Heading 3">
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => execCmd("formatBlock", "<p>")} className="p-1.5 rounded hover:bg-gray-200 transition text-xs font-semibold" title="Paragraph">
                        P
                      </button>
                      <div className="w-px h-5 bg-gray-300 mx-1" />
                      <button type="button" onClick={() => execCmd("insertUnorderedList")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Bullet List">
                        <List className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => execCmd("insertOrderedList")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Numbered List">
                        <ListOrdered className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => execCmd("formatBlock", "<blockquote>")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Blockquote">
                        <Quote className="w-4 h-4" />
                      </button>
                      <div className="w-px h-5 bg-gray-300 mx-1" />
                      <button type="button" onClick={() => {
                        const url = prompt("Enter link URL:");
                        if (url) execCmd("createLink", url);
                      }} className="p-1.5 rounded hover:bg-gray-200 transition" title="Insert Link">
                        <Link2 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => {
                        const url = prompt("Enter image URL:");
                        if (url) execCmd("insertImage", url);
                      }} className="p-1.5 rounded hover:bg-gray-200 transition" title="Insert Image">
                        <Image className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => execCmd("formatBlock", "<pre>")} className="p-1.5 rounded hover:bg-gray-200 transition" title="Code Block">
                        <Code className="w-4 h-4" />
                      </button>
                    </div>
                    <div
                      ref={editorRef}
                      contentEditable
                      className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none text-gray-800
                        prose-headings:text-gray-900 prose-a:text-blue-600 prose-blockquote:border-gray-300"
                      onInput={() => {
                        if (editorRef.current) {
                          handleChange("content", editorRef.current.innerHTML);
                        }
                      }}
                      onBlur={() => {
                        if (editorRef.current) {
                          handleChange("content", editorRef.current.innerHTML);
                        }
                      }}
                      suppressContentEditableWarning
                      data-placeholder="Write your blog post content here..."
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {formData.content.replace(/<[^>]*>/g, "").length} characters • Supports rich text formatting
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Featured Image
                </CardTitle>
                <CardDescription>
                  Add a featured image for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image_url}
                    onChange={(e) =>
                      handleChange("image_url", e.target.value)
                    }
                    type="url"
                  />
                  <p className="text-sm text-gray-500">
                    Enter a direct URL to your featured image
                  </p>
                </div>

                {formData.image_url && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="max-w-full h-32 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  SEO Settings
                </CardTitle>
                <CardDescription>
                  Optimize your blog post for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    placeholder="SEO title (defaults to blog title)"
                    value={formData.meta_title}
                    onChange={(e) => handleChange("meta_title", e.target.value)}
                    maxLength={70}
                  />
                  <p className="text-sm text-gray-500">
                    {formData.meta_title.length}/70 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    placeholder="Brief description for search results..."
                    value={formData.meta_description}
                    onChange={(e) => handleChange("meta_description", e.target.value)}
                    rows={3}
                    className="resize-none"
                    maxLength={160}
                  />
                  <p className="text-sm text-gray-500">
                    {formData.meta_description.length}/160 characters
                  </p>
                </div>

                {/* SEO Preview */}
                {(formData.meta_title || formData.title) && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-xs text-gray-400 mb-2 font-medium">Search Preview:</p>
                    <p className="text-blue-700 text-base font-medium truncate">
                      {formData.meta_title || formData.title}
                    </p>
                    <p className="text-green-700 text-xs truncate">
                      yourstore.com/blog/{formData.slug || generatedSlug || "post-slug"}
                    </p>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                      {formData.meta_description || "No meta description set. Search engines will use an excerpt from your content."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Publish Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="w-3 h-3 p-0"
                          />
                          Draft
                        </div>
                      </SelectItem>
                      <SelectItem value="published">
                        <div className="flex items-center gap-2">
                          <Badge className="w-3 h-3 p-0 bg-green-500" />
                          Published
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="author"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Author
                  </Label>
                  <Input
                    id="author"
                    placeholder="Author name"
                    value={formData.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                  />
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={
                      loading || !formData.title || !formData.content
                    }
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading
                      ? "Saving..."
                      : isEditing
                      ? "Update Post"
                      : "Create Post"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/backoffice/blog")}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blog Info */}
            {isEditing && blogData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Post Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span>
                      {new Date(blogData.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge
                      variant={
                        blogData.status === "published"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        blogData.status === "published"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                    >
                      {blogData.status}
                    </Badge>
                  </div>
                  {blogData.slug && (
                    <div className="pt-2 border-t">
                      <span className="text-gray-500">Public URL:</span>
                      <p className="text-xs font-mono bg-gray-50 p-2 rounded mt-1 break-all">
                        /blog/{blogData.slug}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
