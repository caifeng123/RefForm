import styled from 'styled-components';

// 重新渲染提示
export const Shine = styled.div`
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