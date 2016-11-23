import { getSelected } from '../actions/pageActions'
import { browserHistory, hashHistory } from 'react-router'
import { registerNewUser, loginUser } from '../actions/userActions'
import { setLoginWhenSuccess, setLoginWhenError, setCategory, getSelectedCategory } from '../localStorage/localStorageMethods'



export function getCategoryFromServer(value) {

    $.get('/category', {email : localStorage.getItem('email')}).then(function(response) {
        switch(value) {
            case getSelectedCategory() : {
                setCategory(response);
            }
        }
    }, function(error) {
        console.log('Error get data')
    })
}

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
            password: user.password,
            repPassword: user.repPassword

        }).then(function(response) {
            registerNewUser(response.user);
            hashHistory.push('/login');
        }, function(response) {
            setLoginWhenError();
        });
}
export function login(user) {

    $.post('/login',
        {
            email: user.email,
            password: user.password

        }).then(function(response) {
            setLoginWhenSuccess(response);
            loginUser(response.user);
            hashHistory.push('/');

        }, function(response) {
            setLoginWhenError();
        });
}
