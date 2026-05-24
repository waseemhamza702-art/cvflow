"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }
export default function TemplateElegant({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full font-sans text-[11px] leading-relaxed flex">
      <div className="w-2/5 bg-emerald-800 text-white p-6">
        <div className="mb-6">
          {data.photo && <img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-emerald-600 mb-3" />}
          <h1 className="text-xl font-bold leading-tight">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-emerald-300 text-[10px] mt-1">{data.experience[0].role}</p>}
        </div>
        <div className="mb-6 space-y-1 text-[9px] text-emerald-300">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
        {data.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-3">Skills</h2>
            <div className="space-y-1">{data.skills.map((s, i) => <div key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" /><span className="text-[9px] text-emerald-100">{s}</span></div>)}</div>
          </div>
        )}
        {data.education?.some(e => e.school) && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-3">Education</h2>
            {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><p className="font-bold text-[10px]">{edu.school}</p><p className="text-emerald-300 text-[9px]">{edu.degree}</p><p className="text-emerald-400 text-[9px]">{edu.year}</p></div> : null)}
          </div>
        )}
      </div>
      <div className="w-3/5 p-6">
        {data.summary && <div className="mb-5"><h2 className="text-[9px] font-black uppercase tracking-widest text-emerald-700 mb-2">About Me</h2><p className="text-gray-600">{data.summary}</p></div>}
        {data.experience?.some(e => e.company || e.role) && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-widest text-emerald-700 mb-3">Experience</h2>
            {data.experience.map((exp, i) => (exp.company || exp.role) ? (
              <div key={i} className="mb-4 pl-4 border-l-2 border-emerald-200">
                <div className="flex justify-between"><span className="font-bold text-xs">{exp.company}</span><span className="text-[9px] text-gray-400">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
                {exp.role && <p className="text-emerald-600 text-[10px] font-medium mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-emerald-400">▸</span>{b}</p>)}
              </div>
            ) : null)}
          </div>
        )}
      </div>
    </div>
  );
}