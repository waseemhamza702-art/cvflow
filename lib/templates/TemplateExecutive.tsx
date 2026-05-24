"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }
export default function TemplateExecutive({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full p-8 font-serif text-[11px] leading-relaxed">
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
        <div className="flex flex-col items-center gap-2">
          {data.photo && <img src={data.photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-gray-300" />}
          <h1 className="text-3xl font-bold text-gray-900 tracking-widest uppercase">{data.name || "Your Name"}</h1>
        </div>
        {data.experience?.[0]?.role && <p className="text-sm text-gray-600 mt-1 tracking-wider">{data.experience[0].role}</p>}
        <div className="flex justify-center flex-wrap gap-x-4 text-gray-500 mt-2 text-[10px]">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>| {data.phone}</span>}
          {data.location && <span>| {data.location}</span>}
        </div>
      </div>
      {data.summary && <div className="mb-5"><h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-2 text-center">Professional Summary</h2><p className="text-gray-600 text-center">{data.summary}</p></div>}
      {data.experience?.some(e => e.company || e.role) && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-3 text-center">Professional Experience</h2>
          {data.experience.map((exp, i) => (exp.company || exp.role) ? (
            <div key={i} className="mb-4">
              <div className="flex justify-between border-b border-gray-200 pb-1"><span className="font-bold text-xs uppercase tracking-wide">{exp.company}</span><span className="text-gray-500 text-[9px]">{exp.start}{exp.end ? " – " + exp.end : ""}</span></div>
              {exp.role && <p className="text-gray-600 italic text-[10px] mt-0.5 mb-1">{exp.role}</p>}
              {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-600 flex gap-2 mt-0.5"><span>•</span>{b}</p>)}
            </div>
          ) : null)}
        </div>
      )}
      <div className="grid grid-cols-2 gap-8">
        {data.education?.some(e => e.school) && (
          <div><h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-3 text-center">Education</h2>
          {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3 text-center"><p className="font-bold text-xs">{edu.school}</p><p className="text-gray-500 text-[10px]">{edu.degree}</p><p className="text-gray-400 text-[9px]">{edu.year}</p></div> : null)}</div>
        )}
        {data.skills?.length > 0 && (
          <div><h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-3 text-center">Core Competencies</h2>
          <div className="flex flex-wrap gap-1.5 justify-center">{data.skills.map((s, i) => <span key={i} className="text-[9px] border border-gray-300 text-gray-600 px-2 py-0.5">{s}</span>)}</div></div>
        )}
      </div>
    </div>
  );
}