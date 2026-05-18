"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const COMPANIES = [
  "Google", "Meta", "Amazon", "Netflix", "Stripe",
  "Airbnb", "Spotify", "Shopify", "Figma", "Notion",
  "Vercel", "Linear", "Slack", "Salesforce", "GitHub",
];

const FEATURES = [
  {
    icon: "sparkles",
    title: "AI Resume Generation",
    desc: "Generate a tailored, professional resume in seconds. Our AI learns from millions of successful resumes to craft yours with precision.",
    badge: "Core",
  },
  {
    icon: "shield",
    title: "ATS Optimization",
    desc: "Pass every applicant tracking system with confidence. We analyze job descriptions and embed the right keywords automatically.",
    badge: "Smart",
  },
  {
    icon: "pencil",
    title: "Resume Tailoring",
    desc: "Instantly customize your resume for any role. Paste a job description and watch CVFlow rewrite your resume to match it perfectly.",
    badge: "Fast",
  },
  {
    icon: "layout",
    title: "Professional Templates",
    desc: "Choose from 50+ designer-crafted templates built for every industry, role, and career stage — from fresh grad to executive.",
    badge: "50+",
  },
  {
    icon: "chat",
    title: "AI Writing Assistant",
    desc: "Struggling with bullet points? Get smart, impact-driven suggestions that highlight your achievements and quantify your results.",
    badge: "AI",
  },
  {
    icon: "download",
    title: "PDF Export",
    desc: "Download pixel-perfect PDFs ready to submit anywhere. Every template is engineered for flawless rendering across all platforms.",
    badge: "Export",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create Your Profile",
    desc: "Import your LinkedIn profile or fill in your work history, skills, and achievements in our guided builder. Takes under 5 minutes.",
    detail: "Smart import · No formatting needed",
  },
  {
    n: "02",
    title: "AI Crafts Your Resume",
    desc: "Our AI analyzes your profile, the target role, and current hiring trends to generate a compelling, ATS-ready resume instantly.",
    detail: "ATS scoring · Keyword analysis",
  },
  {
    n: "03",
    title: "Apply & Land Interviews",
    desc: "Download your polished resume, track applications, and tailor for each new role in seconds. Watch interview invites roll in.",
    detail: "Unlimited exports · Application tracker",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "0",
    period: "forever",
    desc: "Everything you need to get started",
    cta: "Get Started Free",
    featured: false,
    features: [
      "3 resume exports / month",
      "5 professional templates",
      "Basic AI suggestions",
      "ATS keyword check",
      "PDF & DOCX export",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "19",
    period: "month",
    desc: "Unlimited power for serious job seekers",
    cta: "Start Free Trial",
    featured: true,
    features: [
      "Unlimited resume exports",
      "50+ premium templates",
      "Advanced AI writing",
      "ATS score analyzer",
      "One-click job tailoring",
      "Cover letter generator",
      "Application tracker",
      "Priority support",
    ],
  },
  {
    name: "Team",
    price: "49",
    period: "month",
    desc: "For career coaches and recruiting teams",
    cta: "Start Free Trial",
    featured: false,
    features: [
      "Everything in Pro",
      "5 team seats included",
      "Shared template library",
      "Client management",
      "Team analytics dashboard",
      "White-label branding",
      "API access",
      "Dedicated account manager",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "What makes CVFlow different from other resume builders?",
    a: "CVFlow uses advanced AI trained on millions of successful resumes and real hiring data. Unlike generic builders, our AI understands ATS systems, industry-specific keywords, and what hiring managers actually want — giving you a real, measurable edge.",
  },
  {
    q: "Does CVFlow guarantee my resume will pass ATS systems?",
    a: "Our ATS optimization engine analyzes your resume against 300+ ATS patterns and real job descriptions. While no tool can offer absolute guarantees, our users report a 94% pass-through rate — significantly above the industry average of 25%.",
  },
  {
    q: "Can I start with my existing resume?",
    a: "Absolutely. Upload your existing PDF or DOCX and CVFlow will parse and import it instantly. You can also import directly from your LinkedIn profile with one click.",
  },
  {
    q: "What file formats can I export to?",
    a: "All plans support PDF and DOCX export. Pro and Team plans also include TXT (for online applications), JSON (for API integrations), and a shareable web link for your resume.",
  },
  {
    q: "How does the one-click tailoring feature work?",
    a: "Paste any job description into CVFlow and our AI rewrites your resume — reordering sections, adjusting keywords, and rephrasing bullet points — to match that specific role. It takes under 30 seconds.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, completely. Cancel anytime from your account settings with no questions asked. You will retain access until the end of your billing period and can export all your data.",
  },
  {
    q: "Is my data private and secure?",
    a: "Your data is encrypted at rest and in transit using AES-256 and TLS 1.3. We never sell your data or use it to train models without explicit consent. You can permanently delete your account and all data at any time.",
  },
];

const STATS = [
  { value: "50K+", label: "Resumes Built" },
  { value: "94%", label: "Interview Rate" },
  { value: "150+", label: "Templates" },
  { value: "4.9★", label: "User Rating" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSparkles({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function IconShield({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconPencil({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function IconLayout({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function IconChat({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}

function IconDownload({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconChevronDown({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconBars({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function IconX({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}

function getFeatureIcon(icon: string) {
  const cls = "w-5 h-5";
  switch (icon) {
    case "sparkles": return <IconSparkles className={cls} />;
    case "shield":   return <IconShield className={cls} />;
    case "pencil":   return <IconPencil className={cls} />;
    case "layout":   return <IconLayout className={cls} />;
    case "chat":     return <IconChat className={cls} />;
    case "download": return <IconDownload className={cls} />;
    default:         return <IconSparkles className={cls} />;
  }
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function CVFlowLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12h6M9 8h6M9 16h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <span className="font-semibold text-lg tracking-tight text-white">CVFlow</span>
    </div>
  );
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────

type AuthMode = "login" | "signup" | "reset";

function AuthModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setSuccess("Check your email to confirm your account!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else { onClose(); router.push("/dashboard"); }
    }
    setLoading(false);
  };

const handleReset = async () => {
  setError(null);
  setSuccess(null);
  setLoading(true);
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://art-cvflow.vercel.app/",
  });
  if (error) setError(error.message);
  else setSuccess("Password reset email sent! Check your inbox.");
  setLoading(false);
};

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-md rounded-2xl border border-white/[0.1] p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <IconX className="w-4 h-4" />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <CVFlowLogo />
        </div>

        {/* Tab switcher */}
        {mode !== "reset" && (
  <div className="flex glass rounded-xl p-1 mb-6 border border-white/[0.06]">
    {(["login", "signup"] as AuthMode[]).map((m) => (
      <button
        key={m}
        onClick={() => { setMode(m); setError(null); setSuccess(null); }}
        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          mode === m
            ? "bg-violet-600 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        {m === "login" ? "Sign In" : "Sign Up"}
      </button>
    ))}
  </div>
)}

{mode === "reset" && (
  <div className="mb-6">
    <button
      onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
    >
      ← Back to Sign In
    </button>
    <p className="text-white font-semibold mt-3 mb-1">Reset your password</p>
    <p className="text-xs text-gray-500">Enter your email and we&apos;ll send you a reset link.</p>
  </div>
)}

        {/* Fields */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 border border-white/[0.08] focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
              className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 border border-white/[0.08] focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mb-4">
            {success}
          </p>
        )}

        {/* Submit */}
        <button
  onClick={mode === "reset" ? handleReset : handleSubmit}
  disabled={loading || !email || (mode !== "reset" && !password)}
  className="w-full btn-primary py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  {loading ? (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
  ) : (
    <IconSparkles className="w-4 h-4" />
  )}
  {loading ? "Please wait…" : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Email"}
</button>

        {mode === "login" && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <button
              onClick={() => { setMode("reset"); setError(null); setSuccess(null); }}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Forgot your password?
            </button>
            <p className="text-xs text-gray-600">
              Don&apos;t have an account?{" "}
              <button onClick={() => setMode("signup")} className="text-violet-400 hover:text-violet-300 transition-colors">
                Sign up free
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-md border-b border-white/[0.06] py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <CVFlowLogo />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <a href="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 rounded-lg transition-all">Dashboard</a>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="btn-primary px-5 py-2 rounded-lg text-sm font-medium text-white"
                >
                  Start Free
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX /> : <IconBars />}
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-md border-t border-white/[0.06] px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="py-2.5 px-3 text-gray-300 hover:text-white text-sm rounded-lg hover:bg-white/[0.04] transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.06]">
              {user ? (
                <button onClick={handleSignOut} className="flex-1 py-2.5 text-center text-sm text-gray-400 border border-white/[0.08] rounded-lg">
                  Sign Out
                </button>
              ) : (
                <>
                  <button onClick={() => { setAuthOpen(true); setMenuOpen(false); }} className="flex-1 py-2.5 text-center text-sm text-gray-400 border border-white/[0.08] rounded-lg">Sign In</button>
                  <button onClick={() => { setAuthOpen(true); setMenuOpen(false); }} className="flex-1 py-2.5 text-center text-sm font-medium text-white btn-primary rounded-lg">Start Free</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid pt-24 pb-20">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-[120px] animate-glow-breathe pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-700/15 rounded-full blur-[120px] animate-glow-breathe pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-900/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8 flex flex-col items-center text-center">
        {/* Announcement badge */}
        <a
          href="#"
          className="mb-8 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 border border-violet-500/20 hover:border-violet-500/40 transition-colors duration-200 group"
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Introducing CVFlow AI v2.0
          </span>
          <span className="text-gray-500 group-hover:text-gray-300 transition-colors">Read the announcement</span>
          <IconArrowRight className="w-3 h-3 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all" />
        </a>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] mb-6">
          <span className="text-white">Build a job&#8209;winning</span>
          <br />
          <span className="text-white">resume in minutes</span>
          <br />
          <span className="text-gradient">with AI.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mb-10">
          Generate ATS&#8209;optimized resumes, tailor applications instantly,
          and land more interviews effortlessly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-14">
          <a
            href="#"
            className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white w-full sm:w-auto justify-center"
          >
            <IconSparkles className="w-4 h-4" />
            Start Free
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-gray-300 border border-white/[0.1] hover:border-white/[0.2] hover:text-white hover:bg-white/[0.03] transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Build Resume
            <IconArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 mb-16">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center">
              {i > 0 && (
                <span className="hidden sm:block absolute -left-5 top-1/2 -translate-y-1/2 text-gray-800">·</span>
              )}
              <span className="text-2xl font-bold text-white">{s.value}</span>
              <span className="text-xs text-gray-600 mt-0.5 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Product preview */}
        <div className="relative w-full max-w-3xl animate-float">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/30 via-blue-600/20 to-cyan-600/30 blur-xl opacity-70" />

          {/* Browser chrome */}
          <div className="relative glass-md rounded-2xl overflow-hidden border border-white/[0.08]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4 h-6 glass rounded-md flex items-center px-3 gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <span className="text-xs text-gray-500">app.cvflow.ai/builder</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">ATS 97%</span>
            </div>

            {/* App split view */}
            <div className="grid grid-cols-5 min-h-[300px]">
              {/* Editor panel */}
              <div className="col-span-2 border-r border-white/[0.06] p-4 bg-black/30">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Builder</p>

                <div className="mb-3">
                  <p className="text-[9px] text-gray-600 uppercase tracking-wider mb-1">Target Role</p>
                  <div className="glass rounded-lg px-3 py-2 text-xs text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0" />
                    Senior Product Engineer
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-[9px] text-gray-600 uppercase tracking-wider mb-1.5">AI Suggestions</p>
                  <div className="space-y-1.5">
                    {["Add quantifiable metrics", "Include React & TypeScript", "Highlight leadership roles"].map((s) => (
                      <div key={s} className="flex items-center gap-2 glass rounded-lg px-2.5 py-1.5 text-[10px] text-gray-400">
                        <span className="text-violet-400 flex-shrink-0 font-bold">✦</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">ATS Score</span>
                    <span className="text-sm font-bold text-emerald-400">97%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full w-[97%] bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
                  </div>
                  <p className="text-[9px] text-gray-600 mt-1.5">Excellent — passes 300+ ATS systems</p>
                </div>
              </div>

              {/* Resume preview */}
              <div className="col-span-3 p-4 bg-white text-gray-800 relative overflow-hidden">
                <div className="text-[10px] leading-snug">
                  <div className="mb-2.5 pb-2.5 border-b border-gray-100">
                    <h2 className="text-sm font-bold text-gray-900 tracking-tight">Alex Johnson</h2>
                    <p className="text-[10px] text-violet-600 font-medium mt-0.5">Senior Software Engineer</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">alex@email.com · linkedin.com/in/alexj · San Francisco, CA</p>
                  </div>

                  <div className="mb-2">
                    <h3 className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Experience</h3>
                    <div className="mb-1.5">
                      <div className="flex justify-between">
                        <span className="text-[10px] font-bold text-gray-800">Google</span>
                        <span className="text-[8px] text-gray-400">2022 – Present</span>
                      </div>
                      <p className="text-[9px] text-violet-600 font-medium mb-0.5">Senior Software Engineer</p>
                      <ul className="text-[9px] text-gray-600 space-y-0.5 ml-1">
                        <li>· <span className="hl-purple">Led</span> ranking improvements for <span className="hl-blue">2B+ users</span></li>
                        <li>· Reduced latency by <span className="hl-green">40%</span> via caching overhaul</li>
                        <li>· Mentored team of 6 engineers, promoted 3</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-bold text-gray-800">Meta</span>
                        <span className="text-[8px] text-gray-400">2020 – 2022</span>
                      </div>
                      <p className="text-[9px] text-violet-600 font-medium mb-0.5">Software Engineer</p>
                      <ul className="text-[9px] text-gray-600 space-y-0.5 ml-1">
                        <li>· Built pipeline: <span className="hl-blue">500M events/day</span></li>
                        <li>· Contributed to <span className="hl-purple">React</span> open-source core</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mb-2">
                    <h3 className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {["TypeScript","React","Node.js","Go","AWS","PostgreSQL"].map((sk) => (
                        <span key={sk} className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{sk}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Education</h3>
                    <p className="text-[9px] font-semibold text-gray-800">Stanford University · B.S. Computer Science · GPA 3.92</p>
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-violet-600 text-white text-[8px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <IconSparkles className="w-2.5 h-2.5" />
                  AI Optimized
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -bottom-5 -left-4 glass-md rounded-xl px-3.5 py-2.5 border border-white/[0.08] animate-float-delay shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white leading-tight">Interview Request</p>
                <p className="text-[10px] text-gray-400">Google · Today 9:42 AM</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 -right-4 glass-md rounded-xl px-3 py-2.5 border border-emerald-500/20 animate-float-slow shadow-xl">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <IconCheck className="w-3 h-3 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-emerald-400">ATS Passed</p>
                <p className="text-[9px] text-gray-500">Stripe · 97% match</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trusted By ───────────────────────────────────────────────────────────────

function TrustedBy() {
  return (
    <section className="relative py-16 border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
          Trusted by professionals hired at
        </p>
      </div>
      <div className="marquee-fade overflow-hidden">
        <div className="flex animate-marquee">
          {[...COMPANIES, ...COMPANIES].map((company, i) => (
            <div key={i} className="flex-shrink-0 mx-8 flex items-center gap-3">
              <span className="text-gray-600 font-semibold text-sm tracking-tight hover:text-gray-400 transition-colors cursor-default whitespace-nowrap">
                {company}
              </span>
              <span className="text-gray-800 text-xs">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section id="features" className="relative py-28 bg-grid overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-violet-400 border border-violet-500/20 mb-5">
            <IconSparkles className="w-3.5 h-3.5" />
            Powerful Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            Everything you need to{" "}
            <span className="text-gradient">land your dream job</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From AI-powered generation to one-click tailoring, CVFlow is the
            complete career toolkit used by top professionals worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card glass rounded-2xl p-6 border border-white/[0.06] group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/15 group-hover:border-violet-500/30 transition-colors">
                  {getFeatureIcon(f.icon)}
                </div>
                <span className="text-[10px] font-semibold text-gray-600 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {f.badge}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-violet-100 transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Resume Showcase ──────────────────────────────────────────────────────────

function ResumeShowcase() {
  return (
    <section id="showcase" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-blue-400 border border-blue-500/20 mb-6">
              <IconLayout className="w-3.5 h-3.5" />
              Live Preview
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Your resume,{" "}
              <span className="text-gradient">perfected in real&#8209;time</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Watch your resume transform as you type. Every change is
              instantly scored for ATS compatibility, keyword density, and
              readability — so you always know exactly where you stand.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: "sparkles",
                  label: "AI-powered bullet points",
                  desc: "Turn responsibilities into impact-driven achievements automatically.",
                },
                {
                  icon: "shield",
                  label: "Real-time ATS scoring",
                  desc: "See your ATS pass rate update live as you edit your content.",
                },
                {
                  icon: "pencil",
                  label: "One-click job tailoring",
                  desc: "Paste a job description and watch your resume rewrite itself in seconds.",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 group">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-violet-400 flex-shrink-0 mt-0.5 group-hover:border-violet-500/30 transition-colors">
                    {getFeatureIcon(item.icon)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-0.5">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors group"
            >
              See all features
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Right: full resume card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/15 via-blue-600/10 to-cyan-600/15 rounded-3xl blur-2xl" />

            <div className="relative glass-md rounded-2xl border border-white/[0.08] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-black/20">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-[10px] text-gray-600">resume-alex-johnson.pdf</span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              {/* Resume paper */}
              <div className="bg-white m-4 rounded-xl p-6 shadow-2xl text-gray-800">
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Alex Johnson</h2>
                  <p className="text-xs text-violet-600 font-semibold mt-0.5">Senior Software Engineer</p>
                  <div className="flex flex-wrap gap-x-3 text-[10px] text-gray-400 mt-1.5">
                    <span>alex@email.com</span>
                    <span>·</span>
                    <span>linkedin.com/in/alexj</span>
                    <span>·</span>
                    <span>San Francisco, CA</span>
                    <span>·</span>
                    <span>github.com/alexj</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Summary</h3>
                  <p className="text-[10px] text-gray-600 leading-relaxed">
                    Results-driven <span className="hl-purple">senior software engineer</span> with 6+ years building scalable
                    systems at <span className="hl-blue">Google and Meta</span>. Expert in <span className="hl-purple">TypeScript, React, and distributed architecture</span>.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Experience</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-bold text-gray-800">Google</span>
                        <span className="text-[9px] text-gray-400">Jan 2022 – Present</span>
                      </div>
                      <p className="text-[10px] text-violet-600 font-semibold mb-1">Senior Software Engineer · Search Team</p>
                      <ul className="space-y-0.5 text-[10px] text-gray-600">
                        <li>▸ Led core ranking improvements impacting <span className="hl-blue">2B+ daily users</span>, increasing CTR by 12%</li>
                        <li>▸ Redesigned caching layer, reducing p95 latency by <span className="hl-green">40%</span> and infra cost by $2.4M/yr</li>
                        <li>▸ Managed and mentored a team of 6 engineers across 3 time zones</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-bold text-gray-800">Meta</span>
                        <span className="text-[9px] text-gray-400">Jun 2020 – Dec 2021</span>
                      </div>
                      <p className="text-[10px] text-violet-600 font-semibold mb-1">Software Engineer · Infrastructure</p>
                      <ul className="space-y-0.5 text-[10px] text-gray-600">
                        <li>▸ Architected real-time event pipeline processing <span className="hl-blue">500M events/day</span></li>
                        <li>▸ Contributed 15 merged PRs to <span className="hl-purple">React</span> open-source core</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {["TypeScript","React","Next.js","Node.js","Go","Python","AWS","PostgreSQL","Redis"].map((sk) => (
                        <span key={sk} className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">{sk}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Education</h3>
                    <p className="text-[10px] font-semibold text-gray-800">Stanford University</p>
                    <p className="text-[9px] text-gray-500">B.S. Computer Science</p>
                    <p className="text-[9px] text-gray-400">GPA 3.92 · Class of 2020</p>
                  </div>
                </div>
              </div>

              {/* Floating keyword tag */}
              <div className="absolute top-16 -right-3 glass-md rounded-lg px-3 py-2 border border-violet-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-[10px] font-medium text-violet-300">12 keywords matched</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 bg-grid overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-violet-400 border border-violet-500/20 mb-5">
            <IconCheck className="w-3.5 h-3.5" />
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            From zero to hired in{" "}
            <span className="text-gradient">three steps</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            No complicated setup. No learning curve. Just results.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-[2.75rem] left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-px">
            <div className="h-full bg-gradient-to-r from-violet-600/50 via-blue-600/50 to-cyan-600/50" />
          </div>

          {STEPS.map((step) => (
            <div key={step.n} className="relative">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="relative w-11 h-11 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-blue-600" />
                  <div className="absolute inset-[2px] rounded-full bg-black flex items-center justify-center">
                    <span className="text-xs font-bold text-gradient-warm">{step.n}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-violet-500/20 transition-colors group cursor-default">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-violet-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                <div className="flex flex-wrap items-center gap-2 text-[10px]">
                  {step.detail.split("·").map((d, j) => (
                    <span key={j} className="text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded-full font-medium">
                      {d.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white">
            <IconSparkles className="w-4 h-4" />
            Build Your Resume Now
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-violet-400 border border-violet-500/20 mb-5">
            <IconStar className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            Simple,{" "}
            <span className="text-gradient">honest pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            No hidden fees. No surprise charges. Cancel anytime.
          </p>

          <div className="inline-flex items-center gap-0 glass rounded-full px-1.5 py-1.5 border border-white/[0.06]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !annual ? "bg-white/[0.08] text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual ? "bg-white/[0.08] text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Annual
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PRICING.map((plan) => {
            const price =
              plan.price === "0"
                ? "0"
                : annual
                ? String(Math.round(Number(plan.price) * 0.8))
                : plan.price;

            return (
              <div
                key={plan.name}
                className={`pricing-card relative rounded-2xl p-7 flex flex-col ${
                  plan.featured
                    ? "bg-gradient-to-b from-violet-950/80 to-violet-950/30 border border-violet-500/40"
                    : "glass border border-white/[0.06]"
                }`}
              >
                {plan.featured && (
                  <>
                    <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-violet-300 bg-violet-500/20 border border-violet-500/30 px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  </>
                )}

                <div className="mb-6 pt-2">
                  <h3 className="text-base font-semibold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mb-5">{plan.desc}</p>

                  <div className="flex items-end gap-1.5">
                    <span className="text-4xl font-bold text-white tracking-tight">${price}</span>
                    <span className="text-sm text-gray-500 mb-1.5">
                      {plan.price === "0"
                        ? "forever free"
                        : `/ mo${annual ? ", billed yearly" : ""}`}
                    </span>
                  </div>
                </div>

                <a
                  href="#"
                  className={`mb-7 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${
                    plan.featured
                      ? "btn-primary text-white"
                      : "border border-white/[0.1] text-gray-300 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.03]"
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.featured
                            ? "bg-violet-500/20 text-violet-400"
                            : "bg-white/[0.05] text-gray-500"
                        }`}
                      >
                        <IconCheck className="w-2.5 h-2.5" />
                      </div>
                      <span className={`text-sm leading-snug ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-8 text-xs text-gray-600">
          All paid plans include a 14-day free trial · No credit card required to start
        </p>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 bg-grid overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-violet-400 border border-violet-500/20 mb-5">
            <IconChat className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            Questions?{" "}
            <span className="text-gradient">We have answers</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about CVFlow.{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
              Talk to us
            </a>{" "}
            if you need more.
          </p>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`glass rounded-2xl border transition-all duration-300 ${
                openIdx === i
                  ? "border-violet-500/25 bg-violet-950/20"
                  : "border-white/[0.06] hover:border-white/[0.1]"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className={`text-sm font-medium leading-snug transition-colors ${openIdx === i ? "text-white" : "text-gray-300"}`}>
                  {item.q}
                </span>
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    openIdx === i
                      ? "bg-violet-500/20 border-violet-500/30 text-violet-400 rotate-180"
                      : "border-white/[0.1] text-gray-500"
                  }`}
                >
                  <IconChevronDown className="w-3.5 h-3.5" />
                </div>
              </button>

              <div className={`faq-content ${openIdx === i ? "open" : ""}`}>
                <div className="faq-inner">
                  <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-black to-blue-950/40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-700/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} className="w-4 h-4 text-yellow-400" />
          ))}
        </div>

        <blockquote className="text-gray-400 text-base italic max-w-lg mx-auto leading-relaxed mb-10">
          &ldquo;CVFlow rewrote my resume in 30 seconds and I landed 3 interviews
          in a week. Genuinely the best career tool I&apos;ve ever used.&rdquo;
          <footer className="mt-3 not-italic flex items-center justify-center gap-2">
            <span className="text-sm font-semibold text-white">Jordan K.</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">Software Engineer, hired at Stripe</span>
          </footer>
        </blockquote>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Ready to land your{" "}
          <span className="text-gradient">dream job?</span>
        </h2>
        <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Join 50,000+ professionals building their careers with CVFlow. Start free — no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white w-full sm:w-auto justify-center">
            <IconSparkles className="w-5 h-5" />
            Start Building for Free
          </a>
          <a href="#pricing" className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-gray-300 border border-white/[0.1] hover:border-white/[0.25] hover:text-white hover:bg-white/[0.03] transition-all duration-200 w-full sm:w-auto justify-center">
            View Pricing
            <IconArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          Free forever plan available · No credit card needed · Cancel anytime
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_COLS: Record<string, string[]> = {
  Product: ["Features", "Templates", "Pricing", "AI Writing", "ATS Checker", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press Kit", "Partners", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security", "GDPR"],
};

const SOCIAL_ICONS: { label: string; d: string }[] = [
  {
    label: "Twitter",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    label: "GitHub",
    d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  },
];

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2">
            <CVFlowLogo />
            <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-xs">
              The AI-powered resume builder trusted by 50,000+ professionals to
              land their dream jobs at top companies worldwide.
            </p>
            <div className="flex gap-2 mt-6">
              {SOCIAL_ICONS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 glass rounded-lg border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/[0.12] transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_COLS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} CVFlow, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-600">All systems operational</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600">Made with</span>
            <span className="text-red-500 text-xs">♥</span>
            <span className="text-xs text-gray-600">for job seekers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <ResumeShowcase />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
