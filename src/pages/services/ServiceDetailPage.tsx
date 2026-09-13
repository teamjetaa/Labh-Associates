import { useParams, Link, Navigate } from 'react-router-dom';
import { services } from '@/mocks/services';
import BackButton from '@/components/feature/BackButton';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

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
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="mb-4 flex justify-start">
            <BackButton />
          </div>
          <div className="flex items-center gap-2 text-sm text-[#8C8480] mb-3">
            <Link to="/services" className="hover:text-[#C9A84C] transition-colors">Services</Link>
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-s-line" />
            </span>
            <span>{service.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-[#F2EDE4]">{service.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gold/10">
              <i className={`${service.icon} text-3xl text-[#C9A84C]`} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#1A1714]">
                {service.title}
              </h2>
              <p className="text-sm text-[#4A4540] mt-1">LABH Associates</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-[#4A4540] leading-relaxed text-base md:text-lg">
              {service.description}
            </p>

            <div className="mt-8 p-6 md:p-8 bg-cream rounded-md">
              <h3 className="text-xl font-bold font-heading text-[#1A1714] mb-4">
                Why Choose LABH Associates for {service.title}?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm md:text-base text-[#4A4540]">
                  <span className="w-5 h-5 flex items-center justify-center mt-0.5 text-[#C9A84C] shrink-0">
                    <i className="ri-check-line" />
                  </span>
                  Direct relationships with 50+ leading banks and NBFCs
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-[#4A4540]">
                  <span className="w-5 h-5 flex items-center justify-center mt-0.5 text-[#C9A84C] shrink-0">
                    <i className="ri-check-line" />
                  </span>
                  Fast-track processing with dedicated relationship managers
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-[#4A4540]">
                  <span className="w-5 h-5 flex items-center justify-center mt-0.5 text-[#C9A84C] shrink-0">
                    <i className="ri-check-line" />
                  </span>
                  Customized repayment structures based on your cash flow
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-[#4A4540]">
                  <span className="w-5 h-5 flex items-center justify-center mt-0.5 text-[#C9A84C] shrink-0">
                    <i className="ri-check-line" />
                  </span>
                  End-to-end documentation support and compliance guidance
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-[#4A4540]">
                  <span className="w-5 h-5 flex items-center justify-center mt-0.5 text-[#C9A84C] shrink-0">
                    <i className="ri-check-line" />
                  </span>
                  Transparent fee structure with no hidden charges
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openContactModal'))}
              className="inline-flex items-center px-8 py-3 text-sm font-semibold font-label rounded-sm hover:scale-[1.02] hover:brightness-110 transition-all whitespace-nowrap"
              style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
            >
              Apply for {service.title}
              <span className="w-4 h-4 flex items-center justify-center ml-2">
                <i className="ri-arrow-right-line" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 md:py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#1A1714] text-center mb-8 md:mb-10">
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.slug}`}
                className="group bg-white p-6 rounded-md border border-[#E8E0D4] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gold/10 mb-4">
                  <i className={`${s.icon} text-2xl text-[#C9A84C]`} />
                </div>
                <h3 className="text-lg font-bold font-heading text-[#1A1714] group-hover:text-[#C9A84C] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[#4A4540] mt-2 line-clamp-2">{s.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}