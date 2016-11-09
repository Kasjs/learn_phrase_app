export let localSync = function(index) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    let catagories = JSON.parse(localStorage.getItem('catagories_' + selected ));
    let promise = Promise.resolve(selected, catagories).then(function() {
        ++catagories[index].hits;
        localStorage.setItem('catagories_' + selected, JSON.stringify(catagories))
    });

}
