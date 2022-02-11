import {useEffect} from 'react';
import {render} from 'react-dom';
import {Input} from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

// import {FetchSelect, useSetState, useCounter, Item, createRender, SeriesSelect, useRxInterval} from '../../src';
import {RefItem, useForm} from '../../src';
import {DEPS} from '../../src/@types/refItem';
import FiledsTable from './FiledsTable';

const createArr = params =>
    new Array(20).fill('').map((_, index) => ({text: `${index}:${JSON.stringify(params)}`, value: index}));

const mockFetchData = params => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                params.productKey ? createArr(params).filter(a => a.value === +params.productKey) : createArr(params)
            );
        }, 100);
    });
};

const Shine = styled.div`
    width: 100%;
    height: 4px;
    @keyframes emit {
        from {
            background: #4bf14b;
        }
        to {
            background: transparent;
        }
    }
    animation: 1s emit ease;
`;

const Edit = ({value, onChange, error}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Shine key={Math.random()} />
            <Input
                onChange={e => onChange(e.target.value)}
                value={value}
            />
            {error}
        </div>
    );
};


const designInfo = [
    {label: '换热站设计流量1', keyName: 'stationDesignedG', rules: [{pattern: /\w+/g, message: '请输入内容'}], required: true, value: Edit},
    {label: '换热站设计流量2', keyName: 'stationDesignedG1', rules: [{pattern: /\w+/g, message: '请输入内容'}], value: Edit, deps: ['stationDesignedG']},
    {label: '换热站设计流量3', keyName: 'stationDesignedG2', rules: [{pattern: /\w+/g, message: '请输入内容'}], value: Edit, deps: DEPS.ALL},
    {label: '换热站设计流量4', keyName: 'params', value: FiledsTable},
];

let i = 0;
const getPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(i++);
        }, 500);
    });
};

const Template = () => {
    const form = useForm();
    useEffect(() => {
        setTimeout(() => {
            form.setFormValue({
                stationDesignedG1: '1weq',
                params: {
                    selectKeys: ['axcvvf'],
                    result: [{
                        name: 'axcvvf',
                        '@type': 'integer',
                        required: false
                    }, {
                        name: 'fields_2',
                        '@type': 'long',
                        required: true
                    }]
                },
                name: '123'
            });
        }, 2000);
    }, []);


    return (
        <RefItem
            colCount={1}
            options={designInfo}
            form={form}
        />
    );
};

render(<Template />, document.getElementById('root'));
