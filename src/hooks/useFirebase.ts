import { useState } from 'react';
import * as firebase from 'firebase';

export function useFirebase() {
    const [ loggedIn, setLogin ] = useState(false);
    var [ userPhoto, setUserPhoto ] = useState<String>("/assets/images/cat.jpg");
    var [username, setUsername ] = useState<String>("Steve Madden");

    var provider = new firebase.auth.GoogleAuthProvider();

    // get the user info from google
    // populate states with info
    const userLogin = async() => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
            var credential = result.credential as firebase.auth.OAuthCredential;
            var token = credential.accessToken;
            var user = result.user;

            setLogin(true);
            { user?.displayName ? setUsername(user.displayName) : setUsername("error") };
            { user?.photoURL ? setUserPhoto(user.photoURL) : setUserPhoto("error") };
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // logs the user out of the program
    const userLogout = async() => {
        firebase.auth().signOut()
            .then(function() {
                console.log("signed out");
                window.location.reload(true);
                
            })
            .catch(function(error) {
                console.log("error logging out");
                console.log(error);
            });
    }

    return {
        userLogin,
        userLogout,
        loggedIn,
        username,
        userPhoto
    }

}