/**
 * @file 表单/类表单项 ui
 * @author caifeng(caifeng01@baidu.com)
 */

import styled from 'styled-components';

interface FormItemWrapperProps {
    contentDisplay: string;
    position: string;
};

interface LabelWrapperProps {
    labelColSpan: number;
    colon: boolean;
    required: boolean;
}

export const FormItemWrapper = styled.div<FormItemWrapperProps>`
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

export const LabelWrapper = styled.label<LabelWrapperProps>`
    flex: 0 0 ${({labelColSpan}) => `${100 / 24 * labelColSpan}%`};
    position: relative;
    padding-left: calc(4px + 0.5em);
    line-height: 30px;
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

export const DepRenderWrapper = styled.div<{colCount: number}>`
    display: grid;
    grid-template-columns: repeat(${({colCount}) => colCount}, 1fr);
`;
