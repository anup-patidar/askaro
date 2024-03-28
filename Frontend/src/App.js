import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import './App.css';
import Login from "./component/auth/login";
import Askaro from './component/Askaro';
import { login, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);
  return (
    <div className='App'>
      {user ? <Askaro /> : <Login />}
      <Askaro />

    </div>
  );
}

export default App;
