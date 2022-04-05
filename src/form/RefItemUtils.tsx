/**
 * @file 表单/类表单项 排版工具函数
 * @author caifeng(caifeng01@baidu.com)
 */

import _ from 'lodash';
import {useRef, useState, useEffect, FC} from 'react';
import {ComponentWrapperProps, DEPS, RuleType} from '@/@types';
import useDeepEffect from './useDeepEffect';

// 注册options中的rules
const transformRules = (rules: RuleType[] = []) =>
    value => rules.reduce((all, {required = false, message, pattern}) => {
        if (required && !value?.length) {
            all.unshift(message);
            return all;
        }
        if (pattern && !new RegExp(pattern).test(value ?? '')) {
            all.push(message);
            return all;
        }
        return all;
    }, [])[0];

export const ComponentWrapper: FC<ComponentWrapperProps> = ({
    subject,
    deps,
    form,
    Component,
    // 由于key无法透传改名为keyName
    keyName,
    rules = [],
    ...rest
}) => {
    const [, setstate] = useState({});
    const customValidate = useRef<Record<string, ((value: any, shouldValid?: boolean) => null | string) | null>>({});
    const value = keyName ? _.get(form.data, keyName) : form.data;

    /**
     * 实时页面更新并返回错误
     * 1、校验更新错误
     * 2、关闭校验时清空错误
     */
    const registerValidator = (func: (val: any) => string | null, str: string) => (val: any, shouldValid = true) => {
        // 当修改值触发 或 清空不为空的错误时，进行重新渲染
        if (shouldValid || !shouldValid && _.get(form.error, str)) {
            const error = shouldValid ? func(val) : undefined;
            _.set(form.error = form.error ?? {}, str, error);
            setstate({});
            return error;
        }
    };

    // 注册自定义校验
    const customerValidate = (customerFunc: (val: any) => string | null, subKey?: string) => {
        const str = `${keyName}${subKey ? `.${subKey}` : ''}`;
        customValidate.current[keyName] = null;
        customValidate.current[str] = registerValidator(customerFunc, str);
    };

    // 组件value改变事件，prevValidate作为前置校验判断是否校验
    const onChange = (
        func: (val: any) => any | any,
        subKey?: string,
        options?: {prevValidate?: (e?: string) => boolean, atTop?: boolean}
    ) => {
        // 是否运行校验prevValidate先决条件 atTop: 从最上层修改form内属性
        const {prevValidate = () => true, atTop = false} = options ?? {};
        const str =  atTop ? subKey : `${keyName}${subKey ? `.${subKey}` : ''}`;
        const e = typeof func === 'function' ? func(_.get(form.data, str)) : func;
        _.set(form.data, str, e);
        customValidate.current[str]?.(e, prevValidate(e));
        // 向多播事件发送修改的keyName
        subject.next(keyName);
        setstate({});
    };

    // 获取组件错误信息，可从form最外层获取错误
    const getError = (subKey?: string, atTop = false) => {
        const str =  atTop ? subKey : `${keyName}${subKey ? `.${subKey}` : ''}`;
        return _.get(form.error, str);
    };

    // 获取组件值，可从form最外层获取值
    const getValue = (subKey?: string, atTop = false) => {
        const str =  atTop ? subKey : `${keyName}${subKey ? `.${subKey}` : ''}`;
        return _.get(form.data, str);
    };

    // 向全局注册校验事件，提交表单时调用校验
    useEffect(() => {
        if (_.isEmpty(customValidate.current)) {
            customValidate.current[keyName] = registerValidator(transformRules(rules), keyName);
        }
        form.validators[keyName] = customValidate.current;
        return () => form.validators[keyName] = null;
    }, []);

    // 处理options中的依赖项，可依赖多个选项
    useEffect(() => {
        if (deps === DEPS.ALL) {
            subject.subscribe(() => setstate({}));
            return;
        }
        if (deps?.length) {
            subject.subscribe(keyName => {
                if (deps.includes(keyName)) {
                    setstate({});
                }
            });
        }
    }, []);

    // 初始化值重新渲染
    useDeepEffect(() => setstate({}), [value]);

    return (
        <Component
            setFormValue={form.setFormValue}
            onChange={onChange}
            validate={customerValidate}
            getError={getError}
            getValue={getValue}
            keyName={keyName}
            subject={subject}
            value={value}
            error={_.get(form.error, keyName)}
            {...rest}
        />
    );
};

export const PlainText = ({value}) => <span>{value}</span>;
