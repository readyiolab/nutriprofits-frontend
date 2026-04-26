import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, User, ArrowRight, Search, BookOpen, Clock, Sparkles } from "lucide-react";

const sampleBlogs = [
  { blog_id: 1, title: "10 Essential Health Supplements for a Stronger Immune System", slug: "essential-health-supplements-immune-system", content: "Discover the top supplements that can help boost your immune system and keep you healthy year-round. From Vitamin C to Zinc, learn which nutrients your body needs most.", image_url: "https://images.unsplash.com/photo-1505576399279-0d754c0ce141?w=600", author: "Dr. Sarah Mitchell", created_at: "2024-12-15T10:00:00Z" },
  { blog_id: 2, title: "The Complete Guide to Natural Protein Sources", slug: "complete-guide-natural-protein-sources", content: "Whether you're building muscle or simply maintaining a healthy diet, protein is essential. This comprehensive guide covers the best natural protein sources.", image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600", author: "James Cooper", created_at: "2024-12-10T08:30:00Z" },
  { blog_id: 3, title: "Why Gut Health Matters More Than You Think", slug: "why-gut-health-matters", content: "Your gut is often called your 'second brain' for good reason. Learn how gut health affects everything from your mood to your immune system.", image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600", author: "Dr. Emily Chen", created_at: "2024-12-05T14:00:00Z" },
  { blog_id: 4, title: "Morning Routines That Transform Your Energy Levels", slug: "morning-routines-energy-levels", content: "Start your day right with these science-backed morning habits that can dramatically improve your energy, focus, and overall health.", image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600", author: "James Cooper", created_at: "2024-11-28T09:00:00Z" },
];

const Template2Blog = () => {
  const { templateId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBlogs = sampleBlogs.filter((b) => b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.author.toLowerCase().includes(searchTerm.toLowerCase()));
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const getReadTime = (c) => `${Math.max(1, Math.ceil(c.split(/\s+/).length / 200))} min read`;
  const getExcerpt = (c, max = 150) => c.length > max ? c.substring(0, max) + "..." : c;

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Hero Section */}
        <section className="relative bg-slate-950 pt-32 pb-24 overflow-hidden rounded-b-[4rem] shadow-2xl mb-20 min-h-[60vh] flex items-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-[10s] hover:scale-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>

          {/* Dynamic Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-teal-600/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 shadow-2xl mb-8 transform transition-all hover:scale-105 hover:bg-white/10">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Insights & Innovations</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white font-t2-heading leading-[1.1]">
                Wellness Intelligence
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
                Discover the latest breakthroughs in health science and natural supplement strategies.
              </p>

              <div className="max-w-2xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                  <Search className="w-5 h-5 text-emerald-400" />
                  <input 
                    type="text" 
                    placeholder="Search the knowledge base..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 px-4 font-light text-lg"
                  />
                  <div className="hidden md:block bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg">Search</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 pb-32">
          {/* Featured Post */}
          {filteredBlogs.length > 0 && !searchTerm && (
            <article className="mb-24">
              <Link to={`/template/${templateId}/blog/${filteredBlogs[0].slug}`} className="group block relative">
                <div className="absolute -inset-4 bg-emerald-500/5 rounded-[4rem] blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                <div className="relative bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100 grid lg:grid-cols-2 gap-0">
                  <div className="aspect-[16/10] lg:aspect-auto overflow-hidden relative">
                    <img 
                      src={filteredBlogs[0].image_url} 
                      alt={filteredBlogs[0].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    <div className="absolute top-8 left-8 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
                      Editor's Pick
                    </div>
                  </div>
                  <div className="p-10 md:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-8">
                      <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {formatDate(filteredBlogs[0].created_at)}
                      </span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" /> {getReadTime(filteredBlogs[0].content)}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-t2-heading leading-[1.1] group-hover:text-emerald-600 transition-colors">
                      {filteredBlogs[0].title}
                    </h2>
                    
                    <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 line-clamp-3">
                      {getExcerpt(filteredBlogs[0].content, 200)}
                    </p>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold font-t2-heading">
                          {filteredBlogs[0].author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{filteredBlogs[0].author}</p>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Senior Health Expert</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                        Read Analysis <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {(searchTerm ? filteredBlogs : filteredBlogs.slice(1)).map((blog) => (
              <article key={blog.blog_id}>
                <Link to={`/template/${templateId}/blog/${blog.slug}`} className="group block h-full">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full flex flex-col relative">
                    <div className="aspect-[16/11] overflow-hidden relative">
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:opacity-0 transition-opacity"></div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{formatDate(blog.created_at)}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{getReadTime(blog.content)}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-4 font-t2-heading line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-2 flex-grow">
                        {getExcerpt(blog.content, 120)}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-bold border border-slate-100">
                            {blog.author.charAt(0)}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{blog.author}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-600 translate-x-0 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {filteredBlogs.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Articles Found</h3>
              <p className="text-slate-400 font-light">Try adjusting your search terms to find what you're looking for.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Template2Blog;