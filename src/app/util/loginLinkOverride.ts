const loginButton = document.getElementById('login');
const loginUrl = (window as any).LOGIN_URL;

if (loginButton && loginUrl) {
    loginButton.setAttribute('href', loginUrl);
}
