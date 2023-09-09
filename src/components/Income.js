import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateIncome } from '../redux/store/incomeSlice';
import tw from 'twin.macro';
import styled from 'styled-components/macro';


const Row = tw.div`flex items-center`;
const Label = styled.div`
  ${tw`text-teal-50 uppercase text-xs font-bold`}
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
                                css={tw`w-full h-1 bg-teal-400 rounded-lg appearance-none cursor-pointer`}
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
                                    css={tw`bg-gray-50 p-3 rounded-tl rounded-bl shadow leading-tight`}
                                >
                                    $
                                </div>
                                <input 
                                    css={tw`w-full rounded-l-none rounded-r bg-white shadow  leading-tight appearance-none p-3`}
                                    type="number" 
                                    min="0" 
                                    max="20000" 
                                    className="input"
                                    value={value}
                                    step="100" 
                                    onChange={(e) => handleUpdate(e)}
                                />
                            </div>
                        </div>
                    </Row>
            </div>
        </>
    );
}

export default Income;