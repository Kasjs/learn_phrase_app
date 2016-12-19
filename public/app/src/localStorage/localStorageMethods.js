'use scrict'
import { getSelected } from '../actions/pageActions'

export let setCat = [];

export let localSync = function(index) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    let categories = JSON.parse(localStorage.getItem('categories_' + selected ));
    let promise = Promise.resolve(selected, categories).then(function() {
        ++categories[index].hits;
        setCategoryField(selected, categories);
    });
}

export function setCategory(response) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    setCategoryField(selected, response.data[selected]);
    setCat = JSON.parse(localStorage.getItem('categories_' + getSelected()));
    return setCat;
}

function createNewCategory(newCategoryName, categoryContent) {
    let categoryNames = JSON.parse(localStorage.getItem('options'));
    categoryNames.push(newCategoryName);
    localStorage.setItem('options', JSON.stringify(categoryNames));
    let newCategoryField = [];
    newCategoryField.push(categoryContent);
    setCategoryField(newCategoryName.label, newCategoryField);
}

export function offlineUpdateCategory(newCategoryName, categoryContent) {
    var categoryNames = JSON.parse(localStorage.getItem('options'));
    var same = false;
    categoryNames.forEach(function(item) {
        if (item.label === newCategoryName.label) {
            let categoryData = getCategoryField(item.label);
            categoryData.forEach(function(item) {
                if (item.side_b === categoryContent.side_b) {
                    setCategoryField(newCategoryName.label, categoryData);
                }
            });
            categoryData.push(categoryContent);
            setCategoryField(newCategoryName.label, categoryData);
            setCategoryOptions(categoryNames);
            same = true;
        }
    });
    if (!same) {
        createNewCategory(newCategoryName, categoryContent);
    }
}

export function setCategoryOffline() {
    let selected = JSON.parse(localStorage.getItem('selected'));
    localStorage.setItem('categories_' + selected, localStorage.getItem('categories_' + getSelected()));
    setCat = JSON.parse(localStorage.getItem('categories_' + getSelected()));
    return setCat;
}

export function setCategoryOptions(response) {
    localStorage.setItem('options', JSON.stringify(response));
}
export function getCategoryOptions() {
    return localStorage.getItem('options');
}

export function setCategoryField(name, data) {
    localStorage.setItem('categories_' + name , JSON.stringify(data));
}

export function getCategoryField(category) {
    return JSON.parse(localStorage.getItem('categories_' + category));

}

export function getEmailFromLocalStrg() {
    return localStorage.getItem('email');
}

export function getSelectedCategory() {
    return localStorage.getItem('selected');
}

export function getHiddenFromLocalStrg() {
    return JSON.parse(localStorage.getItem('isAuthButtonsHidden'));
}

export function getStatusFromLocalStrg() {
    return JSON.parse(localStorage.getItem('status'));
}

export function setLoginWhenSuccess(response) {
    localStorage.setItem('status', 200);
    localStorage.setItem('email', response.user.email);
    localStorage.setItem('token', response.token);
    localStorage.setItem('isAuthButtonsHidden', true);
}

export function setLoginWhenError() {
    localStorage.setItem('status', 400);
    localStorage.setItem('email', '');
    localStorage.setItem('isAuthButtonsHidden', false);
}

export function logOut() {
    localStorage.clear();
    localStorage.setItem('isAuthButtonsHidden', false);
}

export function getEmailErrorMsg() {
    return localStorage.getItem('msg-email');
}

export function getPasswordErrorMsg() {
    return localStorage.getItem('msg-password');
}
