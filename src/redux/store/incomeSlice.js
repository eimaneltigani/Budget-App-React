import { createSlice } from "@reduxjs/toolkit";
import { defaultIncome } from "../../constants/sample";

export const incomeSlice = createSlice({
    name: 'income',
    initialState: {
        income: defaultIncome
    },
    reducers: {
        receiveIncome: (state, action) => {
            return {...state, income: action.payload};
        },
        updateIncome: (state, action) => {
            return {...state, income: action.payload};
        }
    }
})

export const { receiveIncome, updateIncome, resetIncome } = incomeSlice.actions;

export const selectIncome = (state) => state.income.income;

export default incomeSlice.reducer;