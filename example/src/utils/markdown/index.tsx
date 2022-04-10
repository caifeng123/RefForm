import {marked} from 'marked';
import {languages, highlight} from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

marked.setOptions({
    highlight: (code = '', lang = '') =>
        languages[lang] ? highlight(code, languages[lang], 'tsx') : code
});

const getCode = (code: string, language: string) =>
    '\n```' + language + code + '\n```';

export const getSummary = ({
    summary = '点击查看详情',
    detail = '',
    language = 'js'
}) => `
<details><summary>${summary}</summary>
  ${getCode(detail, language)}
</details>
`;

export const Marked = ({markdown}: { markdown: string }) => (
    <div
        style={{
            padding: '10px 30px',
            border: '1px solid red',
            margin: '10px'
        }}
        dangerouslySetInnerHTML={{
            __html: marked(markdown)
        }}
    />
);
