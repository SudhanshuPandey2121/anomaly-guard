
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from "sonner";

export const exportElementAsPDF = async (
  element: HTMLElement,
  fileName: string = 'report.pdf',
  title: string = 'Anomaly Detection Report'
) => {
  try {
    toast.info("Preparing your PDF report...");
    
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#111111'
    });
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm'
    });
    
    // Add title
    pdf.setTextColor(50, 50, 50);
    pdf.setFontSize(20);
    pdf.text(title, 14, 20);
    
    // Add timestamp
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    
    // Add image
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 40, imgWidth - 20, imgHeight);
    
    // Save PDF
    pdf.save(fileName);
    
    toast.success("PDF report downloaded successfully!");
  } catch (error) {
    console.error('Error exporting PDF:', error);
    toast.error("Failed to generate PDF report");
  }
};

export const exportMultipleChartsAsPDF = async (
  elements: HTMLElement[],
  fileName: string = 'anomaly_report.pdf',
  title: string = 'Factory Anomaly Detection Report'
) => {
  try {
    toast.info("Preparing comprehensive PDF report...");
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm'
    });
    
    // Add title page
    pdf.setTextColor(50, 50, 50);
    pdf.setFontSize(24);
    const titleWidth = pdf.getStringUnitWidth(title) * 24 / pdf.internal.scaleFactor;
    const titleXPosition = (pdf.internal.pageSize.getWidth() - titleWidth) / 2;
    pdf.text(title, titleXPosition, 40);
    
    // Add timestamp
    pdf.setFontSize(12);
    const dateText = `Generated: ${new Date().toLocaleString()}`;
    const dateWidth = pdf.getStringUnitWidth(dateText) * 12 / pdf.internal.scaleFactor;
    const dateXPosition = (pdf.internal.pageSize.getWidth() - dateWidth) / 2;
    pdf.text(dateText, dateXPosition, 50);
    
    // Add each chart to a new page
    for (let i = 0; i < elements.length; i++) {
      if (i > 0) pdf.addPage();
      
      const canvas = await html2canvas(elements[i], {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#111111'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 180; // A4 width margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Section title if available
      const sectionTitle = elements[i].getAttribute('data-title') || `Chart ${i+1}`;
      pdf.setFontSize(16);
      pdf.text(sectionTitle, 15, 20);
      
      // Add image
      pdf.addImage(imgData, 'PNG', 15, 30, imgWidth, imgHeight);
    }
    
    // Save PDF
    pdf.save(fileName);
    
    toast.success("Comprehensive PDF report downloaded successfully!");
  } catch (error) {
    console.error('Error exporting PDF:', error);
    toast.error("Failed to generate PDF report");
  }
};
