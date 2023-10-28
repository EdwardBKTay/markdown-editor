import { ChangeEvent, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
`;

const TextArea = styled.textarea`
	width: 50%;
	height: 50%;
	padding: 1rem;
	border-radius: 5px;
	border: none;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
	font-size: 1rem;
	resize: none;
`;

const Preview = styled(ReactMarkdown)`
	width: 50%;
	height: 50%;
	padding: 1rem;
	border-radius: 5px;
	border: none;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
	font-size: 1rem;
	overflow-y: scroll;
	background-color: white;
`;

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
		<Container>
			<div className="header">
				<button onClick={() => handleClick('**', 2)}>B</button>
				<button onClick={() => handleClick('_', 2)}>I</button>
				<button onClick={() => handleClick('()[url]', 1)}>Link</button>
				<button onClick={() => handleClick('1. ', 1)}>Ordered List</button>
				<button onClick={() => handleClick('- ', 1)}>Unordered List</button>
				<button onClick={() => handleClick('## ', 1)}>Heading</button>
				<button onClick={() => handleClick('> ', 1)}>Quote</button>
				<button onClick={() => handleClick('`', 2)}>Code</button>
				<button onClick={() => handleClick('```', 2)}>Block Code</button>
				<button onClick={() => handleClick('hello', 2)}>Images Link</button>
			</div>

			<TextArea onChange={handleChange} value={markdown} ref={textareaRef} />
			<Preview>{markdown}</Preview>
		</Container>
	);
}
