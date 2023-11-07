import React from 'react';
import './Header.css';

const Button: React.FC<{ label: string; onClick: () => void }> = ({
	label,
	onClick,
}) => <button onClick={onClick}>{label}</button>;

interface HeaderProps {
	handleClick: (value: string, repeat: number) => void;
}

const Header: React.FC<HeaderProps> = ({ handleClick }) => {
	const buttons = [
		{ label: 'B', value: '**', repeat: 2 },
		{ label: 'I', value: '_', repeat: 2 },
		{ label: 'Link', value: '()[url]', repeat: 1 },
		{ label: 'Ordered List', value: '1. ', repeat: 1 },
		{ label: 'Unordered List', value: '- ', repeat: 1 },
		{ label: 'Heading', value: '## ', repeat: 1 },
		{ label: 'Quote', value: '> ', repeat: 1 },
		{ label: 'Code', value: '`', repeat: 2 },
		{ label: 'Block Code', value: '```', repeat: 2 },
		{ label: 'Images Link', value: 'hello', repeat: 2 },
	];

	return (
		<div className="header">
			{buttons.map((button, index) => (
				<Button
					key={index}
					label={button.label}
					onClick={() => handleClick(button.value, button.repeat)}
				/>
			))}
		</div>
	);
};

export default Header;
