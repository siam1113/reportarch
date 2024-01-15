import {API_ENDPOINT_DEV} from '../config/env.js';

export const login = async () => {
  document.body.innerHTML=
    `<div id="login-container">
      <h1 id="title">Reportarch</h1>
      <div id="form">
        <input type="text" placeholder="Paste your org id here" id="orgId"/>
        <input type="button" value="Submit" id="submit"/>
      <div/>
     </div>`;
  const submit = document.getElementById('submit');
  console.log(orgId)
  submit.addEventListener('click', async () => {
    const orgId = document.getElementById('orgId').value;
    let {isAuthenticated, orgName} = await authenticate(orgId);
    isAuthenticated ? setSession(isAuthenticated, orgName, orgId) :window.alert("You are unuthorized to acess !");
  });
}


export const authenticate = async (orgId) => {
  const res = await fetch(`${API_ENDPOINT_DEV}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "orgId": orgId
        })
    })
    const resJson = await res.json();
    if (resJson['statusCode'] == 200) {
    return {
          isAuthenticated: true,
          orgName: resJson['name']
        }
    }else{
      return {
          isAuthenticated: false,
          orgName: resJson['name']
        }
    }
}

export const setSession = (isAuthenticated, orgName, orgId) => {
  sessionStorage.setItem('orgName', orgName);
  sessionStorage.setItem('orgId', orgId);
  sessionStorage.setItem('isAuthenticated', isAuthenticated);
  window.location.reload();
}

export const getSession = () => {
  return[
  sessionStorage.getItem('isAuthenticated'),
  sessionStorage.getItem('orgName'),
  sessionStorage.getItem('orgId'),
  ]
}