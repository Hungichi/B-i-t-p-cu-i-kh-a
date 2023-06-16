
import Login from "./login.js";

class App {
    activeScreen
    container

    constructor (container) {
        this.container = container;
    }

    changeActiveScreen (screen) {
        if (this.activeScreen !== undefined) {
            // set lai gia tri cho container neu da hien thi signin hoac signup
            this.container.innerHTML = ""; 
        }

        this.activeScreen = screen;
        this.activeScreen.initRender(this.container);
    }
}
const container = document.getElementById("app");
const login = new Login();
const app = new App(container);
app.changeActiveScreen(login);



export default app;