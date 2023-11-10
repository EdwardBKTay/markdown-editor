import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './Preview.css';

interface CodeBlockProps {
	children: string;
	className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
	const match = /language-(\w+)/.exec(className || '');
	return match ? (
		<SyntaxHighlighter language={match[1]} style={stackoverflowDark}>
			{String(children).replace(/\n$/, '')}
		</SyntaxHighlighter>
	) : (
		<pre className="pre">
			<code>{children}</code>
		</pre>
	);
};

interface PreviewProps {
	markdown: string;
}

const Preview: React.FC<PreviewProps> = ({ markdown }) => {
	const components = {
		code: CodeBlock,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any;

	return (
		<div className="preview">
			<ReactMarkdown children={markdown} components={components} />
		</div>
	);
};

export default Preview;
