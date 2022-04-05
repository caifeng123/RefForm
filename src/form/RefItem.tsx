/**
 * @file 表单/类表单项 排版
 * @author caifeng(caifeng01@baidu.com)
 */

import {Row, Col} from 'antd';
import _ from 'lodash';
import {FC, useEffect, useRef} from 'react';
import {Subject} from 'rxjs';
import {CustomComponent, RefItemProps, ShouldValid} from '@/@types';
import {ComponentWrapper, PlainText} from './RefItemUtils';
import {FormItemWrapper, LabelWrapper} from './ui';

const FormItem = ({position, label, labelColSpan, colon, contentDisplay, className, children, required}) => (
    <FormItemWrapper contentDisplay={contentDisplay} position={position} className={className}>
        <LabelWrapper labelColSpan={labelColSpan} colon={colon} required={required}>{label}</LabelWrapper>
        <div className='form-item-content'>{children}</div>
    </FormItemWrapper>
);

// 基本错误显示框架
const ErrorWrapper = ({
    value, error, onChange, component = PlainText, validate, validateFunc, filter = e => e, getValue, ...rest
}: CustomComponent) => {
    const other = _.omit(rest, ['setFormValue', 'getError', 'getValue', 'keyName']);
    const Comp = component;
    const customChange = e => onChange(filter(e));
    useEffect(() => {
        validateFunc && validate(validateFunc);
    }, []);
    return (
        <>
            <Comp value={value} onChange={customChange} {...other} />
            <div style={{color: 'red'}}>{error}</div>
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
    customItemClassName = ''
}) => {
    const width = 24 / colCount | 0;
    const rows = _.chunk(options, colCount);

    // 注册多播事件，其他检查是否是个人监听组件
    const subject = useRef(new Subject<string>());

    useEffect(() => {
        // 子组件useEffect先执行完 最后执行item的useEffect
        // 因此在这注册全局校验函数 - 提交时调用
        form.validateFields = (func, shouldValid: ShouldValid = () => true) => {
            const allValidators = form.validators.reduce((all, temp) => ({...all, ...temp}), {});
            const errors = _.map(
                allValidators,
                (validator, key) => validator?.(_.get(form.data, key), shouldValid(key))
            ).filter(Boolean);

            func(errors.length ? errors : null, form.data);
        };
    }, []);

    return (
        <>
            {_.map(rows, (cols, key) => (
                <Row className="row" key={key} justify="center">
                    {
                        _.map(cols, ({value = ErrorWrapper, keyName, label, ...rest}, index) => (
                            <Col
                                span={width}
                                key={index}
                            >
                                <FormItem
                                    labelColSpan={labelColSpan}
                                    colon={withColon}
                                    contentDisplay={contentDisplay}
                                    position={position}
                                    className={customItemClassName}
                                    label={label}
                                    required={rest.required}
                                >
                                    <ComponentWrapper
                                        {...rest}
                                        keyName={keyName}
                                        subject={subject.current}
                                        form={form}
                                        Component={value}
                                    />
                                </FormItem>
                            </Col>
                        ))
                    }
                </Row>
            ))}
        </>
    );
};
