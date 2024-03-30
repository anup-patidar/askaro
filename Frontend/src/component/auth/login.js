import React, { useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match
    const [passwordLengthError, setPasswordLengthError] = useState(false); // State to track password length error

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed in:", user);
            // Additional logic after sign-in
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleSignUp = async () => {
        if (password.length < 6) {
            // Password is less than 6 characters, set passwordLengthError to true
            setPasswordLengthError(true);
            return; // Return without signing up
        }

        if (password !== confirmPassword) {
            // Passwords do not match, set passwordsMatch to false
            setPasswordsMatch(false);
            return; // Return without signing up
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up:", user);
            // Additional logic after sign-up
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const handleSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User signed in with Google:", user);
            // Additional logic after signing in with Google
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <img
                    src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
                    alt="logo"
                />
                {isSigningUp ? (
                    <div className="email-password-signup">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {!passwordsMatch && <p>Passwords do not match!</p>}
                        {passwordLengthError && <p>Password must be at least 6 characters!</p>}
                        <button onClick={handleSignUp} className="btn-signup">
                            Sign Up
                        </button>
                    </div>
                ) : (
                    <div className="email-password-signin">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleSignIn} className="btn-login">
                            Login to continue
                        </button>
                    </div>
                )}
                <button onClick={handleSignInWithGoogle} className="btn-login-google">
                    Continue with Google
                </button>
                <button onClick={() => setIsSigningUp(!isSigningUp)} className="btn-signup">
                    {isSigningUp ? "Back to Login" : "Sign Up"}
                </button>
            </div>
        </div>
    );
}

export default Login;
