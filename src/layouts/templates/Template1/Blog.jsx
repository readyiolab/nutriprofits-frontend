import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, User, ArrowRight, Search, BookOpen, Clock } from "lucide-react";

const sampleBlogs = [
  {
    blog_id: 1,
    title: "10 Essential Health Supplements for a Stronger Immune System",
    slug: "essential-health-supplements-immune-system",
    content: "Discover the top supplements that can help boost your immune system and keep you healthy year-round. From Vitamin C to Zinc, learn which nutrients your body needs most and how to incorporate them into your daily routine for optimal wellness.",
    image_url: "https://images.unsplash.com/photo-1505576399279-0d754c0ce141?w=600",
    author: "Dr. Sarah Mitchell",
    status: "published",
    created_at: "2024-12-15T10:00:00Z",
  },
  {
    blog_id: 2,
    title: "The Complete Guide to Natural Protein Sources",
    slug: "complete-guide-natural-protein-sources",
    content: "Whether you're building muscle or simply maintaining a healthy diet, protein is essential. This comprehensive guide covers the best natural protein sources, from plant-based options to lean meats, and how much you really need each day.",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    author: "James Cooper",
    status: "published",
    created_at: "2024-12-10T08:30:00Z",
  },
  {
    blog_id: 3,
    title: "Why Gut Health Matters More Than You Think",
    slug: "why-gut-health-matters",
    content: "Your gut is often called your 'second brain' for good reason. Learn how gut health affects everything from your mood to your immune system, and discover simple steps to improve your digestive wellness starting today.",
    image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600",
    author: "Dr. Emily Chen",
    status: "published",
    created_at: "2024-12-05T14:00:00Z",
  },
  {
    blog_id: 4,
    title: "Morning Routines That Transform Your Energy Levels",
    slug: "morning-routines-energy-levels",
    content: "Start your day right with these science-backed morning habits. From hydration to mindfulness, these simple practices can dramatically improve your energy, focus, and overall health throughout the entire day.",
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    author: "James Cooper",
    status: "published",
    created_at: "2024-11-28T09:00:00Z",
  },
];

const Template1Blog = () => {
  const { templateId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = sampleBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const getReadTime = (content) => `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`;

  const getExcerpt = (content, max = 150) =>
    content.length > max ? content.substring(0, max) + "..." : content;

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      <section className="bg-gradient-to-br from-[#004445] via-[#2c786c] to-[#004445] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-[#f8b400]" />
            <span className="text-white/90 text-sm font-medium">Our Blog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Latest Articles & Insights</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Stay updated with the latest health tips, wellness guides, and product insights
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search articles..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/95 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#f8b400] shadow-lg" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Featured */}
        {filteredBlogs.length > 0 && !searchTerm && (
          <article className="mb-12">
            <Link to={`/template/${templateId}/blog/${filteredBlogs[0].slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                  <img src={filteredBlogs[0].image_url} alt={filteredBlogs[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="bg-[#f8b400]/10 text-[#004445] text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{getReadTime(filteredBlogs[0].content)}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#2c786c] transition-colors">{filteredBlogs[0].title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{getExcerpt(filteredBlogs[0].content, 200)}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{filteredBlogs[0].author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(filteredBlogs[0].created_at)}</span>
                    </div>
                    <span className="flex items-center gap-1 text-[#2c786c] text-sm font-medium group-hover:gap-2 transition-all">Read More <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchTerm ? filteredBlogs : filteredBlogs.slice(1)).map((blog) => (
            <article key={blog.blog_id}>
              <Link to={`/template/${templateId}/blog/${blog.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(blog.created_at)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{getReadTime(blog.content)}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-[#2c786c] transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{getExcerpt(blog.content)}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="flex items-center gap-1 text-xs text-gray-400"><User className="w-3 h-3" />{blog.author}</span>
                    <span className="flex items-center gap-1 text-[#2c786c] text-xs font-medium group-hover:gap-2 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template1Blog;
