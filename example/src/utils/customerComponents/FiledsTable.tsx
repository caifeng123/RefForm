/**
 * 子表格
 */

import {Table, Input} from 'antd';
import _ from 'lodash';
import {CustomComponent} from 'react-ref-form';
import {useEffect} from 'react';

// 处理antd table的卡顿问题
const TdCell = (props: any) => {
    const {onMouseEnter, onMouseLeave, ...restProps} = props;
    return <td {...restProps} />;
};
const DataTable = (props: any) => (
    <Table components={{body: {cell: TdCell}}} {...props} />
);

const Edit = ({
    value,
    onChange,
    keyName,
    validate,
    required,
    error
}: CustomComponent) => {
    const change = (e: any) => onChange?.(e.target.value, keyName, {prevValidate: () => required});
    useEffect(() => {
        validate?.(value => {
            if (!value) {
                return '请输入';
            }
            if (+value < 0 || +value > 65535) {
                return '端口号范围为0-65535';
            }
            return;
        }, keyName);
    }, []);
    return (
        <>
            <Input onChange={change} value={value} />
            <div style={{color: 'red'}}>{error}</div>
        </>
    );
};

const getColumns = ({onChange, validate, getError}: Record<string, any>) => [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
    },
    {
        title: '数据类型',
        dataIndex: '@type',
        key: '@type',
        width: '20%'
    },
    {
        title: '必填',
        dataIndex: 'required',
        key: 'required',
        width: '20%',
        render: (text: string) => <div>{_.isBoolean(text) && text ? '是' : '否'}</div>
    },
    {
        title: '值',
        dataIndex: 'value',
        key: 'value',
        width: '40%',
        render: (text: string, record: any, index: number) => (
            <Edit
                value={text}
                validate={validate}
                onChange={onChange}
                keyName={`${index}.value`}
                required={record.required}
                error={getError(`${index}.value`)}
            />
        )
    }
];

const FiledsTable = ({
    onChange,
    value,
    validate,
    getError
}: CustomComponent) => {
    const selectedRowKeys = (value as any[])?.reduce(
        (all, {name, required}) => (required ? [...all, name] : all),
        []
    );

    const handleSelectChange = (selectedRowKeysValue: string[]) => {
        (value as any[]).forEach(({name}, key) => {
            onChange(selectedRowKeysValue.includes(name), `${key}.required`);
        });
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: handleSelectChange
    };
    const columns = getColumns({onChange, validate, getError});

    return (
        <DataTable
            rowKey="name"
            dataSource={value || []}
            columns={columns}
            rowSelection={rowSelection}
            pagination={false}
        />
    );
};

export default FiledsTable;
