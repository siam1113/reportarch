import {getReportElements} from './report.js';
import { login} from './login.js';

export const app = async (authStatus, org) => {
  const main = document.createElement('div');
  const header = document.createElement('h1');

  main.className = 'main';
  header.className = 'header';
  
  document.body.appendChild(main);

  if (!authStatus){
    await login();
  }else{
    header.innerHTML = `${org.toUpperCase()} Automation Test Reports`;
    main.appendChild(header);
    main.appendChild(await getReportElements(org));
  }
}
