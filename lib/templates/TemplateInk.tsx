"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }
export default function TemplateInk({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-900 text-gray-100 w-full h-full p-8 font-sans text-[11px] leading-relaxed">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          {data.photo && <img src={data.photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0" />}
          <h1 className="text-3xl font-black text-white tracking-tight">{data.name || "Your Name"}</h1>
        </div>
        {data.experience?.[0]?.role && <p className="text-yellow-400 font-medium mt-1">{data.experience[0].role}</p>}
        <div className="flex flex-wrap gap-x-4 text-gray-500 mt-2 text-[10px]">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      <div className="h-px bg-gray-700 mb-5" />
      {data.summary && <div className="mb-5"><p className="text-gray-400 border-l-2 border-yellow-400 pl-3">{data.summary}</p></div>}
      {data.experience?.some(e => e.company || e.role) && (
        <div className="mb-5">
          <h2 className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-3">Experience</h2>
          {data.experience.map((exp, i) => (exp.company || exp.role) ? (
            <div key={i} className="mb-4">
              <div className="flex justify-between"><span className="font-bold text-xs text-white">{exp.company}</span><span className="text-[9px] text-gray-500">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
              {exp.role && <p className="text-yellow-400 text-[10px] font-medium mt-0.5 mb-1">{exp.role}</p>}
              {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-400 flex gap-1.5 mt-0.5"><span className="text-yellow-600">▸</span>{b}</p>)}
            </div>
          ) : null)}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education?.some(e => e.school) && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-3">Education</h2>
          {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><p className="font-bold text-xs text-white">{edu.school}</p><p className="text-gray-400 text-[10px]">{edu.degree}</p><p className="text-gray-500 text-[9px]">{edu.year}</p></div> : null)}</div>
        )}
        {data.skills?.length > 0 && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1.5">{data.skills.map((s, i) => <span key={i} className="text-[9px] bg-gray-800 border border-gray-700 text-gray-300 px-2 py-0.5 rounded">{s}</span>)}</div></div>
        )}
      </div>
    </div>
  );
}