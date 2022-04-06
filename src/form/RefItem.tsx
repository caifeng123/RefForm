/**
 * @file 表单/类表单项 排版
 * @author caifeng(caifeng01@baidu.com)
 */

import _ from 'lodash';
import {FC, useEffect, useRef, useState, Fragment} from 'react';
import {Subject} from 'rxjs';
import {CustomComponent, RefItemProps, ShouldValid} from '@/@types';
import {ComponentWrapper, PlainText} from './RefItemUtils';
import {DepRenderWrapper, FormItemWrapper, LabelWrapper} from './ui';

const FormItem = ({position, label, labelColSpan, colon = true, contentDisplay, className, children, required}) => (
    <FormItemWrapper contentDisplay={contentDisplay} position={position} className={`rf-row ${className ?? ''}`}>
        <LabelWrapper labelColSpan={labelColSpan} colon={colon} required={required}>{label}</LabelWrapper>
        <div className='form-item-content'>{children}</div>
    </FormItemWrapper>
);

// 基本错误显示框架
const ErrorWrapper = ({
    value, error, onChange, component: Comp = PlainText, validate, validateFunc, filter = e => e, getValue, ...rest
}: CustomComponent) => {
    const other = _.omit(rest, ['setFormValue', 'getError', 'getValue', 'keyName']);
    const customChange = e => onChange(filter(e));

    useEffect(() => validateFunc && validate(validateFunc), []);

    return (
        <>
            <Comp value={value} onChange={customChange} {...other} />
            <div style={{color: 'red'}}>{error}</div>
        </>
    );
};

const DivideRender = ({oneOf, controlKey, ...rest}) => {
    const {form, subject} = rest;
    const [, forceUpdate] = useState({});

    useEffect(() => {
        subject.subscribe(key => {
            if (key === controlKey) {
                forceUpdate({});
            }
        });
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return <DepRender options={oneOf[_.get(form.data, controlKey)]} {...rest} />;
};

const DepRender = props => {
    const {options = [], ...renderProps} = props;
    const {subject, form, ...styleObj} = renderProps;

    return (
        <>
            {_.map(options, ({value = ErrorWrapper, className = '', key, label, oneOf, ...rest}) => (
                <Fragment key={key}>
                    <FormItem
                        {...styleObj}
                        className={className}
                        label={label}
                        required={rest.required}
                    >
                        <ComponentWrapper
                            {...rest}
                            keyName={key}
                            subject={subject}
                            form={form}
                            Component={value}
                        />
                    </FormItem>
                    {oneOf && <DivideRender oneOf={oneOf} controlKey={key} {...renderProps} /> }
                </Fragment>
            ))}
        </>
    );
};

/**
 * 目的为了提高渲染性能+执行效率
 * 使用ref实现form表单,自定义校验
 */
export const RefItem: FC<RefItemProps> = ({
    options,
    form,
    labelColSpan = 3,
    withColon = true,
    colCount = 2,
    position = 'start',
    contentDisplay = 'block',
}) => {

    // 注册多播事件，其他检查是否是个人监听组件
    const subject = useRef(new Subject<string>());

    useEffect(() => {
        // 子组件useEffect先执行完 最后执行item的useEffect
        // 因此在这注册全局校验函数 - 提交时调用
        form.validateFields = (func, shouldValid: ShouldValid = () => true) => {
            const allValidators = _.reduce(form.validators, (all, value) => ({...all, ...value}), {});
            const errors = _.map(
                allValidators,
                (validator: any, key) => validator?.(_.get(form.data, key), shouldValid(key))
            ).filter(Boolean);

            func(errors.length ? errors : null, form.data);
        };
    }, []);

    const renderProps = {labelColSpan, withColon, position, contentDisplay, subject: subject.current, form};

    return (
        <DepRenderWrapper colCount={colCount}>
            <DepRender options={options} {...renderProps} />
        </DepRenderWrapper>
    );
};
