import app from 'ampersand-app';
import Router from './router';
import styles from './styles/main.styl';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import icons from '../node_modules/octicons/octicons/octicons.css';

//expose app to browser console
window.app = app;

app.extend({
    init () {
    this.router = new Router;
    this.router.history.start();
  }
})

app.init();

