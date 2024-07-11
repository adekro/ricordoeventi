import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function PdfEventQrCodeCreator(
  nameEvent="",
  imageQrCode=""
) {

  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 25;
  let lineHeight = 20;
  const margin = 40;

  const condizioniUrlImg = await pdfDoc.embedPng(imageQrCode);

  page.drawText(
    nameEvent,
    {
      x: 180,
      y: height - 50,
      size: fontSize,
      font: helveticaBoldFont,
      lineHeight: lineHeight - 5,
    }
  );

  //* LINEA ORIZZONTALE
  page.drawLine({
    start: { x: width - 40, y: height - 70 },
    end: { x: margin, y: height - 70 },
    thickness: 0.2,
  });

  //* CONDIZIONI
  page.drawImage(condizioniUrlImg, {
    x: margin + 90,
    y: height - 500,
    width: 350,
    height: 350,
  });

  const pdfBytes = await pdfDoc.save();
  const pdfB64 = await pdfDoc.saveAsBase64();
  const pdfBase64 = pdfB64;
  const pdfDocNormale = pdfBytes;

  return { pdfBase64, pdfDocNormale };
}
