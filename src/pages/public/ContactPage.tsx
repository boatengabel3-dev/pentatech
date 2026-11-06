import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, Clock, Shield } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, addToast } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Missing Details', 'Please complete all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Message Dispatched', 'Thank you. The Pentatech communications team will respond within 48 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const regionalHubs = [
    {
      city: 'Accra Innovation Campus',
      country: 'Ghana (West Africa)',
      role: 'Headquarters & Aeromechanical Test Flight Ground',
      contact: 'accra@pentatech.org [Placeholder]',
    },
    {
      city: 'Nairobi Technology Hub',
      country: 'Kenya (East Africa)',
      role: 'Edge Computing & Distributed Sensor Networks',
      contact: 'nairobi@pentatech.org [Placeholder]',
    },
    {
      city: 'Lagos Prototyping Center',
      country: 'Nigeria (West Africa)',
      role: 'Hardware Security & Decentralized Fintech R&D',
      contact: 'lagos@pentatech.org [Placeholder]',
    },
    {
      city: 'Global Virtual Operations',
      country: 'International',
      role: 'Open-Source Firmware & Academic Peer Review',
      contact: 'global@pentatech.org [Placeholder]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 bg-[#090909] overflow-hidden">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Communication Hub"
            title="Connect with Our"
            highlight="Engineering Directorate"
            description="Whether for institutional research inquiries, technology demonstrations, or media requests, we welcome correspondence."
          />
        </div>
      </section>

      {/* Main Form & Information */}
      <section className="py-12 sm:py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Information & Hubs */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="p-5 sm:p-8 rounded-2xl bg-[#111111] border border-[#D99A28]/25 space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857]">
                  Direct Contact
                </span>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D99A28]/30 flex items-center justify-center text-[#FFC857] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#666] uppercase block">General Inquiries</span>
                      <a href={`mailto:${settings.contactEmail}`} className="text-sm font-semibold text-white hover:text-[#FFC857] transition-colors break-all">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D99A28]/30 flex items-center justify-center text-[#FFC857] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#666] uppercase block">Secretariat Line</span>
                      <span className="text-sm font-semibold text-white">
                        {settings.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D99A28]/30 flex items-center justify-center text-[#FFC857] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#666] uppercase block">Main Headquarters</span>
                      <span className="text-xs text-[#A5A5A5] leading-relaxed block mt-0.5">
                        {settings.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Hub Cards */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFC857]">
                  Regional Testbeds & Fabrication Hubs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {regionalHubs.map((hub) => (
                    <div
                      key={hub.city}
                      className="p-4 rounded-xl bg-[#111111] border border-[#D99A28]/20"
                    >
                      <h5 className="text-xs font-bold text-white">{hub.city}</h5>
                      <span className="text-[10px] font-mono text-[#D99A28] block">{hub.country}</span>
                      <p className="text-[11px] text-[#A5A5A5] mt-1.5 leading-snug">{hub.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl bg-[#111111] border border-[#D99A28]/35 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-white">
                    Send a Message to Team Pentatech
                  </h3>
                  <p className="text-xs text-[#A5A5A5] mt-1">
                    Fill out the form below. Inquiries are routed to the appropriate lab or administrative division.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-xl bg-[#171717] border border-[#D99A28]/40 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#FFC857] mx-auto" />
                    <h4 className="text-base font-bold text-white">Message Transmitted</h4>
                    <p className="text-xs text-[#A5A5A5] max-w-sm mx-auto">
                      Thank you for contacting Team Pentatech. Our team has received your communication.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-3 px-4 py-2 rounded-lg bg-[#D99A28] text-black text-xs font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Dr. / Eng. / Prof. / Full Name"
                          className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@domain.com"
                          className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        Subject / Division Inquired
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Research Fellowship / Hardware Licensing / Press"
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        Your Detailed Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type your message here..."
                        className="w-full px-4 py-3 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_25px_rgba(255,200,87,0.4)] transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Transmit Correspondence</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
