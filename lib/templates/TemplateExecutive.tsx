"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateExecutive({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-full h-full font-sans text-[10.5px] leading-relaxed">
      <div className="bg-rose-600 text-white px-7 py-5">
        <div className="flex items-center gap-5">
          {data.photo ? (
            <img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover object-center flex-shrink-0" style={{border:"3px solid rgba(255,255,255,0.5)"}} />
          ) : (
            <div className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">{(data.name||"?").charAt(0)}</div>
          )}
          <div>
            <h1 className="text-2xl font-black tracking-tight">{data.name || "Your Name"}</h1>
            {data.experience?.[0]?.role && <p className="text-rose-200 mt-0.5 font-medium">{data.experience[0].role}</p>}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 mt-3 text-[9px] text-rose-100 border-t border-rose-500 pt-2">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>✆ {data.phone}</span>}
          {data.location && <span>⌖ {data.location}</span>}
          {data.linkedin && <span>in {data.linkedin}</span>}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 px-6 py-5">
          {data.summary && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-rose-600 mb-2 flex items-center gap-2"><span className="w-5 h-0.5 bg-rose-600" />Summary</h2>
              <p className="text-gray-600">{data.summary}</p>
            </div>
          )}
          {data.experience?.some(e => e.company || e.role) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-rose-600 mb-3 flex items-center gap-2"><span className="w-5 h-0.5 bg-rose-600" />Experience</h2>
              {data.experience.map((exp, i) => (exp.company || exp.role) ? (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-black text-xs">{exp.company}</span>
                    <span className="text-[8.5px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                  </div>
                  {exp.role && <p className="text-rose-500 font-bold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                  {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                    <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-rose-300">▸</span>{b}</p>
                  ))}
                </div>
              ) : null)}
            </div>
          )}
        </div>
        <div className="w-[35%] bg-gray-50 px-5 py-5 border-l border-gray-100">
          {data.skills?.length > 0 && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-rose-600 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s, i) => <span key={i} className="text-[8.5px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">{s}</span>)}
              </div>
            </div>
          )}
          {data.education?.some(e => e.school) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-rose-600 mb-3">Education</h2>
              {data.education.map((edu, i) => edu.school ? (
                <div key={i} className="mb-3">
                  <p className="font-black text-xs">{edu.school}</p>
                  <p className="text-gray-500 text-[9px]">{edu.degree}</p>
                  <p className="text-rose-500 text-[9px]">{edu.year}</p>
                </div>
              ) : null)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}