import * as PageAction from '../public/app/src/actions/PageActions'


describe('PageAction', () => {
    it('should create an action to getBackPhrase', () => {
        const expectedAction = {
            type: "GET_BACK_PHRASE_REQUEST",
            payload : {}
        }
    expect(PageAction.getBackPhrase()).to.eql(expectedAction);
    });
    it('should create an action to getNextPhrase', () => {
        const expectedAction = {
            type: "GET_NEXT_PHRASE_REQUEST",
            payload : {}
        }
    expect(PageAction.getNextPhrase()).to.eql(expectedAction);
    });
    it('should create an action to getRandomPhrase', () => {
        const expectedAction = {
            type: "GET_RANDOM_PHRASE_REQUEST",
            payload : {}
        }
    expect(PageAction.getRandomPhrase()).to.eql(expectedAction);
    });
    it('should create an action to switchLanguage', () => {
        const expectedAction = {
            type: "SWITCH_LANGUAGE"
        }
    expect(PageAction.switchLanguage()).to.eql(expectedAction);
    });
    it('should create an action to getPhrase', () => {
        const expectedAction = {
            type: "GET_PHRASE",
            payload: {}
        }
    expect(PageAction.getPhrase()).to.eql(expectedAction);
    });
    it('should create an action to getSelectedCategory', () => {
        const expectedAction = {
            type: "GET_SELECTED_CATEGORY",
            payload: undefined
        }
    expect(PageAction.getSelectedCategory()).to.eql(expectedAction);
    });
    it('should create an action to syncCatAndRating', () => {
        const expectedAction = {
            type: "SYNC_CAT_AND_RATING",
            payload: undefined
        }
    expect(PageAction.syncCatAndRating()).to.eql(expectedAction);
    });
    it('should create an action to clearPageInfo', () => {
        const expectedAction = {
            type: "CLEAR_PAGE_INFO_AND_LOGOUT"
        }
    expect(PageAction.clearPageInfo()).to.eql(expectedAction);
    });
    it('should create an action to updateCategoryContent', () => {
        const expectedAction = {
            type: "UPDATE_CATEGORY_CONTENT"
        }
    expect(PageAction.updateCategoryContent()).to.eql(expectedAction);
    });
    it('should create an action to switchOfflineOnLineMode', () => {
        const expectedAction = {
            type: "SWITCH_OFFLINE_ONLINE_MODE"
        }
    expect(PageAction.switchOfflineOnLineMode()).to.eql(expectedAction);
    });
    it('should create an action to showMsgUnauthorizedUsers', () => {
        const expectedAction = {
            type: "SHOW_MSG_UNAUTHORIZED_UZERS",
            payload: "First you have to SignIn or SignUp"
        }
    expect(PageAction.showMsgUnauthorizedUsers()).to.eql(expectedAction);
    });
    it('should create an action to clearMsgUnauthorizedUsers', () => {
        const expectedAction = {
            type: "CLEAR_MSG_UNAUTHORIZED_UZERS",
            payload: ""
        }
    expect(PageAction.clearMsgUnauthorizedUsers()).to.eql(expectedAction);
    });
});
