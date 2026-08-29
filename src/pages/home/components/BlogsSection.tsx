import { Link } from 'react-router-dom';
import { blogPosts } from '@/mocks/blog';

export default function BlogsSection() {
  return (
    <section className="py-16 md:py-24 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-sm font-medium font-label text-primary-600 uppercase tracking-wider">
            Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground-950 mt-3">
            Blogs
          </h2>
          <p className="text-foreground-600 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Stay updated with the latest trends in project finance, loans, and business growth strategies.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-xl overflow-hidden border border-background-200/70 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium font-label text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-foreground-400">{post.date}</span>
                </div>

                <h4 className="text-base md:text-lg font-bold font-heading text-foreground-900 leading-snug line-clamp-3 group-hover:text-primary-600 transition-colors">
                  <Link to="/blog">{post.title}</Link>
                </h4>

                <p className="text-sm text-foreground-500 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>

                <Link
                  to="/blog"
                  className="inline-flex items-center text-sm font-medium font-label text-primary-600 hover:text-primary-700 mt-4 transition-colors"
                >
                  Read More
                  <span className="w-4 h-4 flex items-center justify-center ml-1">
                    <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-600 text-sm font-medium font-label rounded-md hover:bg-primary-500 hover:text-white transition-colors whitespace-nowrap"
          >
            View All Blogs
            <span className="w-4 h-4 flex items-center justify-center ml-2">
              <i className="ri-arrow-right-line" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}