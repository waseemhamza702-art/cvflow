"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }
export default function TemplatePulse({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full font-sans text-[11px] leading-relaxed">
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8 text-white">
        <div className="flex items-center gap-4">
          {data.photo && <img src={data.photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white/50 flex-shrink-0" />}
          <h1 className="text-2xl font-black">{data.name || "Your Name"}</h1>
        </div>
        {data.experience?.[0]?.role && <p className="text-white/80 text-sm mt-0.5">{data.experience[0].role}</p>}
        <div className="flex flex-wrap gap-x-4 text-white/60 mt-2 text-[10px]">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      <div className="p-8">
        {data.summary && <div className="mb-5"><h2 className="text-[9px] font-black uppercase tracking-widest text-purple-500 mb-2">Summary</h2><p className="text-gray-500">{data.summary}</p></div>}
        {data.experience?.some(e => e.company || e.role) && (
          <div className="mb-5">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-purple-500 mb-3">Experience</h2>
            {data.experience.map((exp, i) => (exp.company || exp.role) ? (
              <div key={i} className="mb-4 border-l-2 border-purple-200 pl-3">
                <div className="flex justify-between"><span className="font-bold text-xs">{exp.company}</span><span className="text-[9px] bg-purple-50 text-purple-500 px-2 py-0.5 rounded-full">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
                {exp.role && <p className="text-purple-500 text-[10px] font-medium mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-purple-300">▸</span>{b}</p>)}
              </div>
            ) : null)}
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          {data.education?.some(e => e.school) && (
            <div><h2 className="text-[9px] font-black uppercase tracking-widest text-purple-500 mb-3">Education</h2>
            {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><p className="font-bold text-xs">{edu.school}</p><p className="text-gray-500 text-[10px]">{edu.degree}</p><p className="text-gray-400 text-[9px]">{edu.year}</p></div> : null)}</div>
          )}
          {data.skills?.length > 0 && (
            <div><h2 className="text-[9px] font-black uppercase tracking-widest text-purple-500 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5">{data.skills.map((s, i) => <span key={i} className="text-[9px] bg-gradient-to-r from-pink-50 to-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-100">{s}</span>)}</div></div>
          )}
        </div>
      </div>
    </div>
  );
}