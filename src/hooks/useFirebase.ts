import { useState, useEffect } from 'react';
import * as firebase from 'firebase';

export function useFirebase() {
    const [ loggedIn, setLogin ] = useState(false);
    var [ user, setUser ] = useState(null);
    var [ userPhoto, setUserPhoto ] = useState<String>(".");
    var [username, setUsername ] = useState<String>("Steve Madden");

    var provider = new firebase.auth.GoogleAuthProvider();

    useEffect(() => {
        console.log("logged in: " + loggedIn);
    });

    const userLogin = async() => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
            var credential = result.credential as firebase.auth.OAuthCredential;
            var token = credential.accessToken;
            var user = result.user;

            setLogin(true);
            { user?.displayName ? setUsername(user.displayName) : setUsername("error") }
            { user?.photoURL ? setUserPhoto(user.photoURL) : setUserPhoto("error") }
            console.log(user?.photoURL);
            console.log(userPhoto);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    const userLogout = async() => {
        firebase.auth().signOut()
            .then(function() {
                console.log("signed out");
            })
            .catch(function(error) {
                console.log("error logging out");
            });
    }

    return {
        userLogin,
        loggedIn,
        username,
        userPhoto
    }

}