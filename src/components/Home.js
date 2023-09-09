import React from 'react';
// import { css } from 'emotion'
import tw from 'twin.macro';

import Income from './Income';
import Header from './Header';
import Expenses from './Expenses';
import Report from './Report';

import { connect } from 'react-redux';
import { handleFirebaseData, handleSampleData } from '../constants/helperfunctions';
import { withFirebase } from './Firebase';
import Statistics from './Statistics';


class Home extends React.Component {
    componentDidUpdate(prevProps) {
        const {authUser, firebase, onHandleFirebaseData, onHandleSampleData} = this.props;

        if (authUser !== prevProps.authUser)
            authUser
                ? onHandleFirebaseData(authUser.uid, firebase)
                : onHandleSampleData();
    }

    render() {
        return(
            <div className="container" tw="py-4 lg:py-8 overflow-hidden">
                <Header />
                <main tw="flex flex-wrap -mx-8">
                    <div tw="lg:w-1/2 px-8 mb-8 lg:mb-0">
                        <h2 tw="text-white text-xl font-light max-w-md">
                            Own your money
                        </h2>
                        <p tw="text-white text-xl font-light max-w-md">
                            This virtual budget program helps keep you on track of your spending habits. Categorize your spend into different types and prioritize the financial goals that matter most to you. 
                        </p>
                        <Income />
                        <Expenses />
                    </div>
                    <div tw="lg:w-1/2 px-8 mb-8 lg:mb-0">
                        <div tw="bg-white rounded-lg shadow p-4 lg:p-8 mb-8">
                            <Statistics />
                            <Report />
                        </div>
                        <h3 tw="text-white text-lg font-bold mb-2">What now?</h3>
                        <p tw="text-white mb-8">Sign up to save your data and keep track of your budgeting goals! Save, spend, and give toward what's important in your life.</p>
                    </div>
                </main>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onHandleFirebaseData: (dispatch, uid, firebase) => 
            {dispatch(handleFirebaseData(dispatch, uid, firebase))},
        onHandleSampleData: dispatch(handleSampleData(dispatch))
    }
}

const mapStateToProps = ( state ) => {
    return {authUser: state.user}
}

export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Home));