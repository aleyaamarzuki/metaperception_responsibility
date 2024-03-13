import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; //makes it faster to link to task on participant's browser https://reactrouter.com/en/main/start/overview

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();

    return <Component navigate={navigate} {...location} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
