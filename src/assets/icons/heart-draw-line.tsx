import { SVGProps } from "react";

export function HeartDrawLine(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="16"
			height="22"
			viewBox="0 0 16 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M14.4617 7.161C16.3093 10.6967 12.8521 14.4084 11.3258 15.8761C9.79949 17.3439 5.28872 19.9248 5.28872 19.9248C5.21154 19.6388 2.63335 14.8872 1.82577 12.376C0.816286 9.23687 0.571437 0.83704 4.27857 1.73201C7.24427 2.44798 7.9409 7.92619 7.82577 10.376C9.48373 8.25896 12.9837 4.33244 14.4617 7.161Z"
				stroke="white"
				strokeWidth="1.5"
			/>
		</svg>
	);
}
