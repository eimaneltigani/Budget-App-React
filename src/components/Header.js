import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { logout, selectUser } from '../redux/store/userSlice'
import { FaSignOutAlt } from 'react-icons/fa';

import { withFirebase } from './Firebase';



const Text = tw.span`hidden lg:inline-block mr-2 italic text-white`;
const Button = styled.button`
    ${tw`rounded py-2 px-4 bg-teal-400 no-underline text-blue-900 border-2 border-transparent hover:bg-teal-200`}
`;

const NavigationNonAuth = () => {
    return (
        <div className="sign-up">
            <Text>Sign in to save</Text>
            <Link to="/Login">
                <Button css={tw`inline-block`}>
                    Sign up
                </Button>
            </Link>
        </div>
    ) 
}

const NavigationAuth = ({ firebase }) => {
    const dispatch = useDispatch();

    // const logoutOfApp = (e, firebase) => {
    //     dispatch(logout());
    //     firebase.signOut;
    // }

    return (        
        <div className="sign-out">
            <Link to="/LandingPage">
                <Button className="header-button" onClick={firebase.signOut} css={tw`inline-block`}>
                    <FaSignOutAlt />
                    <Text>Logout</Text>
                </Button>
            </Link>
        </div>
    )
}

const Header = ({ firebase }) => {
    
    const user = useSelector(selectUser);

    return (
        <header css={tw`mb-4 lg:mb-8 flex items-center justify-between`}>
            <div>
                <p css={tw`text-white text-2xl font-bold`}>Budgeter<span css={tw`text-teal-300`}>App</span></p>
            </div>
            {!user ? (
                <NavigationNonAuth />
            ) : (
                <NavigationAuth firebase={firebase} />
            )}
        </header>
    )
}


export default withFirebase(Header);