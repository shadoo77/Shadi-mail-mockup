import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RootContextProvider } from "./store/";
import MainApp from "./components/MainApp";
import "./App.css";

const WrongPage = () => (
  <h2 style={{ color: "red" }}>
    <center>Error 404: Wrong page!</center>
  </h2>
);

const paths = [
  "/account/accId/:accId/container/:cont",
  "/account/accId/:accId/container/:cont/mssg/:msgId"
];

function App() {
  return (
    <Router>
      <div className="App">
        <RootContextProvider>
          <Switch>
            <Route path="/" exact component={MainApp} />
            {paths.map(path => (
              <Route path={path} component={MainApp} key={path} />
            ))}
            {/* <Route
              path="/account/accId/:accId/mssg/:msgId"
              component={MainApp}
            /> */}

            <Route path="/404" exact component={WrongPage} />
            <Route path="*" exact component={WrongPage} />
          </Switch>
        </RootContextProvider>
      </div>
    </Router>
  );
}

export default App;
