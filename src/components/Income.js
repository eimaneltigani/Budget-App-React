import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateIncome } from '../redux/store/incomeSlice';
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { NumericFormat } from 'react-number-format';


const Row = tw.div`flex items-center`;
const Label = styled.div`
  ${tw`text-teal-light uppercase text-xs font-bold`}
`;
const Input = styled.input`
  ${tw`w-full bg-white shadow rounded leading-tight appearance-none p-3`}
`;

const Income = () => {
    const [value, setValue] = useState(5000);
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        setValue(e.target.value);
        dispatch(updateIncome);
    }

    return (
        <>
            <h3 css={tw`text-white text-2xl font-normal mt-8 mb-6`}>Monthly Income</h3>
                <div css={tw`mb-8`}>    
                    <Row css={tw`-mx-1`}>
                        <Label css={tw`px-1 text-right`}>
                            Post-tax income
                        </Label>
                    </Row>
                    <Row css={tw`-mx-2`}>
                        <div css={tw`w-6/12 sm:w-7/12 px-2`}>
                            <input 
                                css={tw`w-full h-1 bg-teal-default rounded-lg appearance-none cursor-pointer`}
                                type="range" 
                                defaultValue={5000} 
                                min="0" 
                                max="20000" 
                                value={value}
                                step="100" 
                                onChange={(e) => handleUpdate(e)}
                            />
                        </div>
                        <div css={tw`w-5/12 sm:w-4/12 px-2 mr-auto`}>
                            <div css={tw`flex items-center`}>
                                <div
                                    css={tw`bg-grey-light p-3 rounded-tl rounded-bl shadow leading-tight`}
                                >
                                    $
                                </div>
                                <NumericFormat 
                                    customInput={Input}
                                    allowNegative={false}
                                    thousandSeparator=","
                                    decimalScale={2}
                                    css={tw`rounded-l-none rounded-r text-right min-w-0`}
                                    maxLength="20"
                                    value={value}
                                    onValueChange={(e) => handleUpdate(e)}
                                />
                            </div>
                        </div>
                    </Row>
            </div>
        </>
    );
}

export default Income;