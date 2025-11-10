import React, { createContext, useEffect, useState } from "react";
export let AuthContext = createContext();
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.config";
const auth = getAuth(app);
let provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);
  let createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  let logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  let popIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  let logOut = () => {
    return signOut(auth);
  };
  let updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  let authData = {
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    loading,
    updateUser,
    popIn,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
