"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; }
export default function TemplateModern({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full p-8 font-sans text-[11px] leading-relaxed">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {(data.name || "Y").charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-orange-500 font-medium text-sm">{data.experience[0].role}</p>}
          <div className="flex flex-wrap gap-x-3 text-gray-400 mt-1 text-[10px]">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-100 mb-5" />
      {data.summary && <div className="mb-5"><h2 className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-2">Profile</h2><p className="text-gray-500">{data.summary}</p></div>}
      {data.experience?.some(e => e.company || e.role) && (
        <div className="mb-5">
          <h2 className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-3">Experience</h2>
          {data.experience.map((exp, i) => (exp.company || exp.role) ? (
            <div key={i} className="mb-4 flex gap-3">
              <div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full bg-orange-400 mt-1 flex-shrink-0" /><div className="w-px bg-gray-200 flex-1 mt-1" /></div>
              <div className="flex-1 pb-2">
                <div className="flex justify-between"><span className="font-bold text-xs">{exp.company}</span><span className="text-[9px] text-gray-400">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
                {exp.role && <p className="text-orange-500 text-[10px] font-medium mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-500 mt-0.5">• {b}</p>)}
              </div>
            </div>
          ) : null)}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education?.some(e => e.school) && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-3">Education</h2>
          {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><p className="font-bold text-xs">{edu.school}</p><p className="text-gray-500 text-[10px]">{edu.degree}</p><p className="text-gray-400 text-[9px]">{edu.year}</p></div> : null)}</div>
        )}
        {data.skills?.length > 0 && (
          <div><h2 className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1.5">{data.skills.map((s, i) => <span key={i} className="text-[9px] border border-orange-200 text-orange-600 px-2 py-0.5 rounded-full">{s}</span>)}</div></div>
        )}
      </div>
    </div>
  );
}