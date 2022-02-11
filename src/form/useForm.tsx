/**
 * @file useForm对外暴露钩子
 * @author caifeng(caifeng01@baidu.com)
 */

import {useEffect, useRef, useState} from 'react';
import {FormProps} from '@/@types';

/**
 * @param initial 初始化data
 * @returns form: FormProps
 */
export const useForm = (initial: Record<string, any> = {}) => {
    const [, set] = useState({});
    const form = useRef<FormProps>({
        data: initial,
        error: {},
        validateFields: () => {},
        setFormValue: () => {}
    });

    useEffect(() => {
        form.current.setFormValue = (
            newData: Record<string, any> | ((e: Record<string, any>) => Record<string, any>)
        ) => {
            form.current.data = typeof newData === 'function' ? newData(form.current.data) : newData;
            set({});
        };
    }, []);

    return form.current;
};
