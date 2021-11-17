import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ text, loading, ...rest }) => {
	return (
		<div className="border border-black border-sm p-2">
			<button {...rest} disabled={loading || rest.disabled}>
				{text}
			</button>
		</div>
	);
};
