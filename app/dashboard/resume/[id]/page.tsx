"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface WorkExperience {
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
}

interface Education {
  school: string;
  degree: string;
  year: string;
  gpa: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
}

const empty: ResumeData = {
  name: "", email: "", phone: "", location: "", linkedin: "", summary: "",
  experience: [{ company: "", role: "", start: "", end: "", bullets: [""] }],
  education: [{ school: "", degree: "", year: "", gpa: "" }],
  skills: [],
};

export default function ResumeBuilder() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("Untitled Resume");
  const [data, setData] = useState<ResumeData>(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const init = async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) { router.push("/"); return; }
      const { data: row } = await supabase.from("resumes").select("*").eq("id", id).single();
      if (row) {
        setTitle(row.title);
        if (row.data && Object.keys(row.data).length > 0) setData(row.data);
      }
    };
    init();
  }, []);

  const loadResume = async () => {
    const { data: row } = await supabase.from("resumes").select("*").eq("id", id).single();
    if (row) {
      setTitle(row.title);
      if (row.data && Object.keys(row.data).length > 0) setData(row.data as ResumeData);
    }
  };

  const handleExportPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ format: "a4", unit: "mm" });
    const margin = 20;
    let y = margin;
    const pageH = 297;
    const lineH = 6;
    const check = (h: number) => { if (y + h > pageH - margin) { doc.addPage(); y = margin; } };

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(17, 24, 39);
    doc.text(data.name || "Your Name", margin, y); y += 8;

    if (data.experience?.[0]?.role) {
      doc.setFontSize(11); doc.setTextColor(124, 58, 237);
      doc.text(data.experience[0].role, margin, y); y += 6;
    }

    const contact = [data.email, data.phone, data.location, data.linkedin].filter(Boolean).join("  ·  ");
    if (contact) {
      doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(107, 114, 128);
      doc.text(contact, margin, y); y += 5;
    }

    // Divider
    doc.setDrawColor(124, 58, 237); doc.setLineWidth(0.5);
    doc.line(margin, y, 210 - margin, y); y += 6;

    const sectionTitle = (t: string) => {
      check(8);
      doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(156, 163, 175);
      doc.text(t.toUpperCase(), margin, y); y += 5;
      doc.setDrawColor(243, 244, 246); doc.setLineWidth(0.3);
      doc.line(margin, y, 210 - margin, y); y += 4;
    };

    // Summary
    if (data.summary) {
      sectionTitle("Summary");
      doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(75, 85, 99);
      const lines = doc.splitTextToSize(data.summary, 170);
      lines.forEach((l: string) => { check(lineH); doc.text(l, margin, y); y += lineH; });
      y += 3;
    }

    // Experience
    if (data.experience?.length > 0) {
      sectionTitle("Experience");
      data.experience.forEach((exp) => {
        check(10);
        doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); doc.setTextColor(17, 24, 39);
        doc.text(exp.company || "", margin, y);
        const dateStr = [exp.start, exp.end].filter(Boolean).join(" – ");
        doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(156, 163, 175);
        doc.text(dateStr, 210 - margin, y, { align: "right" });
        y += 5;
        if (exp.role) {
          doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); doc.setTextColor(124, 58, 237);
          doc.text(exp.role, margin, y); y += 5;
        }
        exp.bullets?.filter((b: string) => b.trim()).forEach((b: string) => {
          check(lineH);
          doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(55, 65, 81);
          const lines = doc.splitTextToSize("▸ " + b, 165);
          lines.forEach((l: string) => { check(lineH); doc.text(l, margin + 3, y); y += lineH; });
        });
        y += 3;
      });
    }

    // Education
    if (data.education?.length > 0) {
      sectionTitle("Education");
      data.education.forEach((edu) => {
        check(10);
        doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(17, 24, 39);
        doc.text(edu.school || "", margin, y);
        if (edu.year) {
          doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(156, 163, 175);
          doc.text(edu.year, 210 - margin, y, { align: "right" });
        }
        y += 5;
        if (edu.degree) {
          doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(107, 114, 128);
          doc.text(edu.degree, margin, y); y += 5;
        }
        if (edu.gpa) {
          doc.setFontSize(9); doc.setTextColor(107, 114, 128);
          doc.text("GPA: " + edu.gpa, margin, y); y += 5;
        }
        y += 2;
      });
    }

    // Skills
    if (data.skills?.length > 0) {
      sectionTitle("Skills");
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(55, 65, 81);
      const skillText = data.skills.join("  ·  ");
      const lines = doc.splitTextToSize(skillText, 170);
      lines.forEach((l: string) => { check(lineH); doc.text(l, margin, y); y += lineH; });
    }

    doc.save(`${title}.pdf`);
  };

  const save = async () => {
    setSaving(true);
    await supabase.from("resumes").update({ title, data, updated_at: new Date().toISOString() }).eq("id", id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (field: keyof ResumeData, value: unknown) =>
    setData((d) => ({ ...d, [field]: value }));

  const updateExp = (i: number, field: keyof WorkExperience, value: string) => {
    const exp = [...data.experience];
    (exp[i] as unknown as Record<string, string>)[field] = value;
    set("experience", exp);
  };

  const updateBullet = (ei: number, bi: number, value: string) => {
    const exp = [...data.experience];
    exp[ei].bullets[bi] = value;
    set("experience", exp);
  };

  const addBullet = (ei: number) => {
    const exp = [...data.experience];
    exp[ei].bullets.push("");
    set("experience", exp);
  };

  const removeBullet = (ei: number, bi: number) => {
    const exp = [...data.experience];
    exp[ei].bullets = exp[ei].bullets.filter((_, i) => i !== bi);
    set("experience", exp);
  };

  const addExp = () => set("experience", [...data.experience, { company: "", role: "", start: "", end: "", bullets: [""] }]);
  const removeExp = (i: number) => set("experience", data.experience.filter((_, j) => j !== i));

  const updateEdu = (i: number, field: keyof Education, value: string) => {
    const edu = [...data.education];
    (edu[i] as unknown as Record<string, string>)[field] = value;
    set("education", edu);
  };

  const addEdu = () => set("education", [...data.education, { school: "", degree: "", year: "", gpa: "" }]);
  const removeEdu = (i: number) => set("education", data.education.filter((_, j) => j !== i));

  const addSkill = () => {
    if (skillInput.trim()) {
      set("skills", [...data.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const inp = "w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all";
  const label = "block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 border-b border-white/[0.06] bg-black/80 backdrop-blur px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/dashboard")} className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <span className="text-gray-700">/</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-sm font-medium text-white focus:outline-none border-b border-transparent focus:border-violet-500/50 pb-0.5 transition-all w-48"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-violet-500/40 hover:bg-violet-500/10 transition-all"
          >
            ⬇ Export PDF
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving…" : saved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Personal Info */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Personal Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([["name","Full Name"],["email","Email"],["phone","Phone"],["location","Location"],["linkedin","LinkedIn URL"]] as [keyof ResumeData, string][]).map(([f, l]) => (
              <div key={f} className={f === "linkedin" ? "sm:col-span-2" : ""}>
                <label className={label}>{l}</label>
                <input className={inp} value={data[f] as string} onChange={(e) => set(f, e.target.value)} placeholder={l} />
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Summary</h2>
          <textarea
            className={inp + " resize-none h-24"}
            value={data.summary}
            onChange={(e) => set("summary", e.target.value)}
            placeholder="A brief professional summary..."
          />
        </section>

        {/* Experience */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Experience</h2>
            <button onClick={addExp} className="text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 px-3 py-1.5 rounded-lg transition-colors">
              + Add
            </button>
          </div>
          <div className="space-y-6">
            {data.experience.map((exp, ei) => (
              <div key={ei} className="border border-white/[0.06] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Position {ei + 1}</span>
                  {data.experience.length > 1 && (
                    <button onClick={() => removeExp(ei)} className="text-xs text-red-500/70 hover:text-red-400 transition-colors">Remove</button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className={label}>Company</label><input className={inp} value={exp.company} onChange={(e) => updateExp(ei, "company", e.target.value)} placeholder="Google" /></div>
                  <div><label className={label}>Role</label><input className={inp} value={exp.role} onChange={(e) => updateExp(ei, "role", e.target.value)} placeholder="Software Engineer" /></div>
                  <div><label className={label}>Start</label><input className={inp} value={exp.start} onChange={(e) => updateExp(ei, "start", e.target.value)} placeholder="Jan 2022" /></div>
                  <div><label className={label}>End</label><input className={inp} value={exp.end} onChange={(e) => updateExp(ei, "end", e.target.value)} placeholder="Present" /></div>
                </div>
                <div>
                  <label className={label}>Bullet Points</label>
                  <div className="space-y-2">
                    {exp.bullets.map((b, bi) => (
                      <div key={bi} className="flex gap-2">
                        <input className={inp} value={b} onChange={(e) => updateBullet(ei, bi, e.target.value)} placeholder="Achieved X by doing Y, resulting in Z" />
                        {exp.bullets.length > 1 && (
                          <button onClick={() => removeBullet(ei, bi)} className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => addBullet(ei)} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">+ Add bullet</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Education</h2>
            <button onClick={addEdu} className="text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 px-3 py-1.5 rounded-lg transition-colors">
              + Add
            </button>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500">Education {i + 1}</span>
                  {data.education.length > 1 && (
                    <button onClick={() => removeEdu(i)} className="text-xs text-red-500/70 hover:text-red-400 transition-colors">Remove</button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className={label}>School</label><input className={inp} value={edu.school} onChange={(e) => updateEdu(i, "school", e.target.value)} placeholder="Stanford University" /></div>
                  <div><label className={label}>Degree</label><input className={inp} value={edu.degree} onChange={(e) => updateEdu(i, "degree", e.target.value)} placeholder="B.S. Computer Science" /></div>
                  <div><label className={label}>Year</label><input className={inp} value={edu.year} onChange={(e) => updateEdu(i, "year", e.target.value)} placeholder="2020" /></div>
                  <div><label className={label}>GPA</label><input className={inp} value={edu.gpa} onChange={(e) => updateEdu(i, "gpa", e.target.value)} placeholder="3.9" /></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Skills</h2>
          <div className="flex gap-2 mb-3">
            <input
              className={inp}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addSkill(); }}
              placeholder="e.g. TypeScript, React, Node.js"
            />
            <button onClick={addSkill} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 transition-colors flex-shrink-0">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm bg-violet-500/10 text-violet-300 border border-violet-500/20 px-3 py-1 rounded-full">
                {s}
                <button onClick={() => set("skills", data.skills.filter((_, j) => j !== i))} className="text-violet-500 hover:text-white transition-colors">×</button>
              </span>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end pb-10">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
