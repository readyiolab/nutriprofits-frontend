import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search, BookOpen, Clock, Zap } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicBlogList = () => {
  const backofficeData = useBackofficeData();
  const blogs = backofficeData?.blogPosts || [];
  const storeName = backofficeData?.backoffice?.store_name || "Our Blog";
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "";
    const stripped = content.replace(/<[^>]*>/g, "");
    return stripped.length > maxLength ? stripped.substring(0, maxLength) + "..." : stripped;
  };

  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <div className="min-h-screen bg-[#eeeeee]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#303841] via-[#3a4750] to-[#303841] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d72323] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#d72323]/10 border border-[#d72323]/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-[#d72323]" />
            <span className="text-white/90 text-sm font-medium">Blog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Latest Posts & Updates
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Fresh articles and insights from {storeName}
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#d72323] border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-[#3a4750]/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? "No articles found" : "No blog posts yet"}
            </h2>
            <p className="text-gray-500 text-sm">
              {searchTerm ? "Try a different search term" : "Check back soon for new posts."}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {filteredBlogs.length > 0 && !searchTerm && (
              <article className="mb-12">
                <Link
                  to={`/blog/${filteredBlogs[0].slug}`}
                  className="group block bg-[#303841] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3a4750]"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {filteredBlogs[0].image_url && (
                      <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                        <img src={filteredBlogs[0].image_url} alt={filteredBlogs[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="bg-[#d72323] text-white text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />{getReadTime(filteredBlogs[0].content)}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#d72323] transition-colors line-clamp-2">
                        {filteredBlogs[0].title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{getExcerpt(filteredBlogs[0].content, 200)}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {filteredBlogs[0].author && (
                            <span className="flex items-center gap-1"><User className="w-3 h-3" />{filteredBlogs[0].author}</span>
                          )}
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(filteredBlogs[0].created_at)}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[#d72323] text-sm font-medium group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchTerm ? filteredBlogs : filteredBlogs.slice(1)).map((blog) => (
                <article key={blog.blog_id}>
                  <Link to={`/blog/${blog.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 h-full hover:border-[#d72323]/30">
                    {blog.image_url && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={blog.image_url} alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(blog.created_at)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{getReadTime(blog.content)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-[#d72323] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{getExcerpt(blog.content)}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {blog.author && (
                          <span className="flex items-center gap-1 text-xs text-gray-400"><User className="w-3 h-3" />{blog.author}</span>
                        )}
                        <span className="flex items-center gap-1 text-[#d72323] text-xs font-medium group-hover:gap-2 transition-all ml-auto">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default DynamicBlogList;
