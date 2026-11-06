import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionHeading } from '../../components/common/SectionHeading';
import { PentatechLogo } from '../../components/common/PentatechLogo';
import { Handshake, Building2, Globe2, Shield, Send, CheckCircle2 } from 'lucide-react';

export const PartnershipsPage: React.FC = () => {
  const { partners, addToast } = useCMS();
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    tier: 'Strategic Research Alliance',
    proposal: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orgName || !formData.email) {
      addToast('Missing Details', 'Please enter your organization name and contact email.', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Enquiry Received', `Thank you ${formData.contactName || formData.orgName}. Our partnership director will contact you.`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 bg-[#090909] overflow-hidden">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Institutional Alliances"
            title="Co-Engineering the Future with"
            highlight="Global Visionaries"
            description="We collaborate with international universities, hardware fabrication laboratories, multinational technology leaders, and development agencies."
          />
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-12 sm:py-20 border-b border-[#D99A28]/15 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857]">
              Current Alliance Members
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Active Strategic Partners
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="p-5 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 hover:border-[#FFC857]/60 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#171717] border border-[#D99A28]/30 flex items-center justify-center p-3 mb-4 mx-auto group-hover:border-[#FFC857] transition-all">
                    <PentatechLogo variant="emblem" size="sm" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#FFC857] transition-colors">
                    {partner.name}
                  </h4>
                  <span className="text-xs font-mono text-[#D99A28] block mt-1">
                    {partner.tier}
                  </span>
                  <p className="text-xs text-[#A5A5A5] mt-3 leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#D99A28]/15 w-full text-xs font-mono text-[#777]">
                  <span>Accredited Partner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="py-12 sm:py-20 bg-[#090909]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-[#111111] border border-[#D99A28]/35 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857] font-semibold">
                Initiate Dialogue
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Partner with Team Pentatech
              </h3>
              <p className="text-xs text-[#A5A5A5]">
                Whether you seek joint research fellowships, technology licensing, or fabrication support, we welcome meaningful collaboration.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#171717] border border-[#D99A28]/40 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#FFC857] mx-auto" />
                <h4 className="text-lg font-bold text-white">Partnership Enquiry Received</h4>
                <p className="text-xs text-[#A5A5A5] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our external relations and research directors review all institutional proposals weekly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#D99A28] text-black text-xs font-semibold"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-2">
                      Organization / University Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      placeholder="e.g. Pan-African Institute of Robotics"
                      className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-2">
                      Primary Contact Representative *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. Dr. K. Osei, Director of R&D"
                      className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-2">
                      Institutional Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="director@institute.org"
                      className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-2">
                      Partnership Category
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                    >
                      <option value="Strategic Research Alliance">Strategic Research Alliance</option>
                      <option value="Academic & University Fellowship">Academic & University Fellowship</option>
                      <option value="Industrial Prototyping Sponsor">Industrial Prototyping Sponsor</option>
                      <option value="Venture & Grant Catalyst">Venture & Grant Catalyst</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-2">
                    Scope of Collaboration & Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.proposal}
                    onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                    placeholder="Briefly describe your proposed research or technology partnership initiative..."
                    className="w-full px-4 py-3 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                  />
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_30px_rgba(255,200,87,0.4)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Transmit Partnership Proposal</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
