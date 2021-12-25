import React, {useState, createContext, useEffect } from "react";
import {getUserInfo} from "../Backend/getUserInfo";
import {auth} from "../Backend/firebase";


export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
    const [adminMode, setAdminMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);


    return(
        <SettingsContext.Provider value={{administrationState: [adminMode, setAdminMode], userDataState: [userData, setUserData]}}>
            {props.children}
        </SettingsContext.Provider>
    )
}