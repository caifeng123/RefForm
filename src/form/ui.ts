/**
 * @file 表单/类表单项 ui
 * @author caifeng(caifeng01@baidu.com)
 */

import styled from 'styled-components';

export const FormItemWrapper = styled.div<{contentDisplay: string, position: string}>`
    display: flex;
    flex-wrap: nowrap;
    justify-content: ${({position}) => position};
    .form-item-content {
        flex: ${({contentDisplay}) => +(contentDisplay === 'block') };
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

export const LabelWrapper = styled.label<{labelColSpan: number, colon: boolean, required: boolean}>`
    flex: 0 0 ${({labelColSpan}) => `${100 / 24 * labelColSpan}%`};
    padding-left: calc(4px + 0.5em);
    vertical-align: middle;
    line-height: 39.9999px;
    display: inline-block;
    overflow: hidden;
    color: #000;
    box-sizing: border-box;
    ${({required}) => required ? `
        &::before {
            content: "*";
            position: absolute;
            left: 0;
            font-size: 12px;
            color: #ea2e2e;
        }
    ` : ''}
    ${({colon}) => colon ? `
        &::after {
            content: ":";
            margin: 0 8px 0 2px;
        }
    ` : ''}
`;
 