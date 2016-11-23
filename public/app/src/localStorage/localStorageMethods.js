import { getSelected } from '../actions/pageActions'

export let setCat = [];

export let localSync = function(index) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    let catagories = JSON.parse(localStorage.getItem('catagories_' + selected ));
    let promise = Promise.resolve(selected, catagories).then(function() {
        ++catagories[index].hits;
        localStorage.setItem('catagories_' + selected, JSON.stringify(catagories))
    });

}

export function setCategory(response) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    localStorage.setItem('catagories_' + selected , JSON.stringify(response.data[selected]));
    console.log(response.data[selected]);
    setCat = JSON.parse(localStorage.getItem('catagories_' + getSelected()));
    return setCat;
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
