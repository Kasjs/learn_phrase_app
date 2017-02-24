module.exports = {
    'Step one' : function (browser) {
        var getRandomEmail = function() {
            var email = 'test@test' + Math.floor(Math.random() * 15000) + '.com';
            return email;
        }
        browser
            .url('localhost:3000')
            .waitForElementVisible('body', 1000)
            .click('.register-btn')
            .waitForElementVisible('.row', 1000)
            .setValue('.email', getRandomEmail())
            .pause(500)
            .setValue('.password', '12345678')
            .pause(500)
            .setValue('.rep-password', '12345678')
            .pause(500)
            .setValue('.secret-word', 'softserve')
            .pause(500)
            .click('.submit-btn')
            .pause(3000)
            .click('.submit-btn')
            .pause(1000)
            .end()
    }
};
