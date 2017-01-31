'use scrict'
import { getSelected } from '../actions/pageActions'

export function setCat (categories) {
    let setCat = [];
    if (categories) {
        setCat = categories;
    }
    return setCat;
}

export let localSync = function(index) {
    let selected = JSON.parse(getSelectedCategory());
    let categories = getCategoryField(selected);
    Promise.resolve(selected, categories).then(function() {
        ++categories[index].hits;
        setCategoryField(selected, categories);
    });
}

export function setCategory(response) {
    let selected = JSON.parse(getSelectedCategory());
    if (!selected) {
        return;
    }
    Promise.resolve(selected, response).then(function() {
        setCategoryField(selected, response.data[selected]);
    });
    return setCat(getCategoryField(getSelected()));
}

function createNewCategory(newCategoryName, categoryContent) {
    Promise.resolve(newCategoryName, categoryContent).then(function(response) {
        let categoryNames = JSON.parse(getCategoryOptions());
        categoryNames.push(newCategoryName);
        setCategoryOptions(categoryNames);
        let newCategoryField = [];
        newCategoryField.push(categoryContent);
        setCategoryField(newCategoryName.label, newCategoryField);
    });
}

export function offlineUpdateCategory(newCategoryName, categoryContent) {
    Promise.resolve(newCategoryName, categoryContent).then(function() {
        let categoryNames = JSON.parse(getCategoryOptions()),
        sameContent = false,
        sameCategory = false,
        categoryData = [];
        categoryNames.forEach(function(item) {
            if ( item.label === newCategoryName.label ) {
                sameCategory = true;
                categoryData = getCategoryField(item.label);
                categoryData.forEach(function(itemData) {
                    if ( itemData.side_b === categoryContent.side_b ) {
                        sameContent = true;
                    }
                });
            }
        });
        if (sameContent) {
            setCategoryOptions(categoryNames);
            setCategoryField(newCategoryName.label, categoryData);
        } else {
            setCategoryOptions(categoryNames);
            categoryData.push(categoryContent);
            setCategoryField(newCategoryName.label, categoryData);
        }
        if (!sameCategory) {
            createNewCategory(newCategoryName, categoryContent);
        }
    });
}

export function setCategoryOffline() {
    let selected = JSON.parse(getSelectedCategory());
    localStorage.setItem('categories_' + selected, localStorage.getItem('categories_' + getSelected()));
    return setCat(getCategoryField(getSelected()));
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

export function removeCategoryField(name) {
    localStorage.removeItem('categories_' + name);
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

export function setSelectedCategory(selected) {
    localStorage.setItem('selected', selected);
}

export function setIsOfflineField(isOffline) {
    localStorage.setItem('isOffline', isOffline);
}

export function getIsOfflineField() {
    return localStorage.getItem('isOffline');
}

export function removeIsOfflineField() {
    localStorage.removeItem('isOffline');
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
