export let localSync = function(index) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    let catagories = JSON.parse(localStorage.getItem('catagories_' + selected ));
    let promise = Promise.resolve(selected, catagories).then(function() {
        ++catagories[index].hits;
        localStorage.setItem('catagories_' + selected, JSON.stringify(catagories))
    });

}

export function getEmailFromLocalStrg() {
    return window.localStorage.getItem('email');
}

export function getHiddenFromLocalStrg() {
    var hidden = JSON.parse(localStorage.getItem('hidden'));

    return JSON.parse(localStorage.getItem('hidden'));
}

export function setEmailToLocalStrg(email) {
    return localStorage.setItem('email', email)
}

export function setHiddenToLocalStrg() {
    return window.localStorage.setItem('hidden', true)
}

export function logOut() {
    localStorage.clear();
    localStorage.setItem('hidden', false);
}
