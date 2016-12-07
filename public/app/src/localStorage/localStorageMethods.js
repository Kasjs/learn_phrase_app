import { getSelected } from '../actions/pageActions'

export let setCat = [];

export let localSync = function(index) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    let catagories = JSON.parse(localStorage.getItem('categories_' + selected ));
    let promise = Promise.resolve(selected, catagories).then(function() {
        ++catagories[index].hits;
        localStorage.setItem('categories_' + selected, JSON.stringify(catagories))
    });
}

export function setCategory(response) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    localStorage.setItem('categories_' + selected , JSON.stringify(response.data[selected]));
    setCat = JSON.parse(localStorage.getItem('categories_' + getSelected()));
    return setCat;
}

export function offlineUpdateCategory(newCategoryName, categoryContent) {
    let categoryNames = JSON.parse(localStorage.getItem('options'));
    console.log(categoryNames);
    let newCategoryField = [];
    newCategoryField.push(categoryContent);
    categoryNames.push(newCategoryName);
    localStorage.setItem('options', JSON.stringify(categoryNames));
    localStorage.setItem('categories_' + newCategoryName.label, JSON.stringify(newCategoryField));
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
