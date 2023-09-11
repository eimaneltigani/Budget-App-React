import React from "react";
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { selectIncome } from "../redux/store/incomeSlice";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/store/statisticsSlice";
import { theme } from "../tailwind";
import Row from "./Row";


const Label = styled.div`
  ${tw`text-teal-default uppercase text-xs font-bold`}
`;


const Report = () => {
    const amountbycategory = useSelector(selectCategories);
    const income = useSelector(selectIncome);
    var income2 = income[0].income;

    return (
        <div >
            <div css={tw`flex items-center flex-wrap w-full pt-10 pb-2 border-b border-teal-default text-left`}>
                <Label css={tw`w-1/4 indent-4 px-2 pt-5`}>Category</Label>
                <Label css={tw`w-1/4 px-2 pt-5 text-right`}>
                    % of Total
                </Label>
                <Label css={tw`w-6/12 px-2 pt-5 text-right mr-auto`}>Total Amount</Label>
            </div>
            {amountbycategory.map((category,index) => {
                return(
                    <Row key={index}
                        category={category.category}
                        cost={category.totalCost}
                        income={income2}
                        color={Object.values(theme.colors.teal)[index]}
                    />
                )
            })}
            
        </div>
    )
}


export default Report;