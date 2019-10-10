import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import reducer from "./reducer";
import Todo from "./routes/Todo/Todo";
import Generate from "./routes/Generate";
import WorkSpace from "./routes/WorkSpace";
import "./index.css";

const middleware = [logger, thunk];
// const middleware = [thunk].concat(process.env.NODE_ENV === `development`?logger:[]);
const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    composeWithDevTools()
  )
);
ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WorkSpace} />
          <Route path="/generate" component={Generate} />
          <Route path="/todo/:userId" component={Todo} />
          <Redirect from="/huang" to="/login" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </LocaleProvider>,
  document.getElementById("root") as HTMLElement
);
