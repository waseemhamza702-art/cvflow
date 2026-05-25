"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateClean({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-full h-full font-sans text-[10.5px] leading-relaxed flex">
      {/* Sidebar */}
      <div className="w-[38%] bg-slate-800 text-white flex flex-col">
        {/* Photo + Name */}
        <div className="bg-slate-900 px-5 pt-6 pb-5 text-center">
          {data.photo ? (
            <img src={data.photo} alt="" className="w-24 h-32 rounded-lg object-cover object-top border-3 border-orange-400 mx-auto mb-3" style={{border:"3px solid #fb923c"}} />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-600 mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-orange-400">
              {(data.name||"?").charAt(0)}
            </div>
          )}
          <h1 className="text-base font-black text-white leading-tight">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-orange-400 text-[10px] font-semibold mt-1 uppercase tracking-wider">{data.experience[0].role}</p>}
        </div>
        {/* Contact */}
        <div className="px-5 py-4 border-b border-slate-700">
          <h2 className="text-[8px] font-black uppercase tracking-widest text-orange-400 mb-2">Contact</h2>
          <div className="space-y-1.5 text-[9px] text-slate-300">
            {data.email && <p className="flex items-center gap-1.5"><span className="text-orange-400">✉</span>{data.email}</p>}
            {data.phone && <p className="flex items-center gap-1.5"><span className="text-orange-400">✆</span>{data.phone}</p>}
            {data.location && <p className="flex items-center gap-1.5"><span className="text-orange-400">⌖</span>{data.location}</p>}
            {data.linkedin && <p className="flex items-center gap-1.5"><span className="text-orange-400">in</span>{data.linkedin}</p>}
          </div>
        </div>
        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="px-5 py-4 border-b border-slate-700">
            <h2 className="text-[8px] font-black uppercase tracking-widest text-orange-400 mb-3">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[9px] text-slate-300 mb-0.5"><span>{s}</span></div>
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{width: `${85 - (i % 3) * 10}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Education */}
        {data.education?.some(e => e.school) && (
          <div className="px-5 py-4">
            <h2 className="text-[8px] font-black uppercase tracking-widest text-orange-400 mb-3">Education</h2>
            {data.education.map((edu, i) => edu.school ? (
              <div key={i} className="mb-3">
                <p className="font-bold text-[10px] text-white">{edu.school}</p>
                <p className="text-slate-400 text-[9px]">{edu.degree}</p>
                <p className="text-orange-400 text-[9px]">{edu.year}{edu.gpa ? " · GPA "+edu.gpa : ""}</p>
              </div>
            ) : null)}
          </div>
        )}
      </div>
      {/* Main content */}
      <div className="flex-1 p-6 bg-white">
        {data.summary && (
          <div className="mb-5">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-orange-400 inline-block" />About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        )}
        {data.experience?.some(e => e.company || e.role) && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-orange-400 inline-block" />Experience
            </h2>
            {data.experience.map((exp, i) => (exp.company || exp.role) ? (
              <div key={i} className="mb-4 relative pl-3 border-l-2 border-orange-200">
                <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-orange-400" />
                <div className="flex justify-between items-start">
                  <span className="font-black text-xs text-slate-800">{exp.company}</span>
                  <span className="text-[8.5px] text-white bg-orange-400 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                </div>
                {exp.role && <p className="text-orange-500 font-bold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                  <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5 text-[9.5px]"><span className="text-orange-300 flex-shrink-0">▸</span>{b}</p>
                ))}
              </div>
            ) : null)}
          </div>
        )}
      </div>
    </div>
  );
}