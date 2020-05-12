import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faStore, faTree, faRestroom, faShower, faChargingStation, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faStore, faTree, faRestroom, faShower, faChargingStation, faTrashAlt)

import CampgroundsIndexContainer from "../containers/CampgroundsIndexContainer"
import NewCampgroundFormContainer from "../containers/NewCampgroundFormContainer"
import CampgroundShowContainer from "../containers/CampgroundShowContainer"

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CampgroundsIndexContainer} />
          <Route exact path="/campgrounds"
            component={CampgroundsIndexContainer} />
          <Route exact path="/campgrounds/new"
            component={NewCampgroundFormContainer} />
          <Route exact path="/campgrounds/:id"
            component={CampgroundShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App
