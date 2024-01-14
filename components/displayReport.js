import { extractDateTime } from '../utils/extractDateTime.js'

export const displayReports = (data) => {
  const reports = extractReports(data);
  const totalReports = reports.length;
  const allReportContainer = document.createElement('div');
  for (let i = 0; i < totalReports; i++) {
    const report = reports[i];
    const reportInfo = {
      name: report.name,
      url: report.url,
    }
    const reportBlock = createReportElement(reportInfo);
    allReportContainer.appendChild(reportBlock);
  }
  return allReportContainer;
}

const extractReports = (data) => {
  console.log(data);
  const extractedReports = [];
  const report = data.getElementsByTagName('Key');
  const totalReports = report.length;
  for (let i = 0; i < totalReports; i++) {
    const reportName = report[i].childNodes[0].nodeValue;
    const reportUrl = `https://automatedtestreport.s3.us-west-2.amazonaws.com/${reportName}`;
    extractedReports.push({
      name: reportName,
      url: reportUrl
    });
  }
  console.log("Extracted Reports: ", extractedReports);
  return extractedReports;
}

const createReportElement = ({name, url}) => {
    // Create elements
    const reportContainer = document.createElement('div');
    const reportNameElement = document.createElement('h2');
    const reportUrlElement = document.createElement('a');
    const reportDateTimeElement = document.createElement('p');
    const openReportBtn = document.createElement('button');

    // Add attributes
    reportContainer.className = 'report-container';
    reportDateTimeElement.className = 'report-date-time';
    openReportBtn.className = 'open-report-btn';

    reportUrlElement.href = url;
    reportUrlElement.target = '_blank';
    reportUrlElement.innerText = 'Open';

    reportNameElement.innerText = 'Automation Test Report';
    openReportBtn.innerText = 'Open Report'
    const {month, date, year, hour, minute, seconds} = 
      extractDateTime(name.replace(".html", ""));
    reportDateTimeElement.innerText = `📅${month} ${date}, ${year} | 🕜${hour}:${minute}:${seconds}`


    // Add elements to container
    reportNameElement.appendChild(reportDateTimeElement)
    // reportUrlElement.appendChild(openReportBtn);
    reportContainer.appendChild(reportNameElement);
    reportContainer.appendChild(reportDateTimeElement);
    reportContainer.appendChild(reportUrlElement);
    return reportContainer;
}

