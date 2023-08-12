


var btnLogout = document.querySelector('.btnLogout')
var welcomeUser = document.getElementById('welcomeUser')

var userName = sessionStorage.getItem('userName')
if (userName){
    welcomeUser.textContent = 'Welcome ' + userName;
}else{
    welcomeUser.textContent = 'User';
}

btnLogout.addEventListener('click', function () {
window.location.href = 'index.html'

})