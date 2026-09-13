import { Link } from 'react-router-dom';
import { teamMembers } from '@/mocks/team';

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-sm font-medium font-label text-primary-600 uppercase tracking-wider">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground-950 mt-3">
            Management
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-background-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 md:p-6">
                <span className="text-xs font-medium font-label text-primary-600 uppercase tracking-wider">
                  {member.role}
                </span>
                <h4 className="text-lg md:text-xl font-bold font-heading text-foreground-900 mt-1">
                  {member.name}
                </h4>
                <p className="text-sm text-foreground-500 mt-2 line-clamp-2">
                  {member.bio}
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center text-sm font-medium font-label text-primary-600 hover:text-primary-700 mt-3 transition-colors"
                >
                  View Profile
                  <span className="w-4 h-4 flex items-center justify-center ml-1">
                    <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}