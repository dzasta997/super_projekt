import React from "react";
import { useState } from "react";

export const LocationContext = React.createContext({
    user: null,
    setUser: () => {}
  });
