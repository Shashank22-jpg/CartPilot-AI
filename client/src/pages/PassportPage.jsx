import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileKey,
  ShieldCheck,
  Calendar,
  Clock,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Bot,
  Copy,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

export default function PassportPage() {
  const navigate = useNavigate();
  const { passports, showToast } = useApp();
  const [selectedPassport, setSelectedPassport] = useState(passports[0]);

  React.useEffect(() => {
    if ((!selectedPassport || !passports.some(p => p.passportId === selectedPassport.passportId)) && passports.length > 0) {
      setSelectedPassport(passports[0]);
    }
  }, [passports, selectedPassport]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    showToast(`Copied ${label} to clipboard!`, 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
            <FileKey className="w-3.5 h-3.5 text-violet-400" />
            <span>
              {passports.some((p) => p.isLive)
                ? 'Verified Digital Ownership Registry'
                : 'Ownership & Guarantee Registry (Live + Demo)'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Digital Purchase Passports
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative proof-of-purchase certificates, hardware serial hashes, live 30-day return window countdowns, and automated 24-month warranty tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-800 font-mono text-emerald-400 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>{passports.length} Passports</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Passport Cards list on Left, Detailed Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Passport Thumbnails */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
            Registered Hardware Passports
          </span>

          {passports.map((p) => {
            const isSelected = selectedPassport.passportId === p.passportId;
            return (
              <div
                key={p.passportId}
                onClick={() => setSelectedPassport(p)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-navy-850 to-navy-900 border-violet-500/60 shadow-glow-violet'
                    : 'bg-navy-900 border-navy-800 hover:border-navy-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={p.image}
                    alt={p.productTitle}
                    className="w-14 h-14 rounded-xl object-cover bg-navy-950 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-electric-400 uppercase tracking-wider">
                        {p.brand}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.purchaseDate}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-100 truncate mt-0.5">
                      {p.productTitle}
                    </h4>

                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-medium">
                        {p.warrantyStatus} Warranty
                      </span>
                      {p.returnDaysRemaining > 0 ? (
                        <span className="text-amber-400 font-mono text-[10px]">
                          {p.returnDaysRemaining}d return left
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">
                          Return expired
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Passport Certificate Dossier */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-gradient-to-b from-navy-850 via-navy-900 to-navy-950 border border-navy-750 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Certificate Header */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-electric-500 p-0.5 shadow-glow-violet flex items-center justify-center">
                  <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                    <FileKey className="w-6 h-6 text-violet-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-extrabold text-white">
                      Digital Purchase Passport
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-full">
                      Demo Record
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Token ID: {selectedPassport.passportId}
                  </p>
                </div>
              </div>

              {/* QR Mockup & Protocol Signature */}
              <div className="flex items-center space-x-3 bg-navy-950/80 border border-navy-800 p-2.5 rounded-xl self-start sm:self-center">
                <QrCode className="w-9 h-9 text-slate-300" />
                <div className="text-[10px] font-mono text-slate-400 leading-tight">
                  <span className="text-slate-300 block font-bold">CartPilot Protocol</span>
                  <span>Demo Attestation</span>
                </div>
              </div>
            </div>

            {/* Product & Ownership Information */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">Hardware Item (Sample)</span>
                <span className="text-white font-bold text-sm block">
                  {selectedPassport.productTitle}
                </span>
                <span className="text-slate-400 text-[11px] block">
                  Purchase Price: <strong className="text-white font-mono">{formatCurrency(selectedPassport.purchasePrice)}</strong>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">Hardware Serial & Hash</span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-mono font-bold">
                    {selectedPassport.serialNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedPassport.serialNumber, 'Serial Number')}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono truncate">
                  <span className="truncate">{selectedPassport.transactionHash}</span>
                  <button
                    onClick={() => copyToClipboard(selectedPassport.transactionHash, 'Transaction Hash')}
                    className="text-slate-400 hover:text-white ml-1 flex-shrink-0"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Return Window Countdown & Warranty Tracker */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Return Window Section */}
              <div className="p-5 rounded-2xl bg-navy-950/80 border border-navy-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Return Policy Window</span>
                  </span>
                  <span className="text-[11px] font-mono text-amber-400 font-bold">
                    {selectedPassport.returnDaysRemaining > 0
                      ? `${selectedPassport.returnDaysRemaining} Days Left`
                      : 'Closed'}
                  </span>
                </div>

                <div className="w-full bg-navy-900 rounded-full h-2 overflow-hidden border border-navy-800">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (selectedPassport.returnDaysRemaining /
                          selectedPassport.returnWindowDaysTotal) *
                          100
                      )}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Policy Limit: {selectedPassport.returnWindowDaysTotal} Days</span>
                  <span>Deadline: {selectedPassport.returnDeadline}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Status: <strong>{selectedPassport.returnStatus}</strong>
                </p>
              </div>

              {/* Warranty Coverage Section */}
              <div className="p-5 rounded-2xl bg-navy-950/80 border border-navy-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Warranty Status</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    {selectedPassport.warrantyStatus}
                  </span>
                </div>

                <p className="text-xs text-slate-200">
                  {selectedPassport.warrantyDuration}
                </p>
                <div className="text-[10px] text-slate-400 font-mono">
                  <span>Coverage Expiry: {selectedPassport.warrantyExpires}</span>
                </div>

                <div className="pt-1">
                  <a
                    href={selectedPassport.warrantyClaimUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-electric-400 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Manufacturer Claim Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* AI Post-Purchase Assistance Launcher */}
            <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 to-navy-900 border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>AI Post-Purchase Assistant</span>
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Need troubleshooting, a return packing slip, or warranty claim documentation?
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/assistant?q=${encodeURIComponent(
                      `I need post-purchase support for my ${selectedPassport.productTitle} (Serial: ${selectedPassport.serialNumber}, Passport: ${selectedPassport.passportId}). What is the step-by-step procedure for warranty claim and return?`
                    )}`
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-glow-violet flex items-center space-x-1.5 transition-colors flex-shrink-0"
              >
                <Bot className="w-4 h-4" />
                <span>Launch Claim Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
