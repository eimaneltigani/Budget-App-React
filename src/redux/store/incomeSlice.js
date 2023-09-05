import { createSlice } from "@reduxjs/toolkit";
import { defaultIncome } from "../../components/constants";

export const incomeSlice = createSlice({
    name: 'income',
    initialState: {
        income: defaultIncome
    },
    reducers: {
        recieveIncome: (state, action) => {
            return {...state, income: action.payload};
        },
        updateIncome: (state, action) => {
            return {...state, income: action.payload};
        },
        resetIncome: (state) => {
            return {...state, income: defaultIncome};
        }
    }
})

export const { recieveIncome, updateIncome, resetIncome } = incomeSlice.actions;

export const selectIncome = (state) => state.income.income;

export default incomeSlice.reducer;