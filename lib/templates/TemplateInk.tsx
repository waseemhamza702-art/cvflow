"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateInk({ data }: { data: ResumeData }) {
  return (
    <div className="bg-zinc-900 text-white w-full h-full font-sans text-[10.5px] leading-relaxed">
      <div className="px-7 py-5 border-b border-zinc-700 flex items-center gap-5">
        {data.photo ? (
          <img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover flex-shrink-0" style={{border:"2px solid #eab308"}} />
        ) : (
          <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-2xl font-bold flex-shrink-0 text-yellow-400">{(data.name||"?").charAt(0)}</div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-black tracking-tight">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-yellow-400 mt-0.5 font-semibold">{data.experience[0].role}</p>}
          <div className="flex flex-wrap gap-x-4 text-zinc-400 mt-1 text-[9px]">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 px-7 py-5">
          {data.summary && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-2">About</h2>
              <p className="text-zinc-400 border-l-2 border-yellow-500 pl-3">{data.summary}</p>
            </div>
          )}
          {data.experience?.some(e => e.company || e.role) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-3">Experience</h2>
              {data.experience.map((exp, i) => (exp.company || exp.role) ? (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-black text-xs text-white">{exp.company}</span>
                    <span className="text-[8.5px] text-zinc-500">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                  </div>
                  {exp.role && <p className="text-yellow-400 font-semibold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                  {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                    <p key={j} className="text-zinc-400 flex gap-1.5 mt-0.5"><span className="text-yellow-600">▸</span>{b}</p>
                  ))}
                </div>
              ) : null)}
            </div>
          )}
        </div>
        <div className="w-[33%] bg-zinc-800 px-5 py-5 border-l border-zinc-700">
          {data.skills?.length > 0 && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s, i) => <span key={i} className="text-[8.5px] bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded border border-zinc-600">{s}</span>)}
              </div>
            </div>
          )}
          {data.education?.some(e => e.school) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-3">Education</h2>
              {data.education.map((edu, i) => edu.school ? (
                <div key={i} className="mb-3">
                  <p className="font-black text-xs text-white">{edu.school}</p>
                  <p className="text-zinc-400 text-[9px]">{edu.degree}</p>
                  <p className="text-yellow-500 text-[9px]">{edu.year}</p>
                </div>
              ) : null)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}