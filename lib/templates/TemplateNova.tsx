"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateNova({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-full h-full font-sans text-[10.5px] leading-relaxed">
      {/* Header */}
      <div className="bg-blue-900 text-white px-8 py-5 flex items-center gap-5">
        {data.photo ? (
          <img src={data.photo} alt="" className="w-24 h-32 rounded-lg object-cover object-top flex-shrink-0" style={{border:"3px solid #93c5fd"}} />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-2xl font-bold flex-shrink-0">{(data.name||"?").charAt(0)}</div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-black tracking-tight">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-blue-300 font-semibold mt-0.5">{data.experience[0].role}</p>}
          <div className="flex flex-wrap gap-x-4 text-blue-200 mt-1.5 text-[9px]">
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>✆ {data.phone}</span>}
            {data.location && <span>⌖ {data.location}</span>}
            {data.linkedin && <span>in {data.linkedin}</span>}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="px-8 py-5 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {data.summary && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-blue-800 mb-2 border-b-2 border-blue-800 pb-1">Professional Summary</h2>
              <p className="text-gray-600">{data.summary}</p>
            </div>
          )}
          {data.experience?.some(e => e.company || e.role) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-blue-800 mb-3 border-b-2 border-blue-800 pb-1">Experience</h2>
              {data.experience.map((exp, i) => (exp.company || exp.role) ? (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-black text-xs text-gray-800">{exp.company}</span>
                    <span className="text-[8.5px] text-gray-500">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                  </div>
                  {exp.role && <p className="text-blue-700 font-bold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                  {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                    <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-blue-400">▸</span>{b}</p>
                  ))}
                </div>
              ) : null)}
            </div>
          )}
        </div>
        <div>
          {data.skills?.length > 0 && (
            <div className="mb-5">
              <h2 className="text-[9px] font-black uppercase tracking-widest text-blue-800 mb-3 border-b-2 border-blue-800 pb-1">Skills</h2>
              <div className="space-y-1.5">
                {data.skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.education?.some(e => e.school) && (
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-blue-800 mb-3 border-b-2 border-blue-800 pb-1">Education</h2>
              {data.education.map((edu, i) => edu.school ? (
                <div key={i} className="mb-3">
                  <p className="font-black text-xs text-gray-800">{edu.school}</p>
                  <p className="text-gray-500 text-[9px]">{edu.degree}</p>
                  <p className="text-blue-600 text-[9px]">{edu.year}</p>
                </div>
              ) : null)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}