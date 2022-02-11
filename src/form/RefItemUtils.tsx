/**
 * @file 表单/类表单项 排版工具函数
 * @author caifeng(caifeng01@baidu.com)
 */

import _ from 'lodash';
import {useRef, useState, useEffect, FC} from 'react';
import {ComponentWrapperProps, DEPS} from '@/@types';
import useDeepEffect from './useDeepEffect';

// 注册options中的rules
const validator = (rules = []) =>
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
    keyName,
    rules = [],
    validators,
    ...rest
}) => {
    const [, setstate] = useState({});
    const customValidate = useRef<Record<string, ((value: string) => void) | null>>({});
    const value = keyName ? _.get(form.data, keyName) : form.data;

    // 实时页面更新并返回错误
    const refreash = (func: (val: string) => string | undefined, str: string) => val => {
        const error = func(val);
        _.set(form.error = form.error ?? {}, str, error);
        setstate({});
        return error;
    };

    // 注册自定义校验
    const validate = (key: string, func: (val: string) => string | undefined) => {
        const str = `${keyName}${key ? `.${key}` : ''}`;
        customValidate.current[keyName] = null;
        customValidate.current[str] = refreash(func, str);
    };

    // 组件value改变事件，prevValidate作为前置校验判断是否校验
    const onChange = (func: (val: any) => any | any, key?: string, prevValidate = () => true) => {
        const str =  `${keyName}${key ? `.${key}` : ''}`;
        const e = typeof func === 'function' ? func(_.get(form.data, str)) : func;
        _.set(form.data, str, e);
        if (prevValidate()) {
            customValidate.current[str]?.(e);
        }
        // 向多播事件发送修改的keyName
        subject.next(keyName);
        setstate({});
    };

    // 获取组件错误信息
    const getError = (key?: string, getTop = false) => {
        const str =  getTop ? key : `${keyName}${key ? `.${key}` : ''}`;
        return _.get(form.error, str);
    };

    // 获取组件值
    const getValue = (key?: string, getTop = false) => {
        const str =  getTop ? key : `${keyName}${key ? `.${key}` : ''}`;
        return _.get(form.data, str);
    };

    // 向全局注册校验事件，提交表单时调用校验
    useEffect(() => {
        if (_.isEmpty(customValidate.current)) {
            customValidate.current[keyName] = refreash(validator(rules), keyName);
        }
        validators.push(customValidate.current);
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
            validate={validate}
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
