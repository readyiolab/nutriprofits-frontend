import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock, Share2, BookOpen, ChevronRight } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicBlogDetail = () => {
  const { blogSlug } = useParams();
  const backofficeData = useBackofficeData();
  const blogs = backofficeData?.blogPosts || [];
  const storeName = backofficeData?.backoffice?.store_name || "Blog";

  const blog = blogs.find((b) => b.slug === blogSlug);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    return `${mins} min read`;
  };

  const getExcerpt = (content, maxLength = 100) => {
    if (!content) return "";
    const stripped = content.replace(/<[^>]*>/g, "");
    return stripped.length > maxLength
      ? stripped.substring(0, maxLength) + "..."
      : stripped;
  };

  // Related posts (exclude current)
  const relatedPosts = blogs
    .filter((b) => b.blog_id !== blog?.blog_id)
    .slice(0, 3);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#faf5e4] flex items-center justify-center">
        <div className="text-center p-8">
          <BookOpen className="w-16 h-16 text-[#2c786c]/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#2c786c] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#004445] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      {/* SEO Meta - rendered as hidden structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: blog.image_url || undefined,
            author: blog.author
              ? { "@type": "Person", name: blog.author }
              : undefined,
            datePublished: blog.created_at,
            dateModified: blog.updated_at || blog.created_at,
            publisher: {
              "@type": "Organization",
              name: storeName,
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90 truncate max-w-[200px]">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero / Header */}
      <header className="bg-gradient-to-br from-[#004445] via-[#2c786c] to-[#004445] pb-12 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            {blog.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {blog.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {getReadTime(blog.content)}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-white transition ml-auto"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blog.image_url && (
        <div className="max-w-4xl mx-auto px-4 -mt-6">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div
            className="prose prose-base md:prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-[#2c786c] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-md
              prose-blockquote:border-[#f8b400] prose-blockquote:bg-[#faf5e4] prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-strong:text-gray-900
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Author Bio */}
        {blog.author && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2c786c] to-[#004445] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-gray-500">Written by</p>
              <p className="font-semibold text-gray-900">{blog.author}</p>
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">More Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.blog_id}
                to={`/blog/${post.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {post.image_url && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.created_at)}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#2c786c] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {getExcerpt(post.content)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DynamicBlogDetail;
