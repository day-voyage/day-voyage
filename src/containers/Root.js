import React from 'react';
import {Provider} from 'react-redux';
import routes from '../routes';
import {ReduxRouter} from 'redux-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class Root extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Provider store={this.props.store}>
              <div>
                <ReduxRouter>
                  {routes}
                </ReduxRouter>
              </div>
            </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}
