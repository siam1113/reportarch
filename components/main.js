import {getReportElements} from './report.js';
import { login} from './login.js';

export const app = async (authStatus, org) => {
  const main = document.createElement('div');
  const header = document.createElement('h1');

  main.className = 'main';
  header.className = 'header';
  header.innerHTML = `${org.toUpperCase()} Automation Test Reports`;

  document.body.appendChild(main);
  main.appendChild(header);

  if (!authStatus){
    await login();
  }else{   
    main.appendChild(await getReportElements(org));
  }
}