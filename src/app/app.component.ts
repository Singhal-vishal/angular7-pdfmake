import { Component } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pdf-test';
  constructor() { }

  ngOnInit() {
    //  document.getElementById("telephoneComplaintContent").style.display = "none";

  }

  telephoneComplaints = [
    { "sno": 1, "location": "General Computing Lab", "details": "problem in cord", "dateOfResolution": "12-09-20", "createdDate": "12-09-20", "extensionNo": "0731-241007" },
    { "sno": 2, "location": "Software Computing Lab", "details": "mic is not working", "dateOfResolution": "12-09-20", "createdDate": "12-09-20", "extensionNo": "0731-241009" },
    { "sno": 3, "location": "Post Graduate Lab", "details": "require a new phone", "dateOfResolution": "12-09-20", "createdDate": "12-09-20", "extensionNo": "0731-241008" }
  ]
  public captureScreen() {
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.setFontSize(20);

      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download("TelephoneComplaint.pdf");
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'Shri G.S Institute of Technology & Science, Indore',
          style: 'header'
        },
        {
          text: 'Telephone Complaint',
          style: 'complaintName'
        },
        {
          style: 'tableMargin',
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [{
                text: 'S.No',
                style: 'tableHeader'
              },
              {
                text: 'Extension No.',
                style: 'tableHeader'
              },
              {
                text: 'Location(Department/Section)',
                style: 'tableHeader'
              },
              {
                text: 'Complaint Description',
                style: 'tableHeader'
              },
              {
                text: 'Date at which complaint submitted',
                style: 'tableHeader',
              },
              {
                text: 'Date at which complaint solved',
                style: 'tableHeader'
              }
              ],
              ...this.telephoneComplaints.map(
                complaint => {
                  return [complaint.sno,
                  complaint.extensionNo,
                  complaint.location,
                  complaint.details,
                  complaint.createdDate,
                  complaint.dateOfResolution];
                })
            ]
          }
        },
        {
          text: 'HEAD',
          style: 'alignRight'
        },
        {
          text: 'Department of Computer Engineering',
          style: 'alignRight',
          margin: [0, 0, 0, 40]
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0, y1: 20,
              x2: 525, y2: 20,
              dash: { length: 5 },
            }
          ]
        },
        {
          text: 'Receipt',
          alignment: 'center',
          fontSize: 15,
          bold: true,
          decoration: 'underline',
          margin: [0, 20, 0, 20]
        },
        {
          text: 'Complaint related to extension number - ',
          margin: [0, 0, 0, 10]
        },
        {
          text: 'Complaint received on - '
        }
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        complaintName: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
          decoration: 'underline',
          margin: [0, 0, 0, 20]
        },
        tableHeader: {
          fontSize: 14,
        },
        alignRight: {
          alignment: 'right'
        },
        tableMargin: {
          margin: [0, 0, 0, 40]
        }
      }
    }
  }
}
