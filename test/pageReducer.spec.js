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
    it('should change card sides', () => {
        expect(pageReducer({ "side": "side_a" }, { type : 'SWITCH_LANGUAGE' })).to.eql({
            "side": "side_b"
        });
        expect(pageReducer({ "side": "side_b" }, { type : 'SWITCH_LANGUAGE' })).to.eql({
            "side": "side_a"
        });
        expect(pageReducer({}, { type : 'SWITCH_LANGUAGE' })).to.eql({
            "side": "side_a"
        });
    });
    it('should swith to offline and online mode', () => {
        expect(pageReducer({ isOffline: true }, { type: 'SWITCH_OFFLINE_ONLINE_MODE' })).to.eql({
            "isOffline": false
        });
        expect(pageReducer({ isOffline: false }, { type: 'SWITCH_OFFLINE_ONLINE_MODE' })).to.eql({
            "isOffline": true
        });
        expect(pageReducer({}, { type: 'SWITCH_OFFLINE_ONLINE_MODE' })).to.eql({
            "isOffline": true
        });
    });
    it('should clear page info login state', () => {
        expect(pageReducer({}, { type: 'CLEAR_PAGE_INFO_AND_LOGOUT' })).to.eql({
            phrase: '',
            hits: 0,
            counter: 0
        });
    });
    it('should update category content', () => {
        expect(pageReducer({}, { type: 'UPDATE_CATEGORY_CONTENT' })).to.eql({
            phrase: '',
            hits: 0,
            counter: 0
        });
    });
    it('should show msg unauthorized users', () => {
        expect(pageReducer({}, { type: 'SHOW_MSG_UNAUTHORIZED_UZERS' })).to.eql({
            "unAuthorizedMsg": undefined
        });
    });
    it('should clear msg unauthorized users', () => {
        expect(pageReducer({}, { type: 'CLEAR_MSG_UNAUTHORIZED_UZERS' })).to.eql({
            "unAuthorizedMsg": ""
        });
    });
    it('should synchronize category and hits', () => {
        expect(pageReducer({}, { type: 'SYNC_CAT_AND_RATING' })).to.eql({
            "phrase": undefined
        });
    });
    it('should get selected category', () => {
        expect(pageReducer({}, { type: 'GET_SELECTED_CATEGORY' })).to.eql({
            "phrase": undefined
        });
    });
});
