import { ChangeEvent, useEffect, useRef, useState } from 'react';
import MarkdownEditor from './components/Markdown-Editor/Markdown';
import Preview from './components/Preview/Preview';
import Header from './components/Header/Header';
import './App.css';
import FileSaver from 'file-saver';

export default function App() {
	const [markdown, setMarkdown] = useState(
		localStorage.getItem('markdown') ?? ''
	);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		localStorage.setItem('markdown', markdown);
	}, [markdown]);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdown(event.target.value);
	};

	const saveFile = () => {
		let fileName: string | null;
		fileName = window.prompt('Enter a file name:', 'example.txt');

		if (fileName === null || fileName === '') {
			fileName = 'example.txt';
		}

		const blob = new Blob([markdown], { type: 'text/plain;charset=utf-8' });
		FileSaver.saveAs(blob, fileName);
		setMarkdown('');
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
			<Header handleClick={handleClick} saveFile={saveFile} />
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
