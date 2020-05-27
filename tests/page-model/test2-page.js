'use strict';

// #############################################################################

const { stamp } = require('js-automation-tools');

let test2Page = {

    protocol: 'http://',
    textGold: 'Gold',
    textIndigo: 'Indigo',
    dropdownColors: '#dropdown-colors',
    blockDropdownColor: '#block-dropdown-color',
    inputColors: '#input-colors',
    blockInputColor: '#block-input-color',
    urlTest1: 'http://localhost:8001/test1.html',
    pathTest1: '/test1.html',
    loginTest2: 'testUser',
    passwordTest2: '1111',
    inputUsername: '#input-username',
    inputPassword: '//*[@id="input-password"]',
    buttonLogin: '#login',
    blockCredentials: '#block-credentials',
    input: 'input',
    cookieTest: 'my_test_cookie1=11',
    bodyTest: '{"items":3,"item1":"nice","item2":true,"item3":[1,2,3]}',
    headersTest: '{"Content-Type":"application/json","Authorization":"Bearer EfGh2345"}',
    urlTestRequest: 'http://localhost:8001/post',
    updateText: function () {
        document.getElementById('text-test').innerHTML = 'Text to test ' +
            'script execution';
    },
    updateTextWithCookies: function () {
        document.getElementById('text-test').innerHTML = `${document.cookie}`;
    }

};

test2Page.pageTest2 = `${test2Page.protocol}localhost:8001/test2.html`;
test2Page.timestamp = `timestamp:${stamp.getTimestamp()}`;

module.exports = test2Page;
