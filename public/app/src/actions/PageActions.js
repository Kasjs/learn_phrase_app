import {arrayOfData} from './arrayOfData'

export function getBackPhrase() {
    return {
        type: 'GET_BACK_PHRASE_REQUEST',
        payload: arrayOfData
    }
}

export function getNextPhrase() {
    return {
        type: 'GET_NEXT_PHRASE_REQUEST',
        payload: arrayOfData
    }
}

export function getRandomPhrase() {
    return {
        type: 'GET_RANDOM_PHRASE_REQUEST',
        payload: arrayOfData
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
        payload: arrayOfData
    }
}

export function getSelectedCategory(value) {
    return {
        type: 'GET_SELECTED_CATEGORY_FOOD',
        payload: function() {
            $.ajax('/category/food').then(function(response) {
                console.log(response.data)
                return response.data.Food;
            })
        }
    }
}
// export function getSelectedCategorySport() {
//     return {
//         type: 'GET_SELECTED_CATEGORY_SPORT',
//         payload: function() {
//             $.ajax('/category/food').then(function(response) {
//                 console.log(response.data)
//                 return response.data.Sport;
//             })
//         }
//     }
// }
// export function getSelectedCategoryNature() {
//     return {
//         type: 'GET_SELECTED_CATEGORY_NATURE',
//         payload: function() {
//             $.ajax('/category/food').then(function(response) {
//                 console.log(response.data)
//                 return response.data.Nature;
//             })
//         }
//     }
// }
