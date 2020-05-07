import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import CampgroundsIndexContainer from "./CampgroundsIndexContainer"
import NewCampgroundContainer from "./NewCampgroundContainer"

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CampgroundsIndexContainer} />
          <Route exact path="/campgrounds"
            component={CampgroundsIndexContainer} />
          <Route exact path="/campgrounds/new"
            component={NewCampgroundContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App
