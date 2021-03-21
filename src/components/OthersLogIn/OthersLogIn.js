import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'
import './OthersLogIn.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../AuthConfig/firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const OthersLogIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isLoggedIn: false,
        result: ""
    });

    // redirect login route
    const history = useHistory();
    const location =useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const {isLoggedIn, result} = user;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    var githubProvider = new firebase.auth.GithubAuthProvider();
    
    const handleSignUp = (provider) => {
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            const token = credential.accessToken;
            const newUser = result.user;
            const authUser = {...loggedInUser};
            authUser.name = newUser.displayName;
            authUser.email = newUser.email;
            setLoggedInUser(authUser);
            
            const updateUser = {...user};
            updateUser.isLoggedIn = true;
            updateUser.result = "Successfully Log In ✔✔";
            setUser(updateUser);
            history.replace(from);

        }).catch((error) => {
            const errorMessage = error.message;
            const updateUser = {...user};
            updateUser.isLoggedIn = false;
            updateUser.result = errorMessage;
            setUser(updateUser);
        });
    }
    return (
        <>
            <h4 className="text-center">--------- Or ----------</h4>
            <div className="other-login">
                {
                    isLoggedIn ? <p className="alert alert-success text-center">{result}</p> 
                    :  <p className="alert-warning text-center">{result}</p>
                }
                <button className="btn btn-danger btn-block" onClick={() => handleSignUp(googleProvider)}> <FontAwesomeIcon icon={faGoogle}/> Continue With Google</button>
                <button className="btn btn-success btn-block" onClick={() => handleSignUp(githubProvider)}> <FontAwesomeIcon icon={faGithub}/> Continue With Github</button>
            </div>
       </> 
    );
};

export default OthersLogIn;