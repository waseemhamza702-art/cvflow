"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; }
export default function TemplateSlate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full font-sans text-[11px] leading-relaxed flex">
      <div className="w-1/3 bg-slate-800 text-white p-6">
        <h1 className="text-xl font-bold mb-1">{data.name || "Your Name"}</h1>
        {data.experience?.[0]?.role && <p className="text-slate-300 text-[10px] mb-4">{data.experience[0].role}</p>}
        <div className="space-y-1 text-[9px] text-slate-400 mb-6">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
        {data.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1">{data.skills.map((s, i) => <span key={i} className="text-[8px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{s}</span>)}</div>
          </div>
        )}
        {data.education?.some(e => e.school) && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Education</h2>
            {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><p className="font-bold text-[10px]">{edu.school}</p><p className="text-slate-400 text-[9px]">{edu.degree}</p><p className="text-slate-500 text-[9px]">{edu.year}</p></div> : null)}
          </div>
        )}
      </div>
      <div className="w-2/3 p-6">
        {data.summary && <div className="mb-5"><h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Summary</h2><p className="text-gray-600">{data.summary}</p></div>}
        {data.experience?.some(e => e.company || e.role) && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Experience</h2>
            {data.experience.map((exp, i) => (exp.company || exp.role) ? (
              <div key={i} className="mb-4 border-l-2 border-slate-200 pl-3">
                <div className="flex justify-between"><span className="font-bold text-xs">{exp.company}</span><span className="text-gray-400 text-[9px]">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
                {exp.role && <p className="text-slate-600 font-semibold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-600 flex gap-1.5 mt-0.5"><span className="text-slate-400">▸</span>{b}</p>)}
              </div>
            ) : null)}
          </div>
        )}
      </div>
    </div>
  );
}