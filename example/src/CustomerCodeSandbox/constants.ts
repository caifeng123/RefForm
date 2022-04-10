export const options = `// -- options --配置
import {Checkbox, Select, Radio, Input} from 'antd';
import {FiledsTable, CustomInput} from './CustomComponent';

export const designInfo = [
    {
        label: '换热站设计流量1',
        key: 'stationDesignedG1',
        required: true,
        component: Input,
        filter: e => e.target.value
    },
    {
        label: '换热站设计流量2',
        key: 'stationDesignedG2',
        options: [1, 2, 3, 4, 5],
        component: Checkbox.Group
    },
    {
        label: '换热站设计流量3',
        key: 'stationDesignedG3',
        required: true,
        options: [{label: 'a', value: 'a'}, {label: 'b', value: 'b'}, {label: 'c', value: 'c'}],
        component: Select
    },
    {
        label: '换热站设计流量4',
        key: 'stationDesignedG4',
        options: ['a', 'b', 'c', 'd'],
        filter: e => e.target.value,
        component: Radio.Group
    },
    {
        label: '自定义组件1',
        key: 'stationDesignedG5',
        options: ['a', 'b', 'c', 'd'],
        value: CustomInput
    },
    {
        label: '自定义组件2',
        key: 'stationDesignedG6',
        value: FiledsTable
    }
    
];
`;

export const App = `// -- demo start --
import {Button, notification} from 'antd';
import {useEffect} from 'react';
import {useForm, RefItem} from 'react-ref-form';
import {designInfo} from './constants';
import {getData} from './utils';
import 'antd/dist/antd.css';

export default () => {
    const form = useForm();

    const submit = () => {
        form.validateFields((err, value) => {
            if (err) {
                console.log('err:', err);
                notification.error({message: err[0]});
            }
            else {
                console.log('value:', value);
                notification.success({message: '提交成功 看控制台'});
            }
        });
    };

    useEffect(() => {
        getData().then(res => form.setFormValue(res));
    }, []);

    return (
        <>
            <RefItem colCount={1} labelColSpan={6} options={designInfo} form={form} />
            <Button onClick={submit}>提交</Button>
        </>
    );
};

`;

export const CustomComponent = `// 自定义组件 
import {Input, Table} from 'antd';
import _ from 'lodash';
import {useEffect} from 'react';
import {CustomComponent} from 'react-ref-form';

// demo 最基础的自定义组件 通过将value、onChange事件注入即可
// ps: 若只想使用报错显示 可直接option配置 component即可
export const CustomInput = ({value, onChange, error}: CustomComponent) => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Input onChange={e => onChange(e.target.value)} value={value} />
        <div style={{color: 'red'}}>{error}</div>
    </div>
);

// 嵌套表格表单自定义demo
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

const getColumns = ({onChange, validate, getError}) => [
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
                keyName={\`\${index}.value\`}
                required={record.required}
                error={getError(\`\${index}.value\`)}
            />
        )
    }
];

export const FiledsTable = ({
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
            onChange(selectedRowKeysValue.includes(name), \`\${key}.required\`);
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
`;

export const utils = `// mock请求接口
export const getData = () => new Promise(resolve => {
    setTimeout(() => {
        resolve({
            stationDesignedG1: '1weq',
            stationDesignedG6: [
                {
                    name: 'axcvvf',
                    '@type': 'integer',
                    required: false
                },
                {
                    name: 'fields_2',
                    '@type': 'long',
                    required: true
                }
            ]
        });
    }, 1000);
});
`;
