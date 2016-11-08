export let localSync = function(index) {
    let selected = JSON.parse(localStorage.getItem('selected'));
    let catagories = JSON.parse(localStorage.getItem('catagories_' + selected ));
    ++catagories[index].hits;
    localStorage.setItem('catagories_' + selected, JSON.stringify(catagories));
}
