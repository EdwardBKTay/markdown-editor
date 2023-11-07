import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Preview.css';

interface PreviewProps {
	markdown: string;
}

const Preview: React.FC<PreviewProps> = ({ markdown }) => {
	return <ReactMarkdown className="preview">{markdown}</ReactMarkdown>;
};

export default Preview;
