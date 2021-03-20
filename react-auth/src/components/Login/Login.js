import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    // google sign in handle
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                const { displayName, email } = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                };
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // log in using email and password
    const [newUser, setNewUser] = useState(true);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        successful: false,
    });

    const handleBlur = (event) => {
        let isFieldValid = true;
        console.log(event.target.name, event.target.value);
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (
            event.target.name === 'password' ||
            event.target.name === 'confirmPassword'
        ) {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    };

    const handleSubmit = (event) => {
        console.log(user);
        if (newUser && user.email && (user.password === user.confirmPassword)) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUser = { ...response.user };
                    newUser.error = '';
                    newUser.successful = true;
                    setUser(newUser);
                    updateUserName(user.name);
                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.successful = false;
                    setUser(newUser);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    console.log(response.user);
                    const newUser = { ...response.user };
                    newUser.error = '';
                    newUser.successful = true;
                    setUser(newUser);
                    updateUserName(user.name);
                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.successful = false;
                    setUser(newUser);
                });
        }
        event.preventDefault();
    };

    const updateUserName = (name) => {
        console.log(name);
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        })
            .then(function () {
                console.log('username updated successfully.');
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    
    return (
    <div className="row justify-content-center">
        <div className="col-lg-5">
            <div className='login-text text-center'>
                <h3>{newUser ? 'Create an account' : 'Login'}</h3>
                <p className='text-danger'>{user.error}</p>
                <form onSubmit={handleSubmit}>
                    {newUser && (
                        <input
                            type='text'
                            name='name'
                            onBlur={handleBlur}
                            placeholder='Name'
                            required
                        />
                    )}
                    <br />
                    <input
                        type='email'
                        name='email'
                        onBlur={handleBlur}
                        placeholder='Username or Email'
                        required
                    />
                    <br />
                    <input
                        type='password'
                        name='password'
                        onBlur={handleBlur}
                        placeholder='Password'
                        required
                    />
                    <br />
                    {newUser && (
                        <input
                            type='password'
                            name='confirmPassword'
                            onBlur={handleBlur}
                            placeholder='Confirm Password'
                            required
                        />
                    )}
                    <br />
                    {!newUser && (
                        <div className='form-group form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id='exampleCheck1'
                            />
                            <label className='form-check-label' for='exampleCheck1'>
                                Remember Me
                            </label>
                        </div>
                    )}
                    <br />
                    <input
                        type='submit'
                        className='login-btn'
                        value={newUser ? 'Create an account' : 'Login'}
                    />
                </form>
                <p className='account-text'>
                    {newUser
                        ? 'Already have an account?'
                        : "Don't have an account?"}{' '}
                    <span
                        className='text-danger'
                        onClick={() => setNewUser(!newUser)}
                    >
                        {newUser ? 'Login' : 'Create an account'}
                    </span>{' '}
                </p>

                {user.successful && (
                    <p className='text-success'>
                        Account {newUser ? 'created' : 'logged in'} successfully.
                    </p>
                )}
                <hr />
                <button className='sing-in-btn' onClick={handleGoogleSignIn}><FontAwesomeIcon className='login-icon' icon={ faGoogle} />Continue with Google</button>
            </div>
        </div>
    </div>
    );
};

export default Login;
