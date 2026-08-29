import { blogPosts } from '@/mocks/blog';

export default function BlogPage() {
  const allPosts = [
    ...blogPosts,
    {
      id: 4,
      title: 'Understanding Project Finance: A Complete Guide for Industrial Projects',
      slug: 'understanding-project-finance',
      excerpt: 'Learn the fundamentals of project finance, from feasibility studies to loan syndication, and how to structure financing for maximum success.',
      date: 'July 22, 2023',
      image: 'https://readdy.ai/api/search-image?query=Modern%20industrial%20factory%20building%20with%20steel%20structure%2C%20aerial%20view%20during%20construction%2C%20bright%20daylight%2C%20clean%20professional%20photography&width=800&height=500&seq=blog-04&orientation=landscape',
      category: 'Project Finance',
    },
    {
      id: 5,
      title: 'How to Choose the Right NBFC for Your Business Loan',
      slug: 'choose-right-nbfc',
      excerpt: 'Compare interest rates, processing fees, and approval timelines across top NBFCs to find the perfect lending partner for your business.',
      date: 'June 15, 2023',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20meeting%20in%20modern%20conference%20room%2C%20financial%20documents%20on%20table%2C%20warm%20natural%20lighting%2C%20corporate%20photography%20style&width=800&height=500&seq=blog-05&orientation=landscape',
      category: 'Business Loans',
    },
    {
      id: 6,
      title: 'Government Subsidy Schemes Every MSME Should Know About',
      slug: 'government-subsidy-schemes',
      excerpt: 'An overview of CLCSS, PMEGP, and other key government schemes that can reduce your project costs by up to 35%.',
      date: 'May 8, 2023',
      image: 'https://readdy.ai/api/search-image?query=Small%20manufacturing%20workshop%20with%20modern%20machinery%2C%20Indian%20workers%20operating%20equipment%2C%20bright%20industrial%20lighting%2C%20professional%20photojournalism%20style&width=800&height=500&seq=blog-06&orientation=landscape',
      category: 'Subsidy',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2C2825 0%, #3D3530 50%, #2C2825 100%)',
          backgroundSize: '200% 200%',
          animation: 'heroGradient 15s ease infinite',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-[#F2EDE4]">Blog</h1>
          <p className="text-[#8C8480] mt-3 text-sm md:text-base max-w-xl mx-auto">
            Insights, guides, and updates from the world of project finance
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-cream rounded-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold font-label text-[#C9A84C] bg-gold/10 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#8C8480]">{post.date}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold font-heading text-[#1A1714] leading-snug group-hover:text-[#C9A84C] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#4A4540] mt-2 line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm font-medium font-label text-[#C9A84C] hover:opacity-80 mt-4 transition-opacity cursor-pointer">
                    Read More
                    <span className="w-4 h-4 flex items-center justify-center ml-1">
                      <i className="ri-arrow-right-line" />
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}