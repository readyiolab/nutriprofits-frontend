import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock, Share2, BookOpen, ChevronRight } from "lucide-react";

const sampleBlogs = [
  {
    blog_id: 1, title: "10 Essential Health Supplements for a Stronger Immune System",
    slug: "essential-health-supplements-immune-system",
    content: "<h2>Why Your Immune System Needs Support</h2><p>Your immune system is your body's first line of defense against illness. While a balanced diet provides many essential nutrients, supplementation can fill critical gaps, especially during high-stress periods or seasonal changes.</p><h2>Top 10 Supplements</h2><p><strong>1. Vitamin C</strong> — A powerful antioxidant that supports immune cell function. Aim for 500-1000mg daily.</p><p><strong>2. Vitamin D</strong> — The sunshine vitamin. Most people are deficient, especially in winter months. 2000-4000 IU daily is recommended.</p><p><strong>3. Zinc</strong> — Essential for immune cell development. 15-30mg daily can help fight off infections faster.</p><p><strong>4. Elderberry</strong> — Rich in flavonoids with antiviral properties. Studies show it can reduce cold duration by 2-4 days.</p><p><strong>5. Probiotics</strong> — 70% of your immune system lives in your gut. A quality probiotic supports the microbiome.</p><p>Consult with a healthcare professional before starting any supplement regimen, especially if you have existing health conditions.</p>",
    image_url: "https://images.unsplash.com/photo-1505576399279-0d754c0ce141?w=600",
    author: "Dr. Sarah Mitchell", status: "published", created_at: "2024-12-15T10:00:00Z",
  },
  {
    blog_id: 2, title: "The Complete Guide to Natural Protein Sources", slug: "complete-guide-natural-protein-sources",
    content: "Whether you're building muscle or simply maintaining a healthy diet, protein is essential.",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    author: "James Cooper", status: "published", created_at: "2024-12-10T08:30:00Z",
  },
  {
    blog_id: 3, title: "Why Gut Health Matters More Than You Think", slug: "why-gut-health-matters",
    content: "Your gut is often called your 'second brain' for good reason.",
    image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600",
    author: "Dr. Emily Chen", status: "published", created_at: "2024-12-05T14:00:00Z",
  },
];

const Template1BlogDetail = () => {
  const { templateId, blogSlug } = useParams();
  const blog = sampleBlogs.find((b) => b.slug === blogSlug) || sampleBlogs[0];
  const relatedPosts = sampleBlogs.filter((b) => b.blog_id !== blog.blog_id).slice(0, 3);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const getReadTime = (c) => `${Math.max(1, Math.ceil(c.replace(/<[^>]*>/g, "").split(/\s+/).length / 200))} min read`;
  const getExcerpt = (c, max = 100) => { const s = c.replace(/<[^>]*>/g, ""); return s.length > max ? s.substring(0, max) + "..." : s; };

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/70">
            <Link to={`/template/${templateId}`} className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/template/${templateId}/blog`} className="hover:text-white transition">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90 truncate max-w-[200px]">{blog.title}</span>
          </nav>
        </div>
      </div>

      <header className="bg-gradient-to-br from-[#004445] via-[#2c786c] to-[#004445] pb-12 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link to={`/template/${templateId}/blog`} className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{blog.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(blog.created_at)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{getReadTime(blog.content)}</span>
          </div>
        </div>
      </header>

      {blog.image_url && (
        <div className="max-w-4xl mx-auto px-4 -mt-6">
          <div className="rounded-xl overflow-hidden shadow-xl"><img src={blog.image_url} alt={blog.title} className="w-full max-h-[480px] object-cover" /></div>
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#2c786c] prose-blockquote:border-[#f8b400]"
            dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2c786c] to-[#004445] flex items-center justify-center text-white font-bold text-lg">{blog.author.charAt(0)}</div>
          <div><p className="text-sm text-gray-500">Written by</p><p className="font-semibold text-gray-900">{blog.author}</p></div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">More Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.blog_id} to={`/template/${templateId}/blog/${post.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                {post.image_url && (
                  <div className="aspect-[16/10] overflow-hidden"><img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                )}
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.created_at)}</p>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#2c786c] transition-colors line-clamp-2">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Template1BlogDetail;
