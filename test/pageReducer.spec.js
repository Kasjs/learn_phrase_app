import pageReducer from '../public/app/src/reducers/page'

describe('page reducers', () => {
    it('should return the initial state', () =>{
        expect(pageReducer({
            isOffline: false,
            phrase: '',
            counter: 0,
            side: 'side_a',
            hits: 0,
            unAuthorizedMsg: ''
        },{})).to.eql(
            {
                isOffline: false,
                phrase: '',
                counter: 0,
                side: 'side_a',
                hits: 0,
                unAuthorizedMsg: ''
            }
        );
    });
});
