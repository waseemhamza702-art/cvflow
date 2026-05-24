"use client";
interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function TemplateMinimal({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-full h-full font-sans text-[10.5px] leading-relaxed flex">
      {/* Sidebar */}
      <div className="w-[35%] bg-teal-700 text-white flex flex-col">
        <div className="px-5 pt-6 pb-4 text-center border-b border-teal-600">
          {data.photo ? (
            <img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" style={{border:"3px solid white"}} />
          ) : (
            <div className="w-20 h-20 rounded-full bg-teal-500 mx-auto mb-3 flex items-center justify-center text-2xl font-bold">{(data.name||"?").charAt(0)}</div>
          )}
          <h1 className="text-sm font-black leading-tight">{data.name || "Your Name"}</h1>
          {data.experience?.[0]?.role && <p className="text-teal-200 text-[9px] mt-1 uppercase tracking-wider">{data.experience[0].role}</p>}
        </div>
        <div className="px-5 py-4 border-b border-teal-600">
          <h2 className="text-[8px] font-black uppercase tracking-widest text-teal-200 mb-2">Contact</h2>
          <div className="space-y-1.5 text-[9px] text-teal-100">
            {data.email && <p>✉ {data.email}</p>}
            {data.phone && <p>✆ {data.phone}</p>}
            {data.location && <p>⌖ {data.location}</p>}
            {data.linkedin && <p>in {data.linkedin}</p>}
          </div>
        </div>
        {data.skills?.length > 0 && (
          <div className="px-5 py-4 border-b border-teal-600">
            <h2 className="text-[8px] font-black uppercase tracking-widest text-teal-200 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, i) => <span key={i} className="text-[8.5px] bg-teal-600 text-white px-2 py-0.5 rounded-full">{s}</span>)}
            </div>
          </div>
        )}
        {data.education?.some(e => e.school) && (
          <div className="px-5 py-4">
            <h2 className="text-[8px] font-black uppercase tracking-widest text-teal-200 mb-3">Education</h2>
            {data.education.map((edu, i) => edu.school ? (
              <div key={i} className="mb-3">
                <p className="font-bold text-[10px]">{edu.school}</p>
                <p className="text-teal-300 text-[9px]">{edu.degree}</p>
                <p className="text-teal-400 text-[9px]">{edu.year}</p>
              </div>
            ) : null)}
          </div>
        )}
      </div>
      {/* Main */}
      <div className="flex-1 p-6">
        {data.summary && (
          <div className="mb-5 bg-teal-50 rounded-lg p-3">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-teal-700 mb-2">Profile</h2>
            <p className="text-gray-600">{data.summary}</p>
          </div>
        )}
        {data.experience?.some(e => e.company || e.role) && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-widest text-teal-700 mb-3 border-b border-teal-100 pb-1">Experience</h2>
            {data.experience.map((exp, i) => (exp.company || exp.role) ? (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <span className="font-black text-xs text-gray-800">{exp.company}</span>
                  <span className="text-[8.5px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{exp.start}{exp.end ? " – "+exp.end : ""}</span>
                </div>
                {exp.role && <p className="text-teal-600 font-bold text-[10px] mt-0.5 mb-1">{exp.role}</p>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                  <p key={j} className="text-gray-500 flex gap-1.5 mt-0.5"><span className="text-teal-400">▸</span>{b}</p>
                ))}
              </div>
            ) : null)}
          </div>
        )}
      </div>
    </div>
  );
}