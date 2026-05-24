"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; }
export default function TemplateBold({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full font-sans text-[11px] leading-relaxed">
      <div className="bg-violet-700 text-white p-8">
        <h1 className="text-3xl font-black tracking-tight">{data.name || "Your Name"}</h1>
        {data.experience?.[0]?.role && <p className="text-violet-200 text-sm mt-1">{data.experience[0].role}</p>}
        <div className="flex flex-wrap gap-x-4 text-violet-300 mt-2 text-[10px]">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      <div className="p-8">
        {data.summary && <div className="mb-5 bg-violet-50 rounded-lg p-4"><p className="text-gray-600">{data.summary}</p></div>}
        {data.experience?.some(e => e.company || e.role) && (
          <div className="mb-5">
            <h2 className="text-sm font-black uppercase tracking-wider text-violet-700 mb-3">Experience</h2>
            {data.experience.map((exp, i) => (exp.company || exp.role) ? (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-center"><span className="font-black text-xs text-gray-900">{exp.company}</span><span className="text-[9px] bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
                {exp.role && <p className="text-violet-600 font-bold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-600 flex gap-2 mt-0.5"><span className="text-violet-400 font-bold">→</span>{b}</p>)}
              </div>
            ) : null)}
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          {data.education?.some(e => e.school) && (
            <div><h2 className="text-sm font-black uppercase tracking-wider text-violet-700 mb-3">Education</h2>
            {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><p className="font-black text-xs">{edu.school}</p><p className="text-gray-500 text-[10px]">{edu.degree}</p><p className="text-gray-400 text-[9px]">{edu.year}</p></div> : null)}</div>
          )}
          {data.skills?.length > 0 && (
            <div><h2 className="text-sm font-black uppercase tracking-wider text-violet-700 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5">{data.skills.map((s, i) => <span key={i} className="text-[9px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">{s}</span>)}</div></div>
          )}
        </div>
      </div>
    </div>
  );
}