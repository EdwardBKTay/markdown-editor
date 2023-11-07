import { ChangeEvent, useRef, useState } from 'react';
import MarkdownEditor from './components/Markdown-Editor/Markdown';
import Preview from './components/Preview/Preview';
import Header from './components/Header/Header';
import './App.css';

export default function App() {
	const [markdown, setMarkdown] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(event.target.value);
	};

	const handleClick = (symbol: string, repeat: number) => {
		if (!textareaRef.current) {
			return;
		}

		const { current: textarea } = textareaRef;
		const { selectionStart: startPos, selectionEnd: endPos } = textarea;

		if (startPos === endPos) {
			const newText =
				markdown.substring(0, startPos) +
				symbol.repeat(repeat) +
				markdown.substring(endPos);

			setMarkdown(newText);
		} else {
			const selectedText = markdown.substring(startPos, endPos);
			const wrappedText = `${symbol}${selectedText}${symbol}`;

			const newText =
				markdown.substring(0, startPos) +
				wrappedText +
				markdown.substring(endPos);

			setMarkdown(newText);
		}
		textarea.focus();
	};

	return (
		<div className="app">
			<Header handleClick={handleClick} />
			<div className="container">
				<MarkdownEditor
					handleChange={handleChange}
					markdown={markdown}
					textareaRef={textareaRef}
				/>
				<Preview markdown={markdown} />
			</div>
		</div>
	);
}
