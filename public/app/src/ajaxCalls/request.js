import { getSelected } from '../actions/pageActions'
import { showMassage } from '../actions/userActions'
import { browserHistory, hashHistory } from 'react-router'
import { registerNewUser, loginUser } from '../actions/userActions'
import { setLoginWhenSuccess, setLoginWhenError, setCategory, getSelectedCategory,
        getEmailFromLocalStrg, setCategoryOptions, setCategoryOffline, offlineUpdateCategory,
        setCategoryField, getCategoryField, setAdminField, getIsOfflineField,
        setSelectedCategory, getCategoryOptions
    } from '../localStorage/localStorageMethods'

export let msgErrorObj = {};

function calculateAllCategory(res) {
    let categoryLength = res.categoryNames.length
    for (let i = 0; i < categoryLength; i++) {
        let categoryName = res.categoryNames[i].label;
        setCategoryField(categoryName, res.data[categoryName]);
    }
    setSelectedCategory(JSON.stringify(res.categoryNames[0].label));
}

function calculateAllCategoryAndContent() {
    let categoryNames = JSON.parse(getCategoryOptions());
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
    let isOffline = getIsOfflineField();
    if (isOffline) {
        setCategoryOffline();
        return;
    } else {
        getCategory(data);
    }
}

let getCategory = (value) => {
    $.get('/category', { email : getEmailFromLocalStrg() }).then(function(response) {
        switch(value) {
            case getSelectedCategory() : {
                setCategory(response);
            }
        }
    }, function(error) {
        console.log('Error can\'t get data')

    })
}

export function syncWithServer() {
    let isOffline = getIsOfflineField();
    if (isOffline) {
        return;
    } else {
        changeCategory();
    }
}

let changeCategory = () => {
    $.post('/category',
    {
        data : getCategoryField(getSelected()),
        category: getSelected(),
        email: getEmailFromLocalStrg()
    }).then(function(response) {}, function(error) {
        console.log('Error can\'t sync')
    });
}

export function updateCategory(newCategoryName, categoryContent) {
    let isOffline = getIsOfflineField();
    if ( isOffline ) {
        offlineUpdateCategory(newCategoryName, categoryContent);
    } else {
        $.post('/addNewCategory',
        {
            name : newCategoryName.value,
            content: categoryContent,
            email: getEmailFromLocalStrg()
        }).then(function(response) {
            setCategoryOptions(response.categoryNames);
            setCategoryField(newCategoryName.label, response.data[newCategoryName.label]);
            location.reload();
            hashHistory.push('/addCategory');
        }, function(error) {
            console.log('Error can\'t sync')
        });
    }
}

export function getAllCategory() {
    $.get('/category', { email : getEmailFromLocalStrg() }).then(function(res) {
        calculateAllCategory(res);
    }, function(error) {
        console.log('Error can\'t get the data')
    })
}

export function syncAllCategoryAndContent() {
    calculateAllCategoryAndContent();
    $.post('/syncAllCategory',
        {
            email : getEmailFromLocalStrg(),
            categoryNames : calculateAllCategoryAndContent().categoryNames,
            categoryData : calculateAllCategoryAndContent().categoryData
        }).then(function(res) {
    }, function(error) {
        console.log('Error can\'t get the data')
    })
}

export function register(user) {
    $.post('/register',
        {
            email: user.email,
            password: user.password,
            repPassword: user.repPassword,
            secretWord: user.secretWord
        }).then(function(response) {
            hashHistory.push('/login');
        }, function(response) {
            let errorMsg = response.responseJSON.errors.email ?
            response.responseJSON.errors.email :
            response.responseJSON.errors.password;
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
