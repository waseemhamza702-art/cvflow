"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateModern({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-full h-full font-sans text-[10.5px] leading-relaxed">
      <div className="flex items-stretch">
        <div className="w-[38%] bg-indigo-700 text-white px-5 pt-7 pb-5 flex flex-col gap-4">
          <div className="text-center">
            {data.photo ? (
              <img src={data.photo} alt="" className="w-24 h-32 rounded-lg object-cover object-top mx-auto mb-3" style={{border:"3px solid rgba(255,255,255,0.4)"}} />
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-500 mx-auto mb-3 flex items-center justify-center text-2xl font-bold">{(data.name||"?").charAt(0)}</div>
            )}
            <h1 className="text-sm font-black leading-tight">{data.name || "Your Name"}</h1>
            {data.experience?.[0]?.role && <p className="text-indigo-200 text-[9px] mt-1 uppercase tracking-wider">{data.experience[0].role}</p>}
          </div>
          <div className="border-t border-indigo-600 pt-4">
            <h2 className="text-[8px] font-black uppercase tracking-widest text-indigo-300 mb-2">Contact</h2>
            <div className="space-y-1 text-[9px] text-indigo-100">
              {data.email && <p>✉ {data.email}</p>}
              {data.phone && <p>✆ {data.phone}</p>}
              {data.location && <p>⌖ {data.location}</p>}
              {data.linkedin && <p>in {data.linkedin}</p>}
            </div>
          </div>
          {data.skills?.length > 0 && (
            <div className="border-t border-indigo-600 pt-4">
              <h2 className="text-[8px] font-black uppercase tracking-widest text-indigo-300 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((s, i) => <span key={i} className="text-[8px] bg-indigo-600 text-indigo-100 px-2 py-0.5 rounded">{s}</span>)}
              </div>
            </div>
          )}
          {data.education?.some(e => e.school) && (
            <div className="border-t border-indigo-600 pt-4">
              <h2 className="text-[8px] font-black uppercase tracking-widest text-indigo-300 mb-3">Education</h2>
              {data.education.map((edu, i) => edu.school ? (
                <div key={i} className="mb-3">
                  <p className="font-bold text-[10px]">{edu.school}</p>
                  <p className="text-indigo-300 text-[9px]">{edu.degree}</p>
                  <p className="text-indigo-400 text-[9px]">{edu.year}</p>
                </div>
              ) : null)}
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          {data.summary && (
            <div className="mb-5 border-l-4 border-indigo-500 pl-3">
              <p className="text-gray-600">{data.summary}</p>
            </div>
          )}
          {data.experience?.some(e => e.company || e.role) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-indigo-700 mb-3 border-b-2 border-indigo-100 pb-1">Experience</h2>
              {data.experience.map((exp, i) => (exp.company || exp.role) ? (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-black text-xs">{exp.company}</span>
                    <span className="text-[8.5px] text-indigo-500">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                  </div>
                  {exp.role && <p className="text-indigo-600 font-bold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                  {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                    <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-indigo-400">▸</span>{b}</p>
                  ))}
                </div>
              ) : null)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}