"use client";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", backgroundColor: "#ffffff" },
  header: { marginBottom: 16, borderBottom: "1.5pt solid #7c3aed", paddingBottom: 12 },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#111827", letterSpacing: 0.5 },
  role: { fontSize: 11, color: "#7c3aed", marginTop: 3, fontFamily: "Helvetica-Bold" },
  contact: { fontSize: 8.5, color: "#6b7280", marginTop: 4, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  contactItem: { marginRight: 10 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#9ca3af", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, borderBottom: "0.5pt solid #f3f4f6", paddingBottom: 3 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  company: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: "#111827" },
  date: { fontSize: 8.5, color: "#9ca3af" },
  expRole: { fontSize: 9.5, color: "#7c3aed", marginTop: 1, marginBottom: 3 },
  bullet: { fontSize: 9, color: "#374151", marginLeft: 8, marginBottom: 2, lineHeight: 1.4 },
  summary: { fontSize: 9.5, color: "#4b5563", lineHeight: 1.5 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skill: { fontSize: 8.5, backgroundColor: "#f3f4f6", color: "#374151", padding: "3pt 7pt", borderRadius: 3 },
  eduRow: { flexDirection: "row", justifyContent: "space-between" },
  eduSchool: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#111827" },
  eduDetail: { fontSize: 9, color: "#6b7280", marginTop: 1 },
  twoCol: { flexDirection: "row", gap: 20 },
  col: { flex: 1 },
});

interface WorkExperience {
  company: string; role: string; start: string; end: string; bullets: string[];
}
interface Education {
  school: string; degree: string; year: string; gpa: string;
}
interface ResumeData {
  name: string; email: string; phone: string; location: string; linkedin: string;
  summary: string; experience: WorkExperience[]; education: Education[]; skills: string[];
}

export default function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name || "Your Name"}</Text>
          {data.experience?.[0]?.role && (
            <Text style={styles.role}>{data.experience[0].role}</Text>
          )}
          <View style={styles.contact}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
            {data.linkedin && <Text style={styles.contactItem}>{data.linkedin}</Text>}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={styles.expHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>{exp.start}{exp.end ? ` – ${exp.end}` : ""}</Text>
                </View>
                {exp.role && <Text style={styles.expRole}>{exp.role}</Text>}
                {exp.bullets?.filter(b => b.trim()).map((b, j) => (
                  <Text key={j} style={styles.bullet}>▸ {b}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Bottom two columns */}
        <View style={styles.twoCol}>
          {/* Education */}
          {data.education?.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <View style={styles.eduRow}>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.date}>{edu.year}</Text>
                  </View>
                  <Text style={styles.eduDetail}>{edu.degree}</Text>
                  {edu.gpa && <Text style={styles.eduDetail}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsRow}>
                {data.skills.map((s, i) => (
                  <Text key={i} style={styles.skill}>{s}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
