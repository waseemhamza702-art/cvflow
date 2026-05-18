import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ResumePDF from "@/lib/ResumePDF";
import { createElement } from "react";

export async function POST(req: NextRequest) {
  const { data, title } = await req.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = createElement(ResumePDF, { data }) as any;
  const buffer = await renderToBuffer(element);
  const uint8 = new Uint8Array(buffer);
  return new NextResponse(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${title}.pdf"`,
    },
  });
}

