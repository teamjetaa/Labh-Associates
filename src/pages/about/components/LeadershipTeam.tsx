import { teamMembers } from '@/mocks/team';

/* ===== LEADERSHIP TEAM =====
 * Real team members with images, shown on the About page
 */

export default function LeadershipTeam() {
  return (
    <section className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="reveal text-3xl md:text-4xl font-bold font-heading text-[#1A1714]">Our Leadership</h2>
          <div className="reveal mx-auto mt-4" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
          <p className="reveal text-[#4A4540] mt-3 text-sm md:text-base max-w-xl mx-auto">
            The experts driving Labh Associates' financial advisory and consulting practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto items-stretch">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="reveal group flex flex-col h-full bg-white rounded-md overflow-hidden border border-[#E8E0D4] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-6 md:p-8 text-center">
                <span className="text-xs font-semibold font-label text-[#C9A84C] uppercase tracking-[0.12em]">
                  {member.role}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-heading text-[#1A1714] mt-1">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-[#4A4540] mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}