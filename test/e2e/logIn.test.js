module.exports = {
    'Log In success' : function (browser) {
        browser
            .url('localhost:3000')
            .waitForElementVisible('body', 1000)
            .click('.login-btn')
            .waitForElementVisible('.row', 1000)
            .setValue('.form-control', 'test@test.com')
            .pause(500)
            .setValue('input[type=password]', '12345678')
            .pause(500)
            .click('.submit-btn')
            .pause(1000)
            .click('.log-out-btn')
            .pause(1000)
            .end()
    },
    'Log In error msg' : function (browser) {
        browser
            .url('localhost:3000')
            .waitForElementVisible('body', 1000)
            .click('.login-btn')
            .pause(400)
            .clearValue('.form-control')
            .pause(1000)
            .clearValue('input[type=password]')
            .pause(1000)
            .click('.submit-btn')
            .pause(2000)
            .assert.containsText('.msg-client-error', 'Please fill out all fields')
            .end();
    }
};
