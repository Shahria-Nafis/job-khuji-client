// src/context/AuthProvider.jsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext"; // ✅ AuthContext import
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithPopup,
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .finally(() => setLoading(false));
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
