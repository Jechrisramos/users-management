import React from "react";

export default React.createContext();

//used CreateContext() instead of props as Contexts can set to global.
//in our case we set certain user object global to all active components in the app.js