"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateElegant({ data }: { data: ResumeData }) {
  return (
    <div className="bg-stone-50 w-full h-full font-sans text-[10.5px] leading-relaxed">
      <div className="bg-stone-800 text-white px-8 py-5 flex items-center gap-6">
        {data.photo ? (
          <img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover object-center flex-shrink-0" style={{border:"2px solid #d4af37"}} />
        ) : (
          <div className="w-20 h-20 rounded-full bg-stone-600 flex items-center justify-center text-2xl font-bold flex-shrink-0 text-yellow-400">{(data.name||"?").charAt(0)}</div>
        )}
        <div>
          <h1 className="text-xl font-black tracking-widest uppercase">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-yellow-400 text-[10px] mt-1 tracking-widest uppercase font-semibold">{data.experience[0].role}</p>}
          <div className="flex flex-wrap gap-x-4 text-stone-400 mt-1.5 text-[9px]">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-yellow-500" />
      <div className="flex">
        <div className="flex-1 px-7 py-5">
          {data.summary && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-stone-600 mb-2 border-b border-yellow-400 pb-1">Profile</h2>
              <p className="text-gray-600">{data.summary}</p>
            </div>
          )}
          {data.experience?.some(e => e.company || e.role) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-stone-600 mb-3 border-b border-yellow-400 pb-1">Experience</h2>
              {data.experience.map((exp, i) => (exp.company || exp.role) ? (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-black text-xs text-stone-800">{exp.company}</span>
                    <span className="text-[8.5px] text-stone-500 italic">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                  </div>
                  {exp.role && <p className="text-yellow-600 font-bold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                  {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                    <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-yellow-500">▸</span>{b}</p>
                  ))}
                </div>
              ) : null)}
            </div>
          )}
        </div>
        <div className="w-[32%] bg-stone-100 px-5 py-5 border-l border-stone-200">
          {data.skills?.length > 0 && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-stone-600 mb-3 border-b border-yellow-400 pb-1">Skills</h2>
              <div className="space-y-1.5">
                {data.skills.map((s, i) => <p key={i} className="text-stone-600 flex items-center gap-1.5"><span className="text-yellow-500">◆</span>{s}</p>)}
              </div>
            </div>
          )}
          {data.education?.some(e => e.school) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-stone-600 mb-3 border-b border-yellow-400 pb-1">Education</h2>
              {data.education.map((edu, i) => edu.school ? (
                <div key={i} className="mb-3">
                  <p className="font-black text-xs text-stone-800">{edu.school}</p>
                  <p className="text-stone-500 text-[9px]">{edu.degree}</p>
                  <p className="text-yellow-600 text-[9px]">{edu.year}</p>
                </div>
              ) : null)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}