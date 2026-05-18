"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) { router.push("/"); return; }
      setUserEmail(sessionData.session.user.email ?? "");
      const { data: list } = await supabase
        .from("resumes")
        .select("*")
        .order("updated_at", { ascending: false });
      setResumes(list || []);
      setLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createResume = async () => {
    const { data: s } = await supabase.auth.getSession();
    console.log("SESSION:", s.session?.user?.id);
    console.log("ACCESS TOKEN:", s.session?.access_token?.slice(0,20));
    const { data: { session } } = await supabase.auth.getSession();
    const { data: nr } = await supabase
      .from("resumes")
      .insert({ title: "Untitled Resume", data: {}, user_id: session?.user.id })
      .select()
      .single();
    if (nr) router.push(`/dashboard/resume/${nr.id}`);
  };

  const deleteResume = async (id: string) => {
    await supabase.from("resumes").delete().eq("id", id);
    setResumes(prev => prev.filter((r) => r.id !== id));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                <path d="M9 12h6M9 8h6M9 16h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight">CVFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">{userEmail}</span>
          <button onClick={signOut} className="text-sm text-gray-400 hover:text-white border border-white/[0.08] px-4 py-2 rounded-lg transition-all">
            Sign Out
          </button>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">My Resumes</h1>
            <p className="text-gray-500 mt-1 text-sm">Create and manage your resumes</p>
          </div>
          <button onClick={createResume} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-opacity">
            + New Resume
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <svg className="w-6 h-6 animate-spin text-violet-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">No resumes yet</h2>
            <p className="text-gray-500 text-sm mb-6">Create your first resume to get started</p>
            <button onClick={createResume} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-opacity">
              Create First Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="group relative bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-6 cursor-pointer transition-all" onClick={() => router.push(`/dashboard/resume/${resume.id}`)}>
                <h3 className="font-semibold text-white mb-1">{resume.title}</h3>
                <p className="text-xs text-gray-600">Updated {new Date(resume.updated_at).toLocaleDateString()}</p>
                <button onClick={(e) => { e.stopPropagation(); deleteResume(resume.id); }} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-700 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
