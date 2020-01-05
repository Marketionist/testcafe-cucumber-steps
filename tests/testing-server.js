'use strict';

// Add testing server to provide pages for tests
const { nodeTestingServer } = require('node-testing-server');

// Settings for node testing server
nodeTestingServer.config = {
    hostname: 'localhost',
    port: 8001,
    logsEnabled: 0,
    pages: {
        '/test1.html': `<title>Test1 Page</title><a id="link-test2-page" href="
            http://localhost:8001/test2.html">Test2 page</a>
            <script>
                window.onload = function() {
                    document.querySelector('h1').addEventListener("mouseover", function() {
                        document.getElementById("text-test").innerHTML = 'Test 1 sample text';
                    });
                    document.querySelector('h1').addEventListener("mouseout", function() {
                        document.getElementById("text-test").innerHTML = '';
                    });
                }
            </script>
            <h1>Test1 page</h1>
            <p id="text-test"></p>`,
        '/test2.html': `<title>Test2 Page</title>
            <script>
                window.onload = function() {
                    document.getElementById("dropdown-colors").addEventListener("change", function() {
                        document.getElementById("block-selected-color").innerHTML = document
                            .getElementById("dropdown-colors").value;
                    });
                }
            </script>
            <h1>Test2 page</h1>
            <p>Selected color is: <span id="block-selected-color"></span></p>
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
                window.onload = function() {
                    document.getElementById("button-launch-alert").addEventListener("click", function() {
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
            <p id="block-alert-status"></p>`
    }
}
// Start node testing server
nodeTestingServer.start();