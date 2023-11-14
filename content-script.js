const css = `<style>
.top-bar {
    width: 100vw;
    height: 4em;
    font-size: large;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    z-index: 999;
    box-sizing: border-box;
    padding: 1em;
    color: black !important;
}

.side-bar {
    width: 20em;
    height: 100vh;
    font-size: large;
    display: none;
    position: fixed;
    top: 4em;
    right: 0;
    background: white;
    z-index: 999;
    box-sizing: border-box;
    padding: 1em;
    color: black !important;
}

.toggle-button {
    padding: 0.1em 1em;
    color: white;
    background: blue;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}

.toggle-button:hover {
    background: darkblue;
}

#app {
    top: 4em !important;
    height: calc(100% - 6em) !important;
}

</style>`;

const topBar = `<div class="top-bar">
    Lorem ipsum dolor sit amet
    <div id="toggle-button" class="toggle-button">Show</div>
</div>`;

var toggle = false;

function toggleSidebar() {
    toggle = !toggle;

    // Get the sideBar and app elements
    let sideBar = document.querySelector('.side-bar');
    let app = document.getElementById('app');
    let btn = document.getElementById('toggle-button')

    // If toggle is false, hide the sideBar and set the #app width to 100%
    if (!toggle) {
        sideBar.style.display = 'none';
        app.style.width = '100%';
        btn.innerHTML = 'Show'
    }
    // If toggle is true, show the sideBar and set the #app width to calc(100vw - 22em)
    else {
        sideBar.style.display = 'flex';
        app.style.width = 'calc(100vw - 23em)';
        btn.innerHTML = 'Hide'
    }
}

const sideBar = `<div class="side-bar">
SideBar </div>`;

// Get the app element
let app = document.getElementById('app');

// Create a new MutationObserver instance
let observer = new MutationObserver((mutationsList, observer) => {
 // If the app element has at least one child element
 if (app.childElementCount > 0) {
   // Insert the CSS
   document.body.insertAdjacentHTML('afterbegin', css);
   document.body.insertAdjacentHTML('afterbegin', topBar);
   document.body.insertAdjacentHTML('afterbegin', sideBar);

   // Disconnect the observer
   observer.disconnect();

   // Add event listener to the toggle button
   document.getElementById('toggle-button').addEventListener('click', toggleSidebar);
 }
});

// Start observing the app element for childList changes
observer.observe(app, { childList: true });
