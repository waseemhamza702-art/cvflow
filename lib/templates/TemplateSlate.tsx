"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateSlate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-950 text-white w-full h-full font-sans text-[10.5px] leading-relaxed flex">
      <div className="w-[36%] bg-gray-900 flex flex-col border-r border-gray-800">
        <div className="px-5 pt-6 pb-4 text-center border-b border-gray-800">
          {data.photo ? (
            <img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover object-center mx-auto mb-3" style={{border:"2px solid #a855f7"}} />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-purple-400">{(data.name||"?").charAt(0)}</div>
          )}
          <h1 className="text-sm font-black">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-purple-400 text-[9px] mt-1 uppercase tracking-wider">{data.experience[0].role}</p>}
        </div>
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="text-[8px] font-black uppercase tracking-widest text-purple-400 mb-2">Contact</h2>
          <div className="space-y-1.5 text-[9px] text-gray-400">
            {data.email && <p>✉ {data.email}</p>}
            {data.phone && <p>✆ {data.phone}</p>}
            {data.location && <p>⌖ {data.location}</p>}
            {data.linkedin && <p>in {data.linkedin}</p>}
          </div>
        </div>
        {data.skills?.length > 0 && (
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="text-[8px] font-black uppercase tracking-widest text-purple-400 mb-3">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((s, i) => (
                <div key={i}>
                  <span className="text-[9px] text-gray-300">{s}</span>
                  <div className="h-1 bg-gray-700 rounded-full mt-0.5 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{width: `${90 - (i % 4) * 10}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.education?.some(e => e.school) && (
          <div className="px-5 py-4">
            <h2 className="text-[8px] font-black uppercase tracking-widest text-purple-400 mb-3">Education</h2>
            {data.education.map((edu, i) => edu.school ? (
              <div key={i} className="mb-3">
                <p className="font-bold text-[10px] text-white">{edu.school}</p>
                <p className="text-gray-400 text-[9px]">{edu.degree}</p>
                <p className="text-purple-400 text-[9px]">{edu.year}</p>
              </div>
            ) : null)}
          </div>
        )}
      </div>
      <div className="flex-1 p-6">
        {data.summary && (
          <div className="mb-5">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-purple-400 mb-2">About</h2>
            <p className="text-gray-400">{data.summary}</p>
          </div>
        )}
        {data.experience?.some(e => e.company || e.role) && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-widest text-purple-400 mb-3">Experience</h2>
            {data.experience.map((exp, i) => (exp.company || exp.role) ? (
              <div key={i} className="mb-4 pl-3 border-l border-gray-700">
                <div className="flex justify-between">
                  <span className="font-black text-xs text-white">{exp.company}</span>
                  <span className="text-[8.5px] text-purple-400">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                </div>
                {exp.role && <p className="text-purple-300 font-semibold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                  <p key={j} className="text-gray-400 flex gap-1.5 mt-0.5"><span className="text-purple-500">▸</span>{b}</p>
                ))}
              </div>
            ) : null)}
          </div>
        )}
      </div>
    </div>
  );
}