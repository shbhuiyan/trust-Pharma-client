/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)


    const createNewUser = (email , password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const updateUser = (name , imageUrl) => {
      return updateProfile(auth.currentUser, {displayName:name , photoURL:imageUrl})
    }

    const loginUser = (email , password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth , email , password)
    }

    const  userLogOut = () => {
      setLoading(true)
      return signOut(auth)
    }

    const loginWithGoogle = (provider) => {
      setLoading(true)
      return signInWithPopup(auth , provider)
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth , currentUser => {
        setUser(currentUser)
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    },[])



    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createNewUser,
        updateUser,
        loginUser,
        userLogOut,
        loginWithGoogle,
    }

  return <AuthContext.Provider value={authInfo} >
    {children}
  </AuthContext.Provider> ;
};

export default AuthProvider;
