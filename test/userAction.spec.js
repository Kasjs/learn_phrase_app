import * as userAction from '../public/app/src/actions/userActions'
import { register, login, transferServerMsg } from '../public/app/src/ajaxCalls/request'

describe('userAction', () => {
    it('should create an action to registerNewUser', () => {
        const user = {
            email: 'test@email.com',
            password: 12345678
        };
        const expectedAction = {
            type: "POST_NEW_USER",
            payload : "{}"
        }
    expect(userAction.registerNewUser(user)).to.eql(expectedAction);
    });
    it('should create an action to loginUser', () => {
        const user = {
            email: 'test@email.com',
            password: 12345678
        };
        const expectedAction = {
            type: "LOGIN_USER",
            email : "{}",
            isAuthButtonsHidden: {},
            status: {}
        }
    expect(userAction.loginUser(user)).to.eql(expectedAction);
    });
    it('should create an action to logOutUser', () => {
        const user = {
            email: 'test@email.com',
            password: 12345678
        };
        const expectedAction = {
            type: "CLEAR_PAGE_INFO_AND_LOGOUT",
            email : "",
            isAuthButtonsHidden: false
        }
    expect(userAction.logOutUser(user)).to.eql(expectedAction);
    });
    it('should create an action to showErrorMsg', () => {
        const expectedAction = {
            type: "SHOW_ERROR_MESSAGE",
            clientMsg: 'Please fill out all fields'
        }
    expect(userAction.showErrorMsg()).to.eql(expectedAction);
    });
    it('should create an action to clearErrorMsg', () => {
        const expectedAction = {
            type: "CLEAR_ERROR_MESSAGE",
            clientMsg: ''
        }
    expect(userAction.clearErrorMsg()).to.eql(expectedAction);
    });
    it('should create an action to showCategoryMassage', () => {
        const expectedAction = {
            type: "SHOW_CATEGORY_MESSAGE",
            payload: 'Please fill out all fields'
        }
    expect(userAction.showCategoryMassage()).to.eql(expectedAction);
    });
});
