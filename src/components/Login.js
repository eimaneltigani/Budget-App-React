import React from 'react';
import { connect } from 'react-redux';
import { redirect } from "react-router-dom";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { login } from '../redux/store/userSlice';
import {withFirebase} from './Firebase';

class Login extends React.Component {
    componentDidUpdate() {
        const { state } = this.props;
        const { expenses, income, statistics, setLogin} = state;

        localStorage.setItem(
            'budgetAppState',
            JSON.stringify({
                expenses,
                income,
                statistics
            })
        )
    }

    uiConfig = {
        // signInFlow: "popup",
        signInOptions: [
            this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
            provider: this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
            },
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                const user = result.user;
                const newUser = result.additionalUserInfo.isNewUser;

                newUser &&
                    this.props.firebase.user(user.uid).set({
                        ...JSON.parse(localStorage.getItem('budgetAppState')),
                        lastSaved: this.props.firebase.timeStamp()
                    });

                this.setLogin(user);

                redirect("/");
            }
        }
    }

    componentDidMount() {
        const ui = new firebaseui.auth.AuthUI(this.props.firebase.auth);
        ui.start('#firebaseui-auth-container', this.uiConfig)
    }

    render() {
        return(
            <div id="firebaseui-auth-container"></div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setLogin: obj => dispatch(login(obj))
  });

const mapStateToProps = (state) => {
    return {state}
}

export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Login));