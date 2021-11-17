import { SearchIcon } from "@assets";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	prefix?: string;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ name, label, prefix, ...rest }, ref) => {
		return (
			<div className="w-full">
				<label htmlFor={name}>{label}</label>
				<div className="flex flex-row items-center">
					{prefix && (
						<span className="text-sm border rounded-l p-4 bg-gray-300 whitespace-no-wrap">
							{prefix}
						</span>
					)}

					<input
						{...rest}
						name={name}
						ref={ref}
						type={rest.type}
						className={`border border-black rounded focus:outline-none p-3 ${
							rest.type === "search" && `border-r-0 rounded-r-none`
						} ${prefix && `border-l-0 rounded-l-none`}`}
					/>

					{rest.type === "search" && (
						<span className="border border-black rounded p-4 border-l-0 rounded-l-none">
							<SearchIcon />
						</span>
					)}
				</div>
			</div>
		);
	}
);
