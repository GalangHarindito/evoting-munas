import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { routes } from "./configs";
import AppContextProvider from "./contexts";
import pages from './pages';
import PageBase from "./component/layout/PageBase";
import {getToken} from "./utils/storage";
import 'react-toastify/dist/ReactToastify.css';

function App({ history, store }) {

  if (window.location.pathname!== '/login' && window.location.pathname!=='/sign-up') {
    if (!getToken()) {
      window.location.href = '/login';
    } 
  //  else if (checkExpireTime()) {
  //    clearStorages();
  //    window.location.href = routes.LOGIN;
  //  }
  } else if (window.location.pathname===routes.LOGIN && getToken()){
    window.location.href = routes.DASHBOARD;
  }

  const MainPages = () => (
    <PageBase>
      <Switch>
        <Route exact path={routes.DASHBOARD()} component={pages.Dashboard} />
        <Route exact path={routes.PROFILE()} component={pages.Profile} />
        <Route exact path={routes.EVOTING()} component={pages.Evoting} />
      </Switch>
    </PageBase>
  );

  return (
    <Provider store={store} >
      <Router history={history}>
      <AppContextProvider>
      <Switch>
        <Route exact path={ routes.LOGIN() } component={pages.Login} />
        <Route exact path={ routes.REGISTER() } component={pages.Register} />
        <Route exact path={ routes.FORGOTPASSWORD() } component={pages.ForgotPassword} />
        <Route component={MainPages} />
      </Switch>
      </AppContextProvider>
    </Router>
    </Provider>

  );
}

export default App;
