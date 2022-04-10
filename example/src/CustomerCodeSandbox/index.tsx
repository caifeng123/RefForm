import {Sandpack} from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';
import styled from 'styled-components';
import {App, CustomComponent, options, utils} from './constants';

const Wrapper = styled.div`
    .custom-wrapper,
    .custom-layout,
    .custom-stack {
        height: 90vh !important;
    }
`;

const CodesandBox = () => (
    <Wrapper>
        <h1>playground</h1>
        <h4>初次加载有点慢 请耐心等待</h4>
        <Sandpack
            template="react-ts"
            files={{
                '/App.tsx': App,
                '/constants.ts': options,
                '/CustomComponent.tsx': CustomComponent,
                '/utils.ts': utils
            }}
            customSetup={{
                dependencies: {
                    antd: '4.19.5',
                    'react-ref-form': '2.0.4'
                }
            }}
            options={{
                classes: {
                    'sp-wrapper': 'custom-wrapper',
                    'sp-layout': 'custom-layout',
                    'sp-stack': 'custom-stack',
                    'sp-preview-container': 'custom-preview-container'
                }
            }}
        />
    </Wrapper>
);

export default CodesandBox;
