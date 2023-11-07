import React from 'react';
import './Markdown.css';

interface MarkdownEditorProps {
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	markdown: string;
	textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
	handleChange,
	markdown,
	textareaRef,
}) => {
	return (
		<textarea
			className="markdown-editor"
			onChange={handleChange}
			value={markdown}
			ref={textareaRef}
		></textarea>
	);
};

export default MarkdownEditor;
