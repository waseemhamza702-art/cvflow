"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }
export default function TemplateNova({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-50 text-gray-800 w-full h-full p-8 font-sans text-[11px] leading-relaxed">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            {data.photo && <img src={data.photo} alt="" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />}
            <h1 className="text-2xl font-bold text-gray-900">{data.name || "Your Name"}</h1>
          </div>
          {data.experience?.[0]?.role && <p className="text-blue-600 font-medium mt-0.5">{data.experience[0].role}</p>}
        </div>
        <div className="text-right text-[9px] text-gray-400">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded mb-6" />
      {data.summary && <div className="mb-5"><p className="text-gray-500">{data.summary}</p></div>}
      {data.experience?.some(e => e.company || e.role) && (
        <div className="mb-5">
          <h2 className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-3">Experience</h2>
          {data.experience.map((exp, i) => (exp.company || exp.role) ? (
            <div key={i} className="mb-4 bg-white rounded-lg p-3 shadow-sm">
              <div className="flex justify-between"><span className="font-bold text-xs">{exp.company}</span><span className="text-[9px] text-gray-400">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
              {exp.role && <p className="text-blue-500 text-[10px] font-medium mt-0.5 mb-1">{exp.role}</p>}
              {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-blue-300">▸</span>{b}</p>)}
            </div>
          ) : null)}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education?.some(e => e.school) && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-3">Education</h2>
          {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3 bg-white rounded-lg p-3 shadow-sm"><p className="font-bold text-xs">{edu.school}</p><p className="text-gray-500 text-[10px]">{edu.degree}</p><p className="text-gray-400 text-[9px]">{edu.year}</p></div> : null)}</div>
        )}
        {data.skills?.length > 0 && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1.5">{data.skills.map((s, i) => <span key={i} className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">{s}</span>)}</div></div>
        )}
      </div>
    </div>
  );
}