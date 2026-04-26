import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock, ChevronRight } from "lucide-react";

const sampleBlogs = [
  { blog_id: 1, title: "10 Essential Health Supplements for a Stronger Immune System", slug: "essential-health-supplements-immune-system", content: "<h2>Why Your Immune System Needs Support</h2><p>Your immune system is your body's first line of defense. While a balanced diet provides many essential nutrients, supplementation can fill critical gaps.</p><p><strong>Vitamin C</strong> — A powerful antioxidant that supports immune cell function. Aim for 500-1000mg daily.</p><p><strong>Vitamin D</strong> — The sunshine vitamin. 2000-4000 IU daily is recommended.</p><p><strong>Zinc</strong> — Essential for immune cell development. 15-30mg daily.</p>", image_url: "https://images.unsplash.com/photo-1505576399279-0d754c0ce141?w=600", author: "Dr. Sarah Mitchell", created_at: "2024-12-15T10:00:00Z" },
  { blog_id: 2, title: "The Complete Guide to Natural Protein Sources", slug: "complete-guide-natural-protein-sources", content: "Protein is essential for building muscle and maintaining health.", image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600", author: "James Cooper", created_at: "2024-12-10T08:30:00Z" },
  { blog_id: 3, title: "Why Gut Health Matters More Than You Think", slug: "why-gut-health-matters", content: "Your gut is often called your 'second brain' for good reason.", image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600", author: "Dr. Emily Chen", created_at: "2024-12-05T14:00:00Z" },
];

const Template2BlogDetail = () => {
  const { templateId, blogSlug } = useParams();
  const blog = sampleBlogs.find((b) => b.slug === blogSlug) || sampleBlogs[0];
  const relatedPosts = sampleBlogs.filter((b) => b.blog_id !== blog.blog_id).slice(0, 3);
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const getReadTime = (c) => `${Math.max(1, Math.ceil(c.replace(/<[^>]*>/g, "").split(/\s+/).length / 200))} min read`;

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation & Header Section */}
        <section className="relative bg-slate-950 pt-32 pb-32 overflow-hidden rounded-b-[4rem] shadow-2xl mb-24">
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-teal-600/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 text-[10px] font-bold text-emerald-400/60 uppercase tracking-[0.2em] mb-12">
                <Link to={`/template/${templateId}`} className="hover:text-emerald-400 transition-colors">Intelligence</Link>
                <ChevronRight className="w-3 h-3" />
                <Link to={`/template/${templateId}/blog`} className="hover:text-emerald-400 transition-colors">Archives</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/40 truncate max-w-[200px]">{blog.title}</span>
              </nav>

              <Link to={`/template/${templateId}/blog`} className="inline-flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8 hover:gap-4 transition-all duration-300">
                <ArrowLeft className="w-4 h-4" /> Return to Archives
              </Link>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 font-t2-heading leading-[1.1] tracking-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 border-t border-white/5 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">{blog.author}</p>
                    <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest opacity-60">Lead Analyst</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {formatDate(blog.created_at)}</span>
                  <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-emerald-600" /> {getReadTime(blog.content)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Image & Content */}
        <section className="container mx-auto px-4 lg:px-8 mb-32 -mt-40 relative z-20">
          <div className="max-w-5xl mx-auto">
            {blog.image_url && (
              <div className="rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.2)] mb-16 border-4 border-white">
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
                  <div className="mt-20 pt-12 border-t border-slate-100 flex items-center gap-8">
                    <div className="w-20 h-20 rounded-[2rem] bg-slate-950 flex items-center justify-center text-emerald-400 text-3xl font-bold font-t2-heading shadow-xl">
                      {blog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em] mb-2">Written By</p>
                      <p className="text-2xl font-bold text-slate-900 font-t2-heading mb-2">{blog.author}</p>
                      <p className="text-slate-500 text-sm font-light max-w-md">Health science researcher with over 12 years of experience in nutritional biochemistry and wellness strategies.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar Info */}
              <aside className="space-y-8">
                <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/20 rounded-full blur-2xl"></div>
                  <h4 className="text-lg font-bold mb-4 font-t2-heading relative z-10">Quick Summary</h4>
                  <p className="text-slate-400 text-sm font-light leading-relaxed relative z-10">
                    This analysis covers critical strategies for optimizing human health through evidence-based supplementation and lifestyle adjustments.
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

        {/* More Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 lg:px-8 pb-32">
            <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
              <div>
                <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Knowledge Expansion</span>
                <h2 className="text-3xl font-bold text-slate-900 font-t2-heading">Continued Intelligence</h2>
              </div>
              <Link to={`/template/${templateId}/blog`} className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:gap-4 transition-all flex items-center gap-2">
                View All <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedPosts.map((post) => (
                <Link key={post.blog_id} to={`/template/${templateId}/blog/${post.slug}`} className="group block">
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

export default Template2BlogDetail;