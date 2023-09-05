import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from './store/expensesSlice';
import incomeSlice from './store/incomeSlice';
import statisticsSlice from './store/statisticsSlice';

export const store = configureStore({
    reducer: {
      expenses: expensesSlice,
      income: incomeSlice,
      statistics: statisticsSlice
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare()
});