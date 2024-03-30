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
  // console.log(user.)
  const dispatch = useDispatch();
  const handleUserLogin = (user) => {
    dispatch(
        login({
            userName: user.displayName,
            photo: user.photoURL,
            email: user.email,
            uid: user.uid,
        })
    );
};
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        handleUserLogin(authUser); // Call the function to handle user login
        console.log("AuthUser", authUser.displayName);
      }
    });
  }, [dispatch]);
  return (
    <div className='App'>
        {user ? <Askaro /> : <Login onUserLoggedIn={handleUserLogin} />} {/* Pass the handleUserLogin function as a prop */}
    </div>
);
}

export default App;
