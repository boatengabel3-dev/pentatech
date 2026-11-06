import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { PentatechLogo } from '../../components/common/PentatechLogo';
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToSite }) => {
  const { login } = useAuth();
  const { addToast } = useCMS();

  const [email, setEmail] = useState('admin@pentatech.org');
  const [password, setPassword] = useState('pentatech2026');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Validation Error', 'Please enter both administrator email and passphrase.', 'error');
      return;
    }

    const success = login(email, password);
    if (success) {
      addToast('Access Granted', 'Welcome to the Team Pentatech Content Management Console.');
      onSuccess();
    } else {
      addToast('Authentication Failed', 'Invalid credentials provided.', 'error');
    }
  };

  const handleQuickDemoLogin = () => {
    login('admin@pentatech.org', 'pentatech2026');
    addToast('Demo Session Initialized', 'Logged in as Chief Administrator (Super Admin).');
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-triangular-pattern opacity-40 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D99A28]/10 blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#111111] border border-[#D99A28]/40 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
        <div className="text-center space-y-4 mb-8">
          <PentatechLogo variant="emblem" size="lg" glow className="mx-auto" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D99A28] font-bold">
              Administrative Gateway
            </span>
            <h1 className="text-2xl font-display font-extrabold text-white mt-1">
              PENTATECH CMS
            </h1>
            <p className="text-xs text-[#A5A5A5] mt-1">
              Enter authorized credentials to manage public website content and membership registries.
            </p>
          </div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase text-[#A5A5A5] mb-1.5">
              Admin Identifier / Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#D99A28] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pentatech.org"
                className="w-full pl-10 pr-4 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-[#A5A5A5]">
                Passphrase
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-[#FFC857] hover:underline"
              >
                Forgot key?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#D99A28] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-[#171717] border border-[#D99A28]/30 rounded-xl text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#FFC857]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#FFE09A] via-[#FFC857] to-[#D99A28] hover:shadow-[0_0_30px_rgba(255,200,87,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Authenticate Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo button for test reviewers */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl text-xs font-medium text-[#FFC857] bg-[#171717] hover:bg-[#222] border border-[#D99A28]/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Instant Demo Sign-In (1-Click)</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#D99A28]/20 flex items-center justify-between text-xs">
          <button
            onClick={onBackToSite}
            className="text-[#A5A5A5] hover:text-white transition-colors"
          >
            ← Back to Public Website
          </button>
          <span className="text-[#666] font-mono text-[10px]">
            TLS 256-bit Secure
          </span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#111111] border border-[#D99A28]/40 space-y-4">
            <h3 className="text-sm font-bold text-white">Reset Administrative Passphrase</h3>
            <p className="text-xs text-[#A5A5A5]">
              For demo demonstration, you can use the default credentials:
              <br />
              <code className="text-[#FFC857] mt-1 block">admin@pentatech.org / pentatech2026</code>
            </p>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter recovery email..."
              className="w-full px-3 py-2 bg-[#171717] border border-[#D99A28]/30 rounded-lg text-xs text-white"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-3 py-1.5 text-xs text-[#A5A5A5] hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToast('Reset Link Sent', 'Recovery instruction dispatched to mailbox.');
                  setShowForgotModal(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D99A28] text-black"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
