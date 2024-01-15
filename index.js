import {getSession} from './components/login.js';
import {app} from './components/main.js';
let [authStatus, org] = getSession();

window.addEventListener('load', async () => {
    console.log('Application Loaded');
    await app(authStatus, org);
});

