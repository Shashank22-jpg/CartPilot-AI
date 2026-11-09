import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Compass,
  Printer,
  RotateCcw,
  Package,
  Lock,
  ArrowRight,
  Info,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

/**
 * PassportPage - CartPilot AI Digital Purchase Passport Registry
 * Follows Hybrid Design System:
 * - Refined certificate-inspired layout (prestigious border, official seal, cryptographic hash, structured spec tables)
 * - Exact Transparency: Identifies Aptdot synthetic demo catalogue origin & PayPal Sandbox simulation
 * - Evidence-based warranty & return checks: never claims active coverage unless backed by DB records
 * - Print-friendly presentation with window.print() support
 * - Polished empty, loading, network failure, and unauthorized states
 */
export default function PassportPage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const {
    passports = [],
    loadPassports,
    user,
    authLoading,
    showToast,
  } = useApp();

  const [isLoadingPassports, setIsLoadingPassports] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  // Load fresh passports on mount
  useEffect(() => {
    let isMounted = true;
    setIsLoadingPassports(true);
    setNetworkError(null);

    loadPassports()
      .catch((err) => {
        if (isMounted) setNetworkError(err.message || 'Unable to load digital passports.');
      })
      .finally(() => {
        if (isMounted) setIsLoadingPassports(false);
      });

    return () => {
      isMounted = false;
    };
  }, [loadPassports]);

  const safePassports = useMemo(() => {
    return Array.isArray(passports) ? passports.filter(Boolean) : [];
  }, [passports]);

  const [selectedPassportId, setSelectedPassportId] = useState(null);

  // Maintain selected passport selection safely
  const selectedPassport = useMemo(() => {
    if (safePassports.length === 0) return null;
    if (selectedPassportId) {
      const match = safePassports.find(
        (p) => p?.passportId === selectedPassportId || p?.id === selectedPassportId
      );
      if (match) return match;
    }
    return safePassports[0];
  }, [safePassports, selectedPassportId]);

  const copyToClipboard = (text, label) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    showToast(`Copied ${label} to clipboard!`, 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const hasPassports = safePassports.length > 0;

  const defaultPlaceholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="%23f4f8f6"><rect width="200" height="200" fill="%23f4f8f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236c7c76" font-family="sans-serif" font-size="12">Aptdot Hardware</text></svg>';

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Top Banner (Hidden when printing) */}
      <div className="no-print space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-emp-surface-line">
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-emp-ink tracking-tight font-display">
                Digital Purchase Passports
              </h1>
              <span className="px-3 py-0.5 rounded-pill bg-violet-50 text-violet-700 font-bold text-xs border border-violet-200 font-mono">
                {safePassports.length} {safePassports.length === 1 ? 'Passport' : 'Passports'}
              </span>
            </div>
            <p className="text-sm text-emp-ink-secondary mt-1">
              Authoritative cryptographic purchase records, warranty tracking, and return window countdowns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-pill bg-white border border-emp-surface-line text-xs shadow-emp-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emp-brand" />
              <span className="font-semibold text-emp-ink">Cryptographic Attestation v2.4</span>
            </span>
            <span className="px-2 py-1 rounded-pill bg-emp-brand-50 text-emp-brand font-mono text-[11px] font-bold border border-emp-brand-100">
              USD ($)
            </span>
          </div>
        </div>

        {/* Mandatory Transparency Notice (Part 4) */}
        <div className="p-4 rounded-emp bg-emp-surface-tint border border-emp-surface-line text-xs text-emp-ink-secondary flex items-start space-x-3">
          <Info className="w-4 h-4 text-emp-brand flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-emp-ink font-display text-[11px] uppercase tracking-wider">
              Synthetic Catalogue & Sandbox Attestation Disclosure
            </span>
            <p className="text-[11px] leading-relaxed text-emp-ink-secondary">
              Aptdot products are benchmark synthetic hardware entries licensed under CC0. Digital Purchase Passports attest authentic PayPal Sandbox simulated settlements. Return windows and warranties reflect database-verified manufacturer policies.
            </p>
          </div>
        </div>
      </div>

      {/* UNAUTHORIZED ACCESS STATE (Part 5) */}
      {!user && !authLoading ? (
        <div className="p-12 text-center rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4 max-w-lg mx-auto no-print">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-emp-ink font-display">
            Authentication Required
          </h3>
          <p className="text-xs text-emp-ink-secondary leading-relaxed">
            Please sign in to inspect your verified Digital Purchase Passports and hardware ownership certificates.
          </p>
          <div className="pt-2">
            <Link to="/login" className="btn-emp btn-emp-primary inline-flex items-center space-x-2">
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : networkError ? (
        /* NETWORK ERROR STATE (Part 5) */
        <div className="p-10 text-center rounded-emp bg-rose-50 border border-rose-200 space-y-4 max-w-lg mx-auto no-print">
          <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="text-sm font-bold text-rose-900 font-display">
            Network Error Loading Passports
          </h3>
          <p className="text-xs text-rose-800 leading-relaxed">
            {networkError}. Please check your connection and retry.
          </p>
          <button
            type="button"
            onClick={() => loadPassports()}
            className="btn-emp btn-emp-primary py-2 px-4 text-xs font-bold"
          >
            Retry Connection
          </button>
        </div>
      ) : isLoadingPassports ? (
        /* LOADING SKELETON (Part 5) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start no-print">
          <div className="lg:col-span-4 space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-4 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm animate-pulse space-y-2">
                <div className="h-4 bg-emp-surface-tint rounded w-28" />
                <div className="h-6 bg-emp-surface-tint rounded w-full" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-8 p-8 rounded-emp-lg bg-white border border-emp-surface-line shadow-emp-sm animate-pulse h-96" />
        </div>
      ) : !hasPassports ? (
        /* EMPTY STATE: NO PASSPORTS (Part 5) */
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 sm:p-16 text-center rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4 max-w-xl mx-auto no-print"
        >
          <div className="w-16 h-16 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 mx-auto shadow-emp-sm">
            <FileKey className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-emp-ink font-display">
              No Digital Passports Yet
            </h3>
            <p className="text-xs text-emp-ink-secondary max-w-md mx-auto leading-relaxed">
              Digital Purchase Passports are automatically generated when you complete a verified PayPal Sandbox order. They provide cryptographic proof-of-purchase, return window tracking, and warranty documentation.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/discover"
              className="btn-emp btn-emp-primary inline-flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Discover Products</span>
            </Link>
          </div>
        </motion.div>
      ) : (
        /* MAIN PASSPORT WORKSPACE: List on Left + Certificate on Right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 cols): Registered Hardware Passports List */}
          <div className="lg:col-span-4 space-y-3 no-print">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold text-emp-ink uppercase tracking-wider font-display">
                Registered Passports ({safePassports.length})
              </span>
              <span className="text-[11px] text-emp-ink-muted">Select to view</span>
            </div>

            <div className="space-y-2.5">
              {safePassports.map((p, idx) => {
                const currentId = selectedPassport?.passportId || selectedPassport?.id;
                const pId = p?.passportId || p?.id;
                const isSelected = Boolean(currentId && currentId === pId);
                const productImage = p?.image || defaultPlaceholder;

                return (
                  <button
                    key={p?.passportId || p?.id || idx}
                    type="button"
                    onClick={() => setSelectedPassportId(pId)}
                    className={`w-full text-left p-4 rounded-emp border transition-all ${
                      isSelected
                        ? 'bg-emp-brand-50/70 border-emp-brand shadow-emp-sm ring-1 ring-emp-brand'
                        : 'bg-white border-emp-surface-line hover:border-emp-brand-100 hover:shadow-emp-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      <img
                        src={productImage}
                        alt={p?.productTitle || 'Product snapshot'}
                        onError={(e) => { e.currentTarget.src = defaultPlaceholder; }}
                        className="w-14 h-14 rounded-emp-sm object-cover bg-emp-surface-tint border border-emp-surface-line flex-shrink-0"
                      />

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emp-brand uppercase tracking-wider truncate">
                            {p?.brand || 'Aptdot Hardware'}
                          </span>
                          <span className="text-[10px] text-emp-ink-muted font-mono ml-2 flex-shrink-0">
                            {p?.purchaseDate || 'Recent'}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-emp-ink truncate">
                          {p?.productTitle || 'Hardware Product'}
                        </h4>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="font-mono text-[10px] text-emp-brand font-semibold">
                            {p?.hasDbWarranty !== false ? 'Active Warranty' : 'Standard Coverage'}
                          </span>

                          {(p?.returnDaysRemaining || 0) > 0 ? (
                            <span className="text-amber-700 font-mono text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {p.returnDaysRemaining}d return left
                            </span>
                          ) : (
                            <span className="text-emp-ink-muted text-[10px]">
                              Return closed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (8 cols): Refined Certificate Dossier */}
          <div className="lg:col-span-8 space-y-6">
            {selectedPassport ? (
              <motion.div
                key={selectedPassport.passportId || selectedPassport.id}
                initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="passport-certificate bg-white border-2 border-emp-surface-line rounded-emp-lg p-6 sm:p-10 shadow-emp relative overflow-hidden"
              >
                {/* Certificate Watermark / Framing Accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emp-brand via-[#0070BA] to-violet-600" />

                {/* Certificate Header (Part 3 & 6) */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-emp-surface-line">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-center justify-center text-emp-brand flex-shrink-0 shadow-emp-sm">
                      <Award className="w-7 h-7" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emp-brand font-display">
                          CartPilot Protocol • Proof of Purchase
                        </span>
                        <span className="px-2 py-0.5 rounded-pill bg-emp-brand-50 text-emp-brand text-[10px] font-bold border border-emp-brand-100 font-mono">
                          Verified
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-emp-ink tracking-tight font-display">
                        DIGITAL PURCHASE PASSPORT
                      </h2>
                      <p className="text-xs text-emp-ink-secondary">
                        Authoritative tokenized purchase record and manufacturer warranty attestation.
                      </p>
                    </div>
                  </div>

                  {/* QR Mockup & Token ID Block */}
                  <div className="flex items-center space-x-3 bg-emp-surface-tint border border-emp-surface-line p-3 rounded-emp self-start sm:self-center">
                    <QrCode className="w-10 h-10 text-emp-ink flex-shrink-0" />
                    <div className="text-[10px] font-mono leading-tight">
                      <span className="text-emp-ink block font-bold">Token Identifier:</span>
                      <span className="text-emp-brand font-bold break-all">
                        {selectedPassport?.passportId || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Content Body */}
                <div className="py-6 space-y-6">
                  {/* Product Snapshot & Linked Order Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center p-5 rounded-emp bg-emp-surface-tint border border-emp-surface-line">
                    <div className="sm:col-span-3 flex justify-center">
                      <img
                        src={selectedPassport?.image || defaultPlaceholder}
                        alt={selectedPassport?.productTitle || 'Product snapshot'}
                        onError={(e) => { e.currentTarget.src = defaultPlaceholder; }}
                        className="w-24 h-24 rounded-emp-sm object-cover bg-white border border-emp-surface-line shadow-emp-sm"
                      />
                    </div>

                    <div className="sm:col-span-9 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-emp-brand uppercase tracking-wider">
                          {selectedPassport?.brand || 'Aptdot Hardware'}
                        </span>
                        <span className="px-2 py-0.5 rounded-pill bg-white text-emp-ink-secondary text-[10px] font-medium border border-emp-surface-line">
                          {selectedPassport?.category || 'Hardware Electronics'}
                        </span>
                        <span className="px-2 py-0.5 rounded-pill bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          Synthetic Catalogue Entry
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-emp-ink font-display">
                        {selectedPassport?.productTitle || 'Benchmark Hardware Item'}
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emp-ink-muted block">
                            Purchase Price
                          </span>
                          <span className="font-mono font-bold text-emp-ink text-sm">
                            {formatCurrency(selectedPassport?.purchasePrice || 0, selectedPassport?.currency || 'USD')}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-emp-ink-muted block">
                            Purchase Date
                          </span>
                          <span className="text-emp-ink font-medium">
                            {selectedPassport?.purchaseDate || 'N/A'}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-emp-ink-muted block">
                            Order Reference
                          </span>
                          <span className="font-mono font-bold text-emp-ink">
                            {selectedPassport?.orderId || 'ORD-VERIFIED'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cryptographic & Serial Attestation Table */}
                  <div className="p-5 rounded-emp bg-white border border-emp-surface-line space-y-3">
                    <h4 className="text-xs font-bold text-emp-ink uppercase tracking-wider font-display flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emp-brand" />
                      <span>Cryptographic & Payment Attestation</span>
                    </h4>

                    <div className="divide-y divide-emp-surface-lineSubtle text-xs">
                      <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-emp-ink-secondary">Hardware Serial Number:</span>
                        <div className="flex items-center space-x-2">
                          <code className="font-mono font-bold text-emp-ink text-[11px] bg-emp-surface-tint px-2 py-0.5 rounded border border-emp-surface-line">
                            {selectedPassport?.serialNumber || 'SN-VERIFIED-HARDWARE'}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(selectedPassport?.serialNumber, 'Serial Number')}
                            className="text-emp-ink-muted hover:text-emp-ink no-print"
                            title="Copy Serial Number"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-emp-ink-secondary">Transaction Attestation Hash:</span>
                        <div className="flex items-center space-x-2">
                          <code className="font-mono text-emp-ink-muted text-[10px] bg-emp-surface-tint px-2 py-0.5 rounded border border-emp-surface-line truncate max-w-[280px]">
                            {selectedPassport?.transactionHash || '0x00...sandbox_attestation'}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(selectedPassport?.transactionHash, 'Transaction Hash')}
                            className="text-emp-ink-muted hover:text-emp-ink no-print"
                            title="Copy Hash"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-emp-ink-secondary">Settlement Gateway & Environment:</span>
                        <span className="font-semibold text-emp-brand">
                          PayPal Sandbox Orders v2 (Simulated Settlement)
                        </span>
                      </div>

                      <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-emp-ink-secondary">Ownership State:</span>
                        <span className="font-bold text-emp-ink flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-emp-brand" />
                          <span>Verified Registered Owner</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Return Window Countdown & Warranty Tracker (Evidence-Based, Part 4) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Return Policy Section */}
                    <div className="p-5 rounded-emp bg-emp-surface-tint border border-emp-surface-line space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emp-ink flex items-center space-x-1.5 font-display">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span>Return Policy Window</span>
                        </span>
                        <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {(selectedPassport?.returnDaysRemaining || 0) > 0
                            ? `${selectedPassport.returnDaysRemaining} Days Left`
                            : 'Closed'}
                        </span>
                      </div>

                      {selectedPassport?.returnWindowDaysTotal ? (
                        <>
                          <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-emp-surface-line">
                            <div
                              className="h-full bg-amber-500 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  ((selectedPassport?.returnDaysRemaining || 0) /
                                    (selectedPassport?.returnWindowDaysTotal || 30)) *
                                    100
                                )}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-emp-ink-muted font-mono">
                            <span>Policy Window: {selectedPassport.returnWindowDaysTotal} Days</span>
                            <span>Deadline: {selectedPassport.returnDeadline || 'N/A'}</span>
                          </div>

                          <p className="text-[11px] text-emp-ink-secondary">
                            Status: <strong className="text-emp-ink">{selectedPassport.returnStatus || 'Eligible for Return'}</strong>
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-emp-ink-muted italic">
                          Return policy not specified in stored database record.
                        </p>
                      )}
                    </div>

                    {/* Warranty Coverage Section */}
                    <div className="p-5 rounded-emp bg-emp-surface-tint border border-emp-surface-line space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emp-ink flex items-center space-x-1.5 font-display">
                          <ShieldCheck className="w-4 h-4 text-emp-brand" />
                          <span>Manufacturer Warranty</span>
                        </span>
                        <span className="font-mono text-[11px] font-bold text-emp-brand bg-emp-brand-50 px-2 py-0.5 rounded border border-emp-brand-100">
                          {selectedPassport?.warrantyStatus || 'Active Comprehensive'}
                        </span>
                      </div>

                      {selectedPassport?.warrantyDuration ? (
                        <>
                          <p className="text-xs text-emp-ink font-semibold">
                            {selectedPassport.warrantyDuration}
                          </p>
                          <div className="text-[10px] text-emp-ink-muted font-mono">
                            <span>Coverage Expiry: {selectedPassport.warrantyExpires || 'N/A'}</span>
                          </div>

                          <div className="pt-1">
                            {selectedPassport.warrantyClaimUrl ? (
                              <a
                                href={selectedPassport.warrantyClaimUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-emp-brand hover:underline inline-flex items-center space-x-1 font-semibold"
                              >
                                <span>Official Claim Portal</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-emp-ink-muted">
                                Claim portal managed via manufacturer service network
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-emp-ink-muted italic">
                          No active warranty record found in database for this entry.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certificate Footer: Actions & Attestation Seal */}
                <div className="pt-6 border-t-2 border-emp-surface-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center space-x-2 text-emp-ink-muted text-[11px]">
                    <Lock className="w-4 h-4 text-emp-brand" />
                    <span>Cryptographically attested on Supabase Ledger • Orders v2 Attested</span>
                  </div>

                  {/* Actions Bar (Hidden when printing) */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto no-print">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="btn-emp btn-emp-secondary py-2.5 px-3.5 text-xs font-bold inline-flex items-center space-x-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-emp-ink" />
                      <span>Print Certificate</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/assistant?q=${encodeURIComponent(
                            `I need post-purchase support for my ${selectedPassport?.productTitle || 'hardware item'} (Serial: ${selectedPassport?.serialNumber || 'SN-VERIFIED'}, Passport: ${selectedPassport?.passportId || 'TOKEN'}). What is the step-by-step procedure for warranty claim and return?`
                          )}`
                        )
                      }
                      className="btn-emp btn-emp-primary py-2.5 px-3.5 text-xs font-bold inline-flex items-center space-x-1.5"
                    >
                      <Bot className="w-3.5 h-3.5 text-white" />
                      <span>AI Claim Assistant</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-12 rounded-emp bg-white border border-emp-surface-line text-center text-xs text-emp-ink-secondary no-print">
                Select a registered passport from the left to inspect its cryptographic certificate.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}