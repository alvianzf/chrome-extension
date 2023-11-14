
class App {
    constructor() {
        this.toggle = false;
        this.app = document.getElementById('app');
        this.observer = this.createObserver();
    }

    createStyles() {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
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
        `;
        return styleElement;
    }

    createTopBar() {
        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        topBar.innerHTML = `
            Lorem ipsum dolor sit amet
            <div id="toggle-button" class="toggle-button">Show</div>
        `;
        return topBar;
    }

    createSideBar() {
        const sideBar = document.createElement('div');
        sideBar.className = 'side-bar';
        sideBar.textContent = 'SideBar';
        return sideBar;
    }

    toggleSidebar() {
        this.toggle = !this.toggle;
        const sideBar = document.querySelector('.side-bar');
        const app = document.getElementById('app');
        const btn = document.getElementById('toggle-button');
        if (!this.toggle) {
            sideBar.style.display = 'none';
            app.style.width = '100%';
            btn.textContent = 'Show';
        } else {
            sideBar.style.display = 'flex';
            app.style.width = 'calc(100vw - 23em)';
            btn.textContent = 'Hide';
        }
    }

    createObserver() {
        return new MutationObserver((mutationsList, observer) => {
            if (this.app.childElementCount > 0) {
                document.body.prepend(this.createStyles());
                document.body.prepend(this.createTopBar());
                document.body.prepend(this.createSideBar());
                document.getElementById('toggle-button').addEventListener('click', () => this.toggleSidebar());
                observer.disconnect();
            }
        });
    }

    start() {
        this.observer.observe(this.app, { childList: true });
    }
}

const app = new App();
app.start();

