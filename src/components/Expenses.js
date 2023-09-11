import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import 'styled-components/macro';

import { addExpense, editExpense, deleteExpense, selectExpenses } from '../redux/store/expensesSlice';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenseAmountPerCategory, addExpenseAmountPerCategory } from "../redux/store/statisticsSlice";
import { selectIncome } from '../redux/store/incomeSlice';
import { withFirebase } from './Firebase';

const Row = tw.div`flex items-center`;

const Label = styled.div`
  ${tw`text-teal-default uppercase text-xs font-bold`}
`;


export const calculateTotalExpenses = (expenses) => {
    return expenses.reduce(
        (prevValue, currentValue) => prevValue + currentValue.cost, 0)
    ;    
}

const getExpensesByCategory = (expenses) => {
    return Object.values(expenses.reduce((r, {category, cost}) =>
        (r[category] = {category, totalCost: (r[category]?.totalCost || 0)+ + cost}, r),
    {}))
}

function Expenses() {
    const expenses = useSelector(selectExpenses);
    const income = useSelector(selectIncome);
    const dispatch = useDispatch();

    const handleAdd = () => {
        const key = expenses.length;
        dispatch(addExpense({key:key}));
    }

    const handleEdit = (key, e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        dispatch(editExpense( key, {
            [e.target.name]: e.target.value
        }));
    };

    const handleValueEdit = (key, e) => {
        dispatch(editExpense(key, {
            cost: parseInt(e.target.value)
        }))
    }

    const handleDelete = (key) => {
        dispatch(deleteExpense(key));
    };

    var income2 = income[0].income;
    var remainingExpense;
    

    //update expenses by category after user update
    useEffect(() => {
        remainingExpense = income2-calculateTotalExpenses(expenses);
        dispatch(setExpenseAmountPerCategory(getExpensesByCategory(expenses)));
        dispatch(addExpenseAmountPerCategory({'category': 'Remaining', 'totalCost': remainingExpense}));
    }, [dispatch, expenses]);


    return (
        <>
            <h3 css={tw`text-white text-2xl font-normal mb-4`}> Monthly Expenses </h3>
            <Row css={tw`-mx-2 mb-2`}>
                <Label css={tw`w-4/12 px-2`}>Description</Label>
                <Label css={tw`w-3/12 px-2`}>Category</Label>
                <Label css={tw`w-4/12 px-2 text-right mr-auto`}>Cost</Label>
            </Row>
            {console.log(income2)}
            {console.log(expenses)}
            {expenses.map((expense) => {
                return (
                    <Row css={tw`-mx-2 mb-4`} key={expense.key}>
                        <div css={tw`w-4/12 px-2`}>
                            <input
                                css={tw`block appearance-none w-full bg-white shadow rounded leading-tight p-3`}
                                type="text"
                                name="description" 
                                value={expense.description} 
                                onChange={e => handleEdit(expense.key, e)}>
                            </input>
                        </div>
                        <div css={tw`w-3/12 px-2`}>
                                <select 
                                    css={tw`block appearance-none w-full bg-white shadow p-3 rounded leading-tight`}
                                    name="category" 
                                    value={expense.category} 
                                    onChange={e => handleEdit(expense.key, e)}
                                >
                                    <option name="wants">Wants</option>
                                    <option name="needs">Needs</option>
                                    <option name="savings">Savings</option>  
                                </select>
                        </div>
                        <div css={tw`w-4/12 px-2`}>
                            <div css={tw`flex items-center`}>
                                <div
                                    css={tw`bg-grey-light p-3 rounded-tl rounded-bl shadow leading-tight`}
                                >
                                    $
                                </div>
                                <input 
                                    css={tw`w-full bg-grey-light rounded-l-none rounded-r shadow leading-tight appearance-none p-3`}
                                    type="number" className="cost" name="cost" value={expense.cost} onChange={e => handleValueEdit(expense.key, e)} >
                                </input>
                            </div>
                        </div>
                        <div css={tw`w-1/12 px-1`}>
                            <button css={tw`bg-transparent shadow-none`} onClick={() => handleDelete(expense.key)}>
                                <FaRegTrashAlt css={tw`text-teal-default w-4 h-4 hover:text-teal-light shadow-none bg-transparent`}/>
                            </button>
                        </div> 
                    </Row>
                )
            })}
            <button css={tw`rounded py-2 px-4 text-teal-default border-2 border-teal-light bg-transparent flex items-center hover:border-teal-light hover:text-teal-light font-bold hover:bg-transparent`} onClick={() => handleAdd()}>
                <FaPlus css={tw`fill-teal-default w-3 h-3 mr-1 shadow-none`}/>
                Add expense
            </button>
        </>
    )
}



export default withFirebase(Expenses);