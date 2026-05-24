"use client";
import TemplateClean from "./templates/TemplateClean";
import TemplateSlate from "./templates/TemplateSlate";
import TemplateExecutive from "./templates/TemplateExecutive";
import TemplateMinimal from "./templates/TemplateMinimal";
import TemplateBold from "./templates/TemplateBold";
import TemplateNova from "./templates/TemplateNova";
import TemplateElegant from "./templates/TemplateElegant";
import TemplateModern from "./templates/TemplateModern";
import TemplateInk from "./templates/TemplateInk";
import TemplatePulse from "./templates/TemplatePulse";

interface WorkExperience { company: string; role: string; start: string; end: string; bullets: string[]; }
interface Education { school: string; degree: string; year: string; gpa: string; }
interface ResumeData { name: string; email: string; phone: string; location: string; linkedin: string; summary: string; experience: WorkExperience[]; education: Education[]; skills: string[]; photo?: string; }

export default function ResumePreview({ data, template = "clean" }: { data: ResumeData; template?: string }) {
  const props = { data };
  switch (template) {
    case "slate": return <TemplateSlate {...props} />;
    case "executive": return <TemplateExecutive {...props} />;
    case "minimal": return <TemplateMinimal {...props} />;
    case "bold": return <TemplateBold {...props} />;
    case "nova": return <TemplateNova {...props} />;
    case "elegant": return <TemplateElegant {...props} />;
    case "modern": return <TemplateModern {...props} />;
    case "ink": return <TemplateInk {...props} />;
    case "pulse": return <TemplatePulse {...props} />;
    default: return <TemplateClean {...props} />;
  }
}
