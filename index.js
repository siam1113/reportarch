import {displayReports} from './components/displayReport.js';
import {parseXml} from './utils/parseXml.js';

const main = document.createElement('div');
document.body.appendChild(main);

const fetchReports = () => {
fetch('https://sqpvs6epv4.execute-api.us-west-2.amazonaws.com/dev/automatedtestreport', {
  method: 'GET',
})
.then((data)=> data.text())
.then((str)=> main.appendChild(displayReports(parseXml(str))))
}

fetchReports()

