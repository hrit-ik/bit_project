import { db } from "./firestore";
import {auth} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import { useState, useEffect } from "react";

async function getUserInfo(id) {
    if(id === -1){
        const docRef = doc(db, "users", "-1");
        const data = await getDoc(docRef);
        return data;
    }
    const docRef = doc(db, "users", id);
    const data = await getDoc(docRef);
    return data;
}

export { getUserInfo };