import {useForm, RefItem} from 'react-ref-form';
import {Input, Select, Checkbox, Radio, Button, notification} from 'antd';
import {Wrapper} from './ui';
import {Marked} from '../utils/markdown';
import {markdown} from './constants';

const designInfo = [
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
        options: [{label: 'a', value: 'a'}, {label: 'b', value: 'b'}, {label: 'c', value: 'c'}],
        component: Select
    },
    {
        label: '换热站设计流量4',
        key: 'stationDesignedG4',
        options: ['a', 'b', 'c', 'd'],
        filter: e => e.target.value,
        component: Radio.Group
    }
];

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

    return (
        <Wrapper>
            <h1>快速生成表单项</h1>
            <h3>适配个人组件库, 此处使用antd举例，使用component字段，filter做为数据变化【input和checkbox处理】</h3>
            <h3>组件需要的其他字段都通过options中配置透传</h3>
            <RefItem colCount={1} labelColSpan={6} options={designInfo} form={form} />
            <Button onClick={submit}>提交</Button>
            <Marked markdown={markdown} />
        </Wrapper>
    );
};
