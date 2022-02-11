/**
 * @file refItem 类型
 * @author caifeng01
 */

import {ReactElement} from 'react';
import {Subject} from 'rxjs';

export interface CustomComponent {
    [key: string]: any;
    onChange: (func: (val: any) => any | any, key: string, prevValidate?: () => boolean) => void;
    setFormValue: (e: any | ((val: any) => any), key: string) => void;
    validate: (key: string, func: (val: string) => string | undefined) => void;
    getError: (key: string, getTop?: boolean) => any;
    getValue: (key: string, getTop?: boolean) => any;
    keyName: string;
    subject: Subject<string>;
    value: any;
    error: string | undefined;
}

export interface ComponentWrapperProps {
    subject: Subject<string>;
    validators: Array<{[key: string]: ((value: string) => void)}>;
    form: FormProps;
    Component: (props: CustomComponent) => ReactElement;
    keyName: string;
    deps?: string[] | DEPS;
    rules?: Array<Record<string, any>>;
}

interface OptionProps {
    label: string;
    keyName: string;
    value: (props: CustomComponent) => ReactElement;
    deps?: string[] | DEPS;
    required?: boolean;
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
};

export interface RefItemProps extends ItemBase {
    form: FormProps;
};

export enum DEPS {
    ALL
}