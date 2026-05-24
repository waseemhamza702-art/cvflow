"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }
export default function TemplateClean({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full p-8 font-sans text-[11px] leading-relaxed">
      <div className="border-b-2 border-violet-600 pb-4 mb-5 flex items-start gap-4">
        {data.photo && <img src={data.photo} alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-violet-100" />}
        <div>
        <h1 className="text-2xl font-bold text-gray-900">{data.name || "Your Name"}</h1>
        {data.experience?.[0]?.role && <p className="text-sm text-violet-600 font-semibold mt-0.5">{data.experience[0].role}</p>}
        <div className="flex flex-wrap gap-x-3 text-gray-500 mt-1.5 text-[10px]">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>· {data.phone}</span>}
          {data.location && <span>· {data.location}</span>}
          {data.linkedin && <span>· {data.linkedin}</span>}
        </div>
        </div>
      </div>
      {data.summary && <div className="mb-5"><h2 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Summary</h2><p className="text-gray-600">{data.summary}</p></div>}
      {data.experience?.some(e => e.company || e.role) && (
        <div className="mb-5">
          <h2 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-100 pb-1">Experience</h2>
          {data.experience.map((exp, i) => (exp.company || exp.role) ? (
            <div key={i} className="mb-4">
              <div className="flex justify-between"><span className="font-bold text-xs">{exp.company}</span><span className="text-gray-400 text-[9px]">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
              {exp.role && <p className="text-violet-600 font-semibold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
              {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-600 flex gap-1.5"><span className="text-violet-400">▸</span>{b}</p>)}
            </div>
          ) : null)}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education?.some(e => e.school) && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-100 pb-1">Education</h2>
          {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><div className="flex justify-between"><span className="font-bold text-xs">{edu.school}</span><span className="text-gray-400 text-[9px]">{edu.year}</span></div>{edu.degree && <p className="text-gray-500 text-[10px]">{edu.degree}</p>}{edu.gpa && <p className="text-gray-400 text-[9px]">GPA: {edu.gpa}</p>}</div> : null)}</div>
        )}
        {data.skills?.length > 0 && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-100 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-1.5">{data.skills.map((s, i) => <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>)}</div></div>
        )}
      </div>
    </div>
  );
}