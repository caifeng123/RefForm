/**
 * @file refItem 类型
 * @author caifeng(caifeng01@baidu.com)
 */

import {ReactElement, ReactNode} from 'react';
import {Subject} from 'rxjs';

// 自定义组件props的ts
export interface CustomComponent {
    [key: string]: any;
    onChange?: (
        func: ((val: any) => any) | any,
        key?: string,
        options?: {prevValidate?: (e?: string) => boolean, atTop?: boolean}
    ) => void;
    setFormValue?: (e: any | ((val: any) => any), key: string) => void;
    validate?: (func: (val: any) => string | undefined, key?: string) => void;
    getError?: (key?: string, getTop?: boolean) => any;
    getValue?: (key?: string, getTop?: boolean) => any;
    keyName?: string;
    subject?: Subject<string>;
    value?: any;
    error?: string | undefined;
}

// options的ts
export interface OptionProps {
    [key: string]: any;
    label: string | ReactNode | (() => ReactNode);
    key: string;
    value?: (props: CustomComponent) => ReactElement;
    component?: any;
    deps?: string[] | DEPS;
    required?: boolean;
    rules?: Array<Record<string, any>>;
}

interface ItemBase {
    options: OptionProps[];
    // label后是否要跟冒号
    withColon?: boolean;
    // 一行几列
    colCount?: number;
    // label的宽度份数
    labelColSpan?: number;
    // 位置居左'中'右
    position?: 'start' | 'center' | 'end';
    // 内容表现形式 inline - 元素本身大小 block - 撑满剩余大小
    contentDisplay?: 'inline' | 'block';
    customItemClassName?: string;
}

export type ShouldValid = (e: string) => boolean;

export interface FormProps {
    [key: string]: any;
    data: Record<string, any>;
    error: Record<string, any>;
    validateFields: (
        func: (error: null | string[], value: Record<string, any>) => void,
        shouldValid?: ShouldValid
    ) => void;
    setFormValue: (newData: Record<string, any> | ((e: Record<string, any>) => Record<string, any>)) => void;
    validators: Record<string, Record<string, (value: any, shouldValid?: boolean) => null | string>>;
};

export interface RefItemProps extends ItemBase {
    form: FormProps;
};

export enum DEPS {
    ALL
}

export interface RuleType {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
};

export interface ComponentWrapperProps {
    subject: Subject<string>;
    form: FormProps;
    Component: (props: CustomComponent) => ReactElement;
    keyName: string;
    deps?: string[] | DEPS;
    rules?: RuleType[];
}
