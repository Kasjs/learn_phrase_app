import { getSelected, getCategoryFromStorage } from '../actions/pageActions'
import { browserHistory, hashHistory } from 'react-router'
import { registerNewUser, loginUser } from '../actions/userActions'

export let setCat = [];
export function getCategoryFromServer(value) {
    $.get('/category', {email : localStorage.getItem('email')}).then(function(response) {
        switch(value) {
            case 'Food' : {
                let selected = JSON.parse(localStorage.getItem('selected'));
                localStorage.setItem('catagories_' + selected , JSON.stringify(response.data.Food));
                setCat = JSON.parse(localStorage.getItem('catagories_' + getSelected()));
                return setCat;
            }
            case 'Sport' : {
                let selected = JSON.parse(localStorage.getItem('selected'));
                localStorage.setItem('catagories_' + selected, JSON.stringify(response.data.Sport));
                setCat = JSON.parse(localStorage.getItem('catagories_' + getSelected()));
                return setCat;
            }
            case 'Nature' : {
                let selected = JSON.parse(localStorage.getItem('selected'));
                localStorage.setItem('catagories_' + selected, JSON.stringify(response.data.Nature));
                setCat = JSON.parse(localStorage.getItem('catagories_' + getSelected()));
                return setCat;
            }
        }
    }, function(error) {
        console.log('Error get data')
    })
}
// export function getUserCategory(value) {
//     $.get('/user/cat', {email : localStorage.getItem('email')}).then(function(response) {
//         console.log(response);
//     }, function(error) {
//         console.log('Error get data')
//     })
// }

export function syncWithServer() {
    $.post('/category',
        {
            data : JSON.parse(localStorage.getItem('catagories_' + getSelected())),
            category: getSelected(),
            email: localStorage.getItem('email')

        }).then(function(response) {
            console.log(response.data);
        }, function(erro) {
            console.log('Error sync')
        });
}

export function register(user) {

        $.post('/register',
            {
                email: user.email,
                password: user.password

            }).then(function(response) {
                localStorage.setItem('status', 200);
                localStorage.setItem('email', response.user.email);
                localStorage.setItem('hidden', true);
                registerNewUser(response.user);
                hashHistory.push('/');

            }, function(response) {
                localStorage.setItem('status', 400);
                localStorage.setItem('email', '');
                localStorage.setItem('hidden', false);

            });
}
export function login(user) {

        $.post('/login',
            {
                email: user.email,
                password: user.password

            }).then(function(response) {
                localStorage.setItem('status', 200);
                localStorage.setItem('email', response.user.email);
                localStorage.setItem('hidden', true);
                loginUser(response.user);
                hashHistory.push('/');

            }, function(response) {
                localStorage.setItem('status', 400);
                localStorage.setItem('email', '');
                localStorage.setItem('hidden', false);
            });
}
