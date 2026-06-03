import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock, Share2, BookOpen, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { apiCall } from "../../../utils/domain";

const DynamicBlogDetail = () => {
  const { blogSlug } = useParams();
  const backofficeData = useBackofficeData();
  const blogs = backofficeData?.blogPosts || [];
  const storeName = backofficeData?.backoffice?.store_name || "Blog";

  const initialBlog = blogs.find((b) => b.slug === blogSlug);
  const [blog, setBlog] = useState(initialBlog);
  const [loadingDetail, setLoadingDetail] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchDetail = async () => {
      try {
        setLoadingDetail(true);
        const response = await apiCall(`/backoffice-public/blogs/slug/${blogSlug}`);
        if (response.success && active) {
          setBlog(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch blog details:", err);
      } finally {
        if (active) setLoadingDetail(false);
      }
    };
    fetchDetail();
    return () => {
      active = false;
    };
  }, [blogSlug]);

  useEffect(() => {
    if (initialBlog && (!blog || blog.blog_id !== initialBlog.blog_id)) {
      setBlog(initialBlog);
    }
  }, [initialBlog]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  const getExcerpt = (content, maxLength = 100) => {
    if (!content) return "";
    const stripped = content.replace(/<[^>]*>/g, "");
    return stripped.length > maxLength ? stripped.substring(0, maxLength) + "..." : stripped;
  };

  const relatedPosts = blogs.filter((b) => b.blog_id !== blog?.blog_id).slice(0, 3);

  if (loadingDetail && (!blog || !blog.content)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-slate-500 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8">
          <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Post Not Found</h1>
          <p className="text-slate-500 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: blog.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BlogPosting",
        headline: blog.title, image: blog.image_url || undefined,
        author: blog.author ? { "@type": "Person", name: blog.author } : undefined,
        datePublished: blog.created_at, dateModified: blog.updated_at || blog.created_at,
        publisher: { "@type": "Organization", name: storeName },
      }) }} />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation & Header Section */}
        <section className="relative bg-slate-50 pt-32 pb-32 overflow-hidden border-b border-slate-100 shadow-sm mb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/90"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-12">
                <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <Link to="/blog" className="hover:text-emerald-700 transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-slate-400 truncate max-w-[200px]">{blog.title}</span>
              </nav>

              <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-8 hover:gap-4 transition-all duration-300">
                <ArrowLeft className="w-4 h-4" /> Return to Blog
              </Link>

              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-10 font-t2-heading leading-[1.1] tracking-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 border-t border-slate-200/60 pt-8">
                {blog.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                      {blog.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{blog.author}</p>
                      <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Lead Analyst</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {formatDate(blog.created_at)}</span>
                  <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-emerald-600" /> {getReadTime(blog.content)}</span>
                </div>
                <button onClick={handleShare} className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-700 transition ml-auto">
                  <Share2 className="w-4 h-4" /> Share Article
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Image & Content */}
        <section className="container mx-auto px-4 lg:px-8 mb-32 -mt-40 relative z-20">
          <div className="max-w-5xl mx-auto">
            {blog.image_url && (
              <div className="rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.1)] mb-16 border-4 border-white">
                <img src={blog.image_url} alt={blog.title} className="w-full h-auto max-h-[600px] object-cover" />
              </div>
            )}

            <div className="grid lg:grid-cols-[1fr_300px] gap-16">
              <article className="relative">
                <div className="absolute -inset-8 bg-white/50 backdrop-blur-3xl rounded-[3rem] -z-10 border border-white/50"></div>
                <div className="p-10 md:p-16">
                  <div 
                    className="prose prose-slate prose-lg max-w-none 
                    prose-headings:font-t2-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                    prose-p:text-slate-600 prose-p:font-light prose-p:leading-relaxed
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-em:text-emerald-600 prose-em:font-medium
                    prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:px-8 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
                    prose-img:rounded-[2rem] prose-img:shadow-2xl"
                    dangerouslySetInnerHTML={{ __html: blog.content }} 
                  />
                  
                  {/* Author Card Footer */}
                  {blog.author && (
                    <div className="mt-20 pt-12 border-t border-slate-100 flex items-center gap-8">
                      <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 text-3xl font-bold font-t2-heading shadow-sm">
                        {blog.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em] mb-2">Written By</p>
                        <p className="text-2xl font-bold text-slate-900 font-t2-heading mb-2">{blog.author}</p>
                        <p className="text-slate-500 text-sm font-light max-w-md">Health science researcher with over 12 years of experience in nutritional biochemistry and wellness strategies.</p>
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {/* Sidebar Info */}
              <aside className="space-y-8">
                <div className="p-8 rounded-[2.5rem] bg-emerald-50/50 text-slate-900 border border-emerald-100/50 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                  <h4 className="text-lg font-bold mb-4 font-t2-heading relative z-10 text-slate-900">Quick Summary</h4>
                  <p className="text-slate-500 text-sm font-light leading-relaxed relative z-10">
                    This analysis covers critical strategies for optimizing human health through evidence-based supplementation and lifestyle adjustments, brought to you by {storeName}.
                  </p>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-50 pb-4">Key Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-bold uppercase">Complexity</span>
                      <span className="text-xs text-emerald-600 font-bold uppercase">Beginner</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-bold uppercase">Reliability</span>
                      <span className="text-xs text-emerald-600 font-bold uppercase">Verified</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 lg:px-8 pb-32">
            <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
              <div>
                <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Knowledge Expansion</span>
                <h2 className="text-3xl font-bold text-slate-900 font-t2-heading">Continued Intelligence</h2>
              </div>
              <Link to="/blog" className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:gap-4 transition-all flex items-center gap-2">
                View All <ArrowLeft className="w-4 h-4" style={{ transform: "rotate(180deg)" }} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedPosts.map((post) => (
                <Link key={post.blog_id} to={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full">
                    {post.image_url && (
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:opacity-0 transition-opacity"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-emerald-600" /> {formatDate(post.created_at)}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-t2-heading line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DynamicBlogDetail;
