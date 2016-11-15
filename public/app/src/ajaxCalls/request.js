import { getSelected, getCategoryFromStorage } from '../actions/pageActions'
import { browserHistory, hashHistory } from 'react-router'
export let setCat = [];
export function getCategoryFromServer(value) {
    $.get('/category').then(function(response) {
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

export function syncWithServer() {
    $.post('/category',
        {
            data : JSON.parse(localStorage.getItem('catagories_' + getSelected())),
            category: getSelected()

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
        console.log('user was successful auth');
        console.log(response.user.email);
        
    });
}
