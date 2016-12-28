'use strict'
import { getSelected } from '../actions/pageActions'
import { showMassage } from '../actions/userActions'
import { browserHistory, hashHistory } from 'react-router'
import { registerNewUser, loginUser } from '../actions/userActions'
import { setLoginWhenSuccess, setLoginWhenError, setCategory, getSelectedCategory,
        getEmailFromLocalStrg, setCategoryOptions, setCategoryOffline, offlineUpdateCategory,
        setCategoryField, getCategoryField } from '../localStorage/localStorageMethods'
export let msgErrorObj = {};

function calculateAllCategory(res) {
    let categoryLength = res.categoryNames.length
    for (let i = 0; i < categoryLength; i++) {
        let categoryName = res.categoryNames[i].label;
        setCategoryField(categoryName, res.data[categoryName]);
    }
    localStorage.setItem('selected', JSON.stringify(res.categoryNames[0].label));
}

function calculateAllCategoryAndContent() {
    let categoryNames = JSON.parse(localStorage.getItem('options'));
    let categoryData = {};
    for (let i = 0; i < categoryNames.length; i++) {
        categoryData[categoryNames[i].label] = getCategoryField(categoryNames[i].label);
    }
    return {
        categoryNames : categoryNames,
        categoryData : categoryData
    }
}

export function getCategoryFromServer(value) {
    let data = value;
    let isOffline = localStorage.getItem('isOffline');
    if (isOffline) {
        setCategoryOffline();
        return;
    } else {
        getCategory(data);
    }
}

let getCategory = (value) => {
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
    let isOffline = localStorage.getItem('isOffline');
    if (isOffline) {
        return;
    } else {
        changeCategory();
    }
}

let changeCategory = () => {
    $.post('/category',
    {
        data : JSON.parse(localStorage.getItem('categories_' + getSelected())),
        category: getSelected(),
        email: localStorage.getItem('email')
    }).then(function(response) {}, function(erro) {
        console.log('Error sync')
    });
}

export function updateCategory(newCategoryName, categoryContent) {
    let isOffline = localStorage.getItem('isOffline');
    console.log(isOffline);
    if ( isOffline ) {
        offlineUpdateCategory(newCategoryName, categoryContent);
    } else {
        $.post('/addNewCategory',
        {
            name : newCategoryName.value,
            content: categoryContent,
            email: localStorage.getItem('email')
        }).then(function(response) {
            setCategoryOptions(response.categoryNames);
            setCategoryField(newCategoryName.label, response.data[newCategoryName.label]);
            location.reload();
            hashHistory.push('/addCategory');
        }, function(erro) {
            console.log('Error sync')
        });
    }
}

export function getAllCategory() {
    $.get('/category', {email : localStorage.getItem('email')}).then(function(res) {
        calculateAllCategory(res);
    }, function(error) {
        console.log('Error get data')
    })
}

export function syncAllCategoryAndContent() {
    calculateAllCategoryAndContent();
    $.post('/syncAllCategory',
        {
            email : localStorage.getItem('email'),
            categoryNames : calculateAllCategoryAndContent().categoryNames,
            categoryData : calculateAllCategoryAndContent().categoryData
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
            let errorMsg = response.responseJSON.errors.email ?
            response.responseJSON.errors.email :
            response.responseJSON.errors.password;
            console.log(errorMsg);
            localStorage.setItem('errorMsg', errorMsg);
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
