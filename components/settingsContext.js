import React, {useState, createContext, useEffect } from "react";
import {getUserInfo} from "../Backend/getUserInfo";
import {auth} from "../Backend/firebase";


export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
    const [adminMode, setAdminMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const user = auth.currentUser;

    // // if(user) {
    // // getUserInfo(user.uid)
    // // .then(doc => {
    // //     if(loading) {
    // //     setUserData(doc.data());
    // // }
    // // })
    // // .then(() => {setLoading(false);})}
    // if(user){
    //     useEffect(() => {
    //         setUserData(getUserInfo(user.uid));
    //     }, []);
    // }


    return(
        <SettingsContext.Provider value={{administrationState: [adminMode, setAdminMode]}}>
            {props.children}
        </SettingsContext.Provider>
    )
}