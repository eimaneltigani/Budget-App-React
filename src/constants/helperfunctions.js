import { defaultExpenses } from "./sample";
import { defaultIncome } from "./sample";

import { receiveExpenses } from '../redux/store/expensesSlice';
import { receiveIncome } from '../redux/store/incomeSlice';


export const handleFirebaseData = (uid, firebase) => {
    return dispatch => {
      return firebase.user(uid).once('value', snapshot => {
        const { income, expenses} = snapshot.val();
  
        dispatch(
          receiveIncome(income)
        );
        dispatch(
          receiveExpenses(expenses)
        );
      });
    };
};

export const handleSampleData = () => {
    return dispatch => {
        dispatch(
            receiveIncome(defaultIncome)
        );
        dispatch(
            receiveExpenses(defaultExpenses)
        );
    }
};