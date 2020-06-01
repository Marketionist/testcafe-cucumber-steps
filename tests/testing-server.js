'use strict';

// Add testing server to provide pages for tests
let { nodeTestingServer } = require('node-testing-server');

// Settings for node testing server
nodeTestingServer.config = {
    hostname: 'localhost',
    port: 8001,
    logsEnabled: 0,
    pages: {
        '/test1.html': `<title>Test1 Page</title><a id="link-test2-page" href="
            http://localhost:8001/test2.html">Test2 page</a>
            <script>
                window.onload = function () {
                    document.querySelector('h1').addEventListener("mouseover", function () {
                        document.getElementById("text-test").innerHTML = 'Test 1 sample text';
                    });
                    document.querySelector('h1').addEventListener("mouseout", function () {
                        document.getElementById("text-test").innerHTML = '';
                    });
                }
            </script>
            <h1>Test1 page</h1>
            <p id="text-test"></p>`,
        '/test2.html': `<title>Test2 Page</title>
            <script>
                window.onload = function () {
                    document.getElementById("login").addEventListener("click", function () {
                        document.getElementById("block-credentials").innerHTML = document
                            .getElementById("input-username").value + document
                            .getElementById("input-password").value;
                    });
                    document.getElementById("input-colors").addEventListener("input", function () {
                        document.getElementById("block-input-color").innerHTML = document
                            .getElementById("input-colors").value;
                    });
                    document.getElementById("dropdown-colors").addEventListener("change", function () {
                        document.getElementById("block-dropdown-color").innerHTML = document
                            .getElementById("dropdown-colors").value;
                    });
                }
            </script>
            <h1>Test2 page</h1>
            <p>Credentials are: <span id="block-credentials"></span></p>
            <form>
                Sign in:<br>
                <input id="input-username" type="text" name="input-username" placeholder="Username" value=""><br>
                <input id="input-password" type="password" name="input-password" placeholder="Password" value=""><br>
            </form>
            <button id="login">Sign in</button>
            <p>Typed in input color is: <span id="block-input-color"></span></p>
            <form>
                Colors:<br>
                <input id="input-colors" type="text" value=""><br>
                <input type="submit" value="Submit">
            </form>
            <p>Selected dropdown color is: <span id="block-dropdown-color"></span></p>
            <select id="dropdown-colors" name="colors">
                <option value="default color">Default color</option>
                <option value="black">Black</option>
                <option value="grey">Grey</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="crimson">Crimson</option>
                <option value="magenta">Magenta</option>
                <option value="blue">Blue</option>
                <option value="aqua">Aqua</option>
                <option value="cyan">Cyan</option>
                <option value="indigo">Indigo</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="Gold">Gold</option>
                <option value="orange">Orange</option>
            </select>`,
        '/test-iframe.html': `<title>Test Page with iframe</title>
            <h1>Test page with iframe</h1>
            <iframe src="test1.html" id="iframe-test1" name="test iframe" width="400" height="300" align="left">
                <p>Your browser does not support iframes</p>
            </iframe>`,
        '/test-alert.html': `<title>Test Page with alert</title>
            <script>
                window.onload = function () {
                    document.getElementById("button-launch-alert").addEventListener("click", function () {
                        let alertStatus;
                        if (confirm("Accept (OK) or Dismiss (Cancel) - press a button!") == true) {
                            alertStatus = "Alert was accepted!";
                        } else {
                            alertStatus = "Alert was canceled!";
                        }
                        document.getElementById("block-alert-status").innerHTML = alertStatus;
                    });
                }
            </script>
            <h1>Test page with alert</h1>
            <button id="button-launch-alert">Launch alert</button>
            <p id="block-alert-status"></p>`,
        '/test-loader.html': `<title>Test Page with loader</title>
            <style>
                #loader {
                    width: 70%;
                    height: 70%;
                    position: fixed;
                    z-index: 9999;
                    background-color: #FFD700;
                }
            </style>
            <script>
                function insertAfter(referenceNode, newNode) {
                    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
                }
                function showLoader (idValue, timeToSpin = 5000) {
                    const blockLoader = document.createElement('div');

                    blockLoader.setAttribute('id', idValue);
                    document.body.insertBefore(blockLoader, document.body.firstChild);

                    setTimeout(function () {
                        document.getElementById(idValue).remove();
                    }, timeToSpin);
                }
                function showContentWithDelay (timeDelay = 5000) {
                    const title = document.querySelector('h1');
                    let blockContent = document.createElement('p');
                    blockContent.setAttribute('id', 'block-content');
                    blockContent.innerHTML = 'This is a test content on a page with loader';

                    setTimeout(function () {
                        insertAfter(title, blockContent);
                    }, timeDelay);
                }
                document.addEventListener('DOMContentLoaded', () => {
                    const timeout1 = 6000;
                    const timeout2 = 8000;

                    showLoader('loader', timeout1);
                    showContentWithDelay(timeout2);
                });
            </script>
            <h1>Test page with loader</h1>`
    }
}
// Start node testing server
nodeTestingServer.start();
