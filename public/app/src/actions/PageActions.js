let setCat = [];

export function getBackPhrase() {
    return {
        type: 'GET_BACK_PHRASE_REQUEST',
        payload: setCat.length === 0 ? JSON.parse(localStorage.getItem('catagories')) : setCat
    }
}

export function getNextPhrase() {
    return {
        type: 'GET_NEXT_PHRASE_REQUEST',
        payload: setCat.length === 0 ? JSON.parse(localStorage.getItem('catagories')) : setCat
    }
}

export function getRandomPhrase() {
    return {
        type: 'GET_RANDOM_PHRASE_REQUEST',
        payload: setCat.length === 0 ? JSON.parse(localStorage.getItem('catagories')) : setCat
    }
}

export function switchLanguage() {
    return {
        type: 'SWITCH_LANGUAGE'
    }
}

export function getPhrase() {
    return {
        type: 'GET_PHRASE',
        payload: setCat.length === 0 ? JSON.parse(localStorage.getItem('catagories')) : setCat
    }
}

export function getSelectedCategory(value) {
    return {
        type: 'GET_SELECTED_CATEGORY',
        payload: function() {
            $.get('/category').then(function(response) {
                switch(value) {
                    case 'Food' : {
                        localStorage.setItem('catagories', JSON.stringify(response.data[0].Food));
                        setCat = JSON.parse(localStorage.getItem('catagories'));
                        return setCat
                    }
                    case 'Sport' : {
                        localStorage.setItem('catagories', JSON.stringify(response.data[0].Sport));
                        setCat = JSON.parse(localStorage.getItem('catagories'));
                        return setCat
                    }
                    case 'Nature' : {
                        localStorage.setItem('catagories', JSON.stringify(response.data[0].Nature));
                        setCat = JSON.parse(localStorage.getItem('catagories'));
                        return setCat
                    }
                }
            }, function(error) {
                console.log(error.data)
            })
        }
    }
}

export function syncCatAndRating() {
    return {
        type: 'SYNC_CAT_AND_RATING',
        payload: function() {

        }
    }
}
