/**
 * 自定义input框 只是为了显示一个渲染条
 * 实际使用直接options配置 component: Input即可 方便快捷
 */

import {Input} from 'antd';
import {CustomComponent} from 'react-ref-form';
import {Shine} from './ui';

export default ({value, onChange, error}: CustomComponent) => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Shine key={Math.random()} />
        <Input onChange={e => onChange(e.target.value)} value={value} />
        <div style={{color: 'red'}}>{error}</div>
    </div>
);
