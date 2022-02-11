/**
 * @file 模板特征值
 * @author caifeng(caifeng01@baidu.com)
 */
import {Table, Input} from 'antd';
import _ from 'lodash';
import {useEffect, useMemo} from 'react';

const Edit = ({value, onChange, keyName, validate, error}) => {
    const change = e => onChange(e.target.value, keyName);
    useEffect(() => {
        validate(keyName, value => {
            if (value < 0 || value > 65535) {
                return '端口号范围为0-65535';
            }
            return;
        });
    }, []);
    return (
        <>
            <Input
                onChange={change}
                value={value}
            />
            {error}
        </>
    );
};


const getColumns = ({onChange, validate, getError}) => [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: text => (
            <div>
                {text}
            </div>
        )
    },
    {
        title: '数据类型',
        dataIndex: '@type',
        key: '@type',
        width: '20%',
        render: text => (
            <div>
                {text}
            </div>
        )
    },
    {
        title: '必填',
        dataIndex: 'required',
        key: 'required',
        width: '20%',
        render: text => (
            <div>
                {_.isBoolean(text) && text ? '是' : '否'}
            </div>
        )
    },
    {
        title: '值',
        dataIndex: 'value',
        key: 'value',
        width: '40%',
        render: (text, record, index) => (
            <Edit
                value={text}
                validate={validate}
                onChange={onChange}
                keyName={`result.${index}.value`}
                error={getError(`result.${index}.value`)}
            />
        )},
];

const FiledsTable = props => {
    const {onChange, value, validate, getError} = props;

    const handleSelectChange = selectedRowKeysValue => {
        onChange(selectedRowKeysValue, 'selectKeys');
    };
    const rowSelection = {
        selectedRowKeys: value?.selectKeys || [],
        onChange: handleSelectChange
    };
    const columns = useMemo(() => getColumns({onChange, validate, getError}), []);

    return (
        <Table
            rowKey='name'
            dataSource={value?.result || []}
            columns={columns}
            rowSelection={rowSelection}
            pagination={false}
        />
    );
};

export default FiledsTable;
