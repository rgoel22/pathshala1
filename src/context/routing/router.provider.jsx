import { useCallback, useState } from "react";
import { RouterContext } from "./router.context";

export const RouterProvider = (props) => {
  const [route, setRoute] = useState("");
  const [context, setContext] = useState({});

  const changeRoute = useCallback((route, context) => {
    setRoute(route);
    setContext(context);
  }, []);

  return (
    <RouterContext.Provider value={{ route, context, changeRoute }}>
      {props.children}
    </RouterContext.Provider>
  );
};
