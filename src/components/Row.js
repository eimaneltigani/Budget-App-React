import React, { Component } from 'react';
import tw from 'twin.macro';
import 'styled-components/macro';


class Row extends Component {

    toPercentage = (number) => {
        return number.toLocaleString('en', {
          style: 'percent'
        });
    };

    render() {
        const { category, cost, income, color } = this.props;
        return (
            <div css={tw`flex items-center flex-wrap w-full py-2 border-b border-teal-400 text-left`}>
                <span css={tw`w-1/4 px-2 flex items-center`}>
                <span
                    css={tw`flex-none rounded-full w-3 h-3 mr-2`}
                    style={{ backgroundColor: color }}
                    ></span>
                    {category}
                </span>
                <span css={tw`w-1/4 px-2 text-right font-bold`}>
                    {this.toPercentage(cost/income)}
                </span>
                <span css={tw`w-6/12 px-2 text-right truncate`}>
                <span css={tw`font-bold`}>${cost.toLocaleString()}</span>
                    /mo
                </span>
            </div>
        );
    }
}

export default Row;