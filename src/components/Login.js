import React from 'react';
import { connect } from 'react-redux';
import { redirect } from "react-router-dom";
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from 'firebaseui';
import { login } from '../redux/store/userSlice';
import {withFirebase} from './Firebase';
import '../css/Login.css';
import withRouter from './withRouter';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fireErrors: '',
            redirect: false,
            newAccount: true
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = () => {
        this.setState(prevState => ({
            redirect: !prevState.redirect
        }))
    }

    onSignUp = (e) => {
        const { email, password} = this.state;
        const { navigate } = this.props;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email,password)
            .then(authUser =>{
                this.props.setLogin(authUser);
                navigate("/");
            })
            .catch(error => {
                this.setState({fireErrors: error.message})
            })

        e.preventDefault()
    }

    onSignIn = (e) => {
        const { email, password } = this.state;
        const { navigate } = this.props;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then((authUser) => {
                this.props.setLogin(authUser);
                navigate("/");
            })
            .catch(error => {
                this.setState({fireErrors: error.message});
            });

        e.preventDefault();
    }

    render() {
        let errorNotification = this.state.fireErrors ? 
        ( <div className="Error"> {this.state.fireErrors} </div> ) : null;
        return(
            <>
                {errorNotification}
                <div className="mainBlock">
                <form>
                        <input type="text"
                            className="regField"
                            placeholder="Your Name"
                            onChange={this.handleChange}
                            value={this.state.displayName}
                            name="displayName"/>
                        <input type="text"
                            className="regField"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            name="email"/>
                        <input type="password"
                            className="regField"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password"/>
                        {this.state.redirect ? (
                            <React.Fragment>
                                <input type="submit" className="submitBtn" onClick={this.onSignIn} value="ENTER" />
                                <span className="underLine">
                                    Not Registered?  <button className="linkBtn" onClick={this.handleClick}>Create an account</button>
                                </span>    
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <input type="text"
                                    className="regField"
                                    placeholder="Profile picture URL (optional)"
                                    onChange={this.handleChange}
                                    value={this.state.profilePic}
                                    name="profilePic"/>
                                <input onClick={this.onSignUp} type="submit" className="submitBtn" value="REGISTER" />
                                <span className="underLine">
                                    Have an account? <button className="linkBtn" onClick={this.handleClick}>Sign in here</button>
                                </span>
                            </React.Fragment>   
                        )}     
                    </form>  
                </div>
            </>
            
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setLogin: obj => dispatch(login(obj))
  });

const mapStateToProps = (state) => {
    return {state}
}

export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(withRouter(Login)));