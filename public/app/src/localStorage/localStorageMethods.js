export let localSync = function(index) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    let catagories = JSON.parse(localStorage.getItem('catagories_' + selected ));
    let promise = Promise.resolve(selected, catagories).then(function() {
        ++catagories[index].hits;
        localStorage.setItem('catagories_' + selected, JSON.stringify(catagories))
    });

}

export function getEmailFromLocalStrg() {
    return localStorage.getItem('email');
}

export function getHiddenFromLocalStrg() {
    return JSON.parse(localStorage.getItem('hidden'));
}

export function setEmailToLocalStrg(email) {
    localStorage.setItem('email', email)
}

export function setHiddenToLocalStrg() {
    localStorage.setItem('hidden', true)
}

export function logOut() {
    localStorage.removeItem('hidden');
    localStorage.removeItem('email');
}
