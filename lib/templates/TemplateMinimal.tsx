"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; }
export default function TemplateMinimal({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-800 w-full h-full p-10 font-sans text-[11px] leading-relaxed">
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight">{data.name || "Your Name"}</h1>
        <div className="flex flex-wrap gap-x-4 text-gray-400 mt-2 text-[10px]">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      {data.summary && <div className="mb-7"><p className="text-gray-500 border-l-4 border-gray-200 pl-4">{data.summary}</p></div>}
      {data.experience?.some(e => e.company || e.role) && (
        <div className="mb-7">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-4">Experience</h2>
          {data.experience.map((exp, i) => (exp.company || exp.role) ? (
            <div key={i} className="mb-5 grid grid-cols-4 gap-4">
              <div className="text-right text-[9px] text-gray-400 pt-0.5"><p>{exp.start}</p>{exp.end && <p>{exp.end}</p>}</div>
              <div className="col-span-3">
                <p className="font-semibold text-xs text-gray-900">{exp.company}</p>
                {exp.role && <p className="text-gray-500 text-[10px] mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => <p key={j} className="text-gray-500 mt-0.5">— {b}</p>)}
              </div>
            </div>
          ) : null)}
        </div>
      )}
      <div className="grid grid-cols-2 gap-8">
        {data.education?.some(e => e.school) && (
          <div><h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-4">Education</h2>
          {data.education.map((edu, i) => edu.school ? <div key={i} className="mb-3"><p className="font-semibold text-xs">{edu.school}</p><p className="text-gray-500 text-[10px]">{edu.degree}</p><p className="text-gray-400 text-[9px]">{edu.year}</p></div> : null)}</div>
        )}
        {data.skills?.length > 0 && (
          <div><h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-4">Skills</h2>
          <p className="text-gray-500">{data.skills.join(", ")}</p></div>
        )}
      </div>
    </div>
  );
}