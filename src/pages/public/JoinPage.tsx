import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionHeading } from '../../components/common/SectionHeading';
import { PentatechLogo } from '../../components/common/PentatechLogo';
import { PerspectiveScreenLayout } from '../../components/perspective/PerspectiveScreenLayout';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Layers,
  Link,
  Github,
  Award,
  Sparkles
} from 'lucide-react';

interface JoinPageProps {
  onNavigate: (path: string) => void;
}

export const JoinPage: React.FC<JoinPageProps> = ({ onNavigate }) => {
  const { submitApplication, addToast } = useCMS();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    primaryTrack: 'Hardware & Robotics' as const,
    yearsOfExperience: '3-5 Years',
    portfolioUrl: '',
    githubUrl: '',
    motivation: '',
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'PCB Design & Fabrication',
    'Embedded C / RTOS',
  ]);

  const [applicationMode, setApplicationMode] = useState<'3d-terminal' | 'dossier'>('3d-terminal');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableSkills = [
    'PCB Design & Fabrication',
    'Embedded C / RTOS',
    'Autonomous Aerodynamics',
    'Solid-State Power Electronics',
    'Computer Vision & SLAM',
    'TensorFlow / PyTorch Edge AI',
    'FPGA & Verilog',
    '3D CAD & Mechanical Simulation',
    'Firmware Cryptography',
    'Industrial IoT & LoRaWAN',
    'Product Management',
    'Technical Documentation',
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
      addToast('Required Fields Missing', 'Please fill in your full name and email address.', 'error');
      return;
    }

    submitApplication({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '+233 00 000 0000',
      location: formData.location || 'Accra, Ghana',
      primaryTrack: formData.primaryTrack,
      yearsOfExperience: formData.yearsOfExperience,
      portfolioUrl: formData.portfolioUrl || 'https://github.com',
      githubUrl: formData.githubUrl,
      motivation: `${formData.motivation} [Selected Skills: ${selectedSkills.join(', ')}]`,
    });

    setIsSubmitted(true);

    // Trigger golden celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFE09A', '#FFC857', '#D99A28', '#168BDA', '#B52B20'],
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#A5A5A5]">
      {/* Hero */}
      <section className="relative py-14 sm:py-24 border-b border-[#D99A28]/20 bg-[#090909] overflow-hidden">
        <div className="absolute inset-0 bg-triangular-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Admissions & Fellowship"
            title="Join the Continental"
            highlight="Engineering Vanguard"
            description="Team Pentatech admits builders, researchers, and innovators committed to engineering sovereign African technological infrastructure."
          />
        </div>
      </section>

      {/* Experience Mode Switcher */}
      <div className="max-w-md mx-auto px-4 -mt-6 sm:-mt-7 relative z-20">
        <div className="p-1 rounded-2xl bg-[#111111] border border-[#D99A28]/35 flex items-center justify-between shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setApplicationMode('3d-terminal')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              applicationMode === '3d-terminal'
                ? 'bg-[#FFC857] text-black shadow-md font-bold'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Perspective Terminal</span>
          </button>
          <button
            type="button"
            onClick={() => setApplicationMode('dossier')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              applicationMode === 'dossier'
                ? 'bg-[#FFC857] text-black shadow-md font-bold'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Fellowship Dossier</span>
          </button>
        </div>
      </div>

      {applicationMode === '3d-terminal' ? (
        <PerspectiveScreenLayout standalone onNavigate={onNavigate} />
      ) : (
        /* Main Form Section */
        <section className="py-12 sm:py-20 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="p-6 sm:p-14 rounded-3xl bg-[#111111] border border-[#D99A28]/50 text-center space-y-6 shadow-[0_0_60px_rgba(217,154,40,0.2)]">
              <div className="w-16 h-16 rounded-full bg-[#171717] border-2 border-[#FFC857] flex items-center justify-center mx-auto text-[#FFC857]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC857]">
                  Application Recorded
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Welcome, {formData.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A5] max-w-lg mx-auto leading-relaxed">
                  Your fellowship submission has been entered into the Team Pentatech Admissions Registry.
                  Our technical steering committee reviews applications on a rolling cycle.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171717] border border-[#D99A28]/20 max-w-md mx-auto text-left text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#666]">Track:</span>
                  <span className="text-white">{formData.primaryTrack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Applicant Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Status in CMS:</span>
                  <span className="text-[#FFC857]">Pending Review</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#171717] border border-[#D99A28]/40 hover:bg-[#222] text-xs text-white"
                >
                  Submit Another Application
                </button>
                <button
                  onClick={() => onNavigate('/admin')}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FFE09A] to-[#D99A28] text-black text-xs font-semibold hover:shadow-[0_0_20px_rgba(217,154,40,0.3)]"
                >
                  View in Admin Portal
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-10 md:p-12 rounded-3xl bg-[#111111] border border-[#D99A28]/35 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* 1. Personal Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-[#D99A28]/20 pb-2">
                    <User className="w-4 h-4 text-[#FFC857]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      1. Personal & Contact Profile
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Kwame Asante"
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
                        placeholder="kwame@domain.org"
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+233 24 123 4567"
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        City & Country of Residence
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Accra, Ghana / Nairobi, Kenya"
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Technical Track & Experience */}
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-[#D99A28]/20 pb-2">
                    <Briefcase className="w-4 h-4 text-[#FFC857]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      2. Engineering Specialization
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        Primary Engineering Track
                      </label>
                      <select
                        value={formData.primaryTrack}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryTrack: e.target.value as typeof formData.primaryTrack,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                      >
                        <option value="Hardware & Robotics">Hardware & Robotics</option>
                        <option value="Clean Energy">Clean Energy & Microgrids</option>
                        <option value="AI & Data Science">AI & Data Science</option>
                        <option value="Software Engineering">Software Engineering & RTOS</option>
                        <option value="Product & Design">Product & Industrial Design</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        Practical Experience Level
                      </label>
                      <select
                        value={formData.yearsOfExperience}
                        onChange={(e) =>
                          setFormData({ ...formData, yearsOfExperience: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#FFC857]"
                      >
                        <option value="Undergraduate / Self-Taught">Undergraduate / Self-Taught</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years Senior / Lead">5+ Years Senior / Lead</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Skills Selection (Interactive tags) */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-[#D99A28]/20 pb-2">
                    <Layers className="w-4 h-4 text-[#FFC857]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      3. Core Technical Competencies
                    </h3>
                  </div>
                  <p className="text-xs text-[#777] mb-3">
                    Select competencies relevant to your fabrication or software expertise:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FFC857] text-black font-semibold shadow-[0_0_15px_rgba(255,200,87,0.3)]'
                              : 'bg-[#171717] text-[#A5A5A5] hover:text-white border border-[#D99A28]/20'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Portfolio & Repositories */}
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-[#D99A28]/20 pb-2">
                    <Link className="w-4 h-4 text-[#FFC857]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      4. Verification & Portfolio Proof
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        GitHub / GitLab / Hardware Repo URL
                      </label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/yourhandle"
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                        Portfolio / Website / LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, portfolioUrl: e.target.value })
                        }
                        placeholder="https://portfolio.me or linkedin"
                        className="w-full px-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Motivation Statement */}
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-[#D99A28]/20 pb-2">
                    <Award className="w-4 h-4 text-[#FFC857]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      5. Statement of Motivation
                    </h3>
                  </div>
                  <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
                    Why do you wish to build with Team Pentatech?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    placeholder="Tell us about the systems you have built, your engineering challenges, and how you aim to contribute to African technological sovereignty..."
                    className="w-full px-4 py-3 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_35px_rgba(255,200,87,0.4)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Submit Fellowship Application</span>
                    <Send className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-[#666] font-mono mt-3">
                    Submissions are immediately routed to the Team Pentatech Admin Registry.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      )}
    </div>
  );
};
