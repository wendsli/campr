import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import CampgroundsIndexContainer from "./CampgroundsIndexContainer"

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CampgroundsIndexContainer} />
          <Route exact path="/campgrounds"
            component={CampgroundsIndexContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App
