'use strict'
import { getSelected } from '../actions/pageActions'
import { showMassage } from '../actions/userActions'
import { browserHistory, hashHistory } from 'react-router'
import { registerNewUser, loginUser } from '../actions/userActions'
import { setLoginWhenSuccess, setLoginWhenError, setCategory, getSelectedCategory, getEmailFromLocalStrg, setCategoryOptions } from '../localStorage/localStorageMethods'

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
            data : JSON.parse(localStorage.getItem('categories_' + getSelected())),
            category: getSelected(),
            email: localStorage.getItem('email')
        }).then(function(response) {
            console.log(response.data);
        }, function(erro) {
            console.log('Error sync')
        });
}

export function updateCategory(newCategoryName, categoryContent) {

    $.post('/addNewCategory',
        {
            name : newCategoryName.value,
            content: categoryContent,
            email: localStorage.getItem('email')
        }).then(function(response) {
            setCategoryOptions(response.categoryNames);
            localStorage.setItem('categories_' + newCategoryName.label , JSON.stringify(response.data[newCategoryName.label]));
            location.reload();
        }, function(erro) {
            console.log('Error sync')
        });
}

export function getAllCategory() {
    $.get('/category', {email : localStorage.getItem('email')}).then(function(res) {
        let categoryLength = res.categoryNames.length
        for (let i = 0; i < categoryLength; i++) {
            let categoryName = res.categoryNames[i].label;
            localStorage.setItem('categories_' + categoryName , JSON.stringify(res.data[categoryName]));
        }
        localStorage.setItem('selected', JSON.stringify(res.categoryNames[0].label));
    }, function(error) {
        console.log('Error get data')
    })
}

export function syncAllCategoryAndContent() {
    var categoryNames = JSON.parse(localStorage.getItem('options'));
    var categoryData = {};
    for (let i = 0; i < categoryNames.length; i++) {
        categoryData[categoryNames[i].label] = JSON.parse(localStorage.getItem('categories_' + categoryNames[i].label));
    }
    console.log(categoryData, categoryNames);
    $.post('/syncAllCategory',
        {
            email : localStorage.getItem('email'),
            categoryNames : categoryNames,
            categoryData : categoryData
        }).then(function(res) {
    }, function(error) {
        console.log('Error get data')
    })
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
            setCategoryOptions(response.user.defaultCategory);
            setLoginWhenSuccess(response);
            hashHistory.push('/');

        }, function(response) {
            setLoginWhenError();
        });
}
