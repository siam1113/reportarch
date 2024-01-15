import { extractMetaInfo } from '../utils/extractInfo.js'
import {parseXml} from '../utils/parseXml.js';

export const getReportElements = async (org) => {
  const reports = await fetchReports(org);
  const extractedReports = extractReports(reports, org);
  const totalReports = extractedReports.length;
  const allReportContainer = document.createElement('div');
  for (let i = 0; i < totalReports; i++) {
    const report = extractedReports[i];
    const reportInfo = { name: report.name, url: report.url}
    const reportBlock = createReportElement(reportInfo);
    allReportContainer.appendChild(reportBlock);
  }
  return allReportContainer;
}

const extractReports = (data, org) => {
  const extractedReports = [];
  const reports = data.getElementsByTagName('Key');
  const totalReports = reports.length;
  for (let i = 0; i < totalReports; i++) {
    const reportName = reports[i].childNodes[0].nodeValue;
    const reportUrl = `https://${org}.s3.us-west-2.amazonaws.com/${reportName.replaceAll(" ", "+")}`;
    extractedReports.push({
      name: reportName,
      url: reportUrl
    });
  }
  return extractedReports;
}

const createReportElement = ({name, url}) => {
  const {reportname, client, month, date, year, hour, minute, seconds} = 
      extractMetaInfo(name.replace(".html", ""));

    // Create elements
    const reportContainer = document.createElement('div');
    const reportNameElement = document.createElement('h2');
    const reportUrlElement = document.createElement('a');
    const reportDateTimeElement = document.createElement('p');
    const reportClientElement  = document.createElement('p');
    const openReportBtn = document.createElement('button');
    const btnNameElement = document.createElement('span');
    const openReportIcon = document.createElement('img');

    // Add attributes
    reportContainer.className = 'report-container';
    reportDateTimeElement.className = 'report-date-time';
    reportClientElement.className = 'report-client';
    openReportBtn.className = 'open-report-btn';

    reportUrlElement.href = url;
    reportUrlElement.target = '_blank';
    openReportIcon.src = 
      'https://img.icons8.com/pastel-glyph/64/external-link--v1.png';
    openReportIcon.alt = 'external-link--v1';
    openReportIcon.width = '24';
    btnNameElement.className = 'btn-name';

    reportNameElement.innerText = reportname;
    btnNameElement.innerText = 'Open Report';
    reportDateTimeElement.innerText = `📅${month} ${date}, ${year} | 🕜${hour}:${minute}:${seconds} (UTC+06:00)`;
    reportClientElement.innerText = `⚙️ Executed by: ${client}`;


    // Add elements to container
    reportNameElement.appendChild(reportDateTimeElement)
    openReportBtn.appendChild(openReportIcon);
    openReportBtn.appendChild(btnNameElement);
    reportUrlElement.appendChild(openReportBtn);
    reportContainer.appendChild(reportNameElement);
    reportContainer.appendChild(reportClientElement);
    reportContainer.appendChild(reportDateTimeElement);
    reportContainer.appendChild(reportUrlElement);
    return reportContainer;
}

const fetchReports = async (bucket) => {
const res = await fetch(`https://sqpvs6epv4.execute-api.us-west-2.amazonaws.com/dev/${bucket}`, {
  method: 'GET',
})
const resText = await res.text();
return parseXml(resText);
}

