/**
 * @file 示例入口
 * @author caifeng01
 */

import {Table} from 'antd';
import {HashRouter, Routes, Route, Link} from 'react-router-dom';
import Base from './base';
import Validator from './validator';
import Deps from './deps';
import Quick from './quick';
import OneOf from './oneOf';
import Navigator from './utils/customerComponents/Navigator';
import CustomCodesandbox from './CustomerCodeSandbox';

const introduction = [
    {
        name: '基本使用',
        path: 'base',
        introduction: '基本使用',
        element: <Base />
    },
    {
        name: '快速渲染',
        path: 'quick',
        introduction: '使用配置式快速生成表单',
        element: <Quick />
    },
    {
        name: '校验',
        path: 'validator',
        introduction: '添加表单校验的方式',
        element: <Validator />
    },
    {
        name: '依赖渲染',
        path: 'deps',
        introduction: '添加依赖渲染',
        element: <Deps />
    },
    {
        name: '分叉渲染',
        path: 'divide',
        introduction: '表单项值决定其他表单项值',
        element: <OneOf />
    }
];

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '介绍',
        dataIndex: 'introduction',
        key: 'introduction'
    },
    {
        title: '链接',
        dataIndex: 'path',
        key: 'path',
        render: (url: string) => <Link to={`/${url}`}>点击查看</Link>
    }
];

const Introduction = () => (
    <Table rowKey="path" dataSource={introduction} columns={columns} pagination={false} />
);

const RouteList = [{path: '/', element: <Introduction />}].concat(
    introduction
);

export default () => (
    <>
        <h1>demos</h1>
        <HashRouter>
            <Routes>
                {RouteList.map(({path, element}) => (
                    <Route
                        key={path}
                        path={path}
                        element={path === '/' ? element : <Navigator>{element}</Navigator>}
                    />
                ))}
            </Routes>
        </HashRouter>
        <CustomCodesandbox />
    </>
);
