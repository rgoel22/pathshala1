import { useCallback, useState } from "react";
import { UserContext } from "./user.context";

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const changeUser = useCallback(
    (user) => {
      setUser(user);
    },
    [setUser]
  );

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
