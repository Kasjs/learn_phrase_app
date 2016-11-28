'use strict'
import { getSelected } from '../actions/pageActions'
import { showMassage } from '../actions/userActions'
import { browserHistory, hashHistory } from 'react-router'
import { registerNewUser, loginUser } from '../actions/userActions'
import { setLoginWhenSuccess, setLoginWhenError, setCategory, getSelectedCategory, getEmailFromLocalStrg } from '../localStorage/localStorageMethods'

export function transferMessages(msg) {
    return msg;
}

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

export function updateCategory(newCategoryName, categoryContent) {
    console.log(newCategoryName);
    $.post('/addNewCategory',
        {
            name : newCategoryName.value,
            content: categoryContent,
            email: localStorage.getItem('email')
        }).then(function(response) {
            console.log(response.categoryNames);
            localStorage.setItem('options', JSON.stringify(response.categoryNames));
            setTimeout(function() {
                location.reload();
            },300);
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
            hashHistory.push('/login');
        }, function(response) {
            localStorage.setItem('msg-email', response.responseJSON.errors.email);
            localStorage.setItem('msg-password', response.responseJSON.errors.password);
            setLoginWhenError();
        });
}
export function login(user) {

    $.post('/login',
        {
            email: user.email,
            password: user.password

        }).then(function(response) {
            console.log(response);
            localStorage.setItem('options', JSON.stringify(response.user.defaultCategory));
            setLoginWhenSuccess(response);
            hashHistory.push('/');

        }, function(response) {
            setLoginWhenError();
        });
}
