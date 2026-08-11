import { SVGProps } from "react";

export function PortalShape(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 27 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.5 27C13.473 19.5533 7.43924 13.525 0 13.525C7.45584 13.525 13.5 7.46959 13.5 0C13.5269 7.44667 19.5608 13.475 27 13.475C19.544 13.475 13.5 19.5304 13.5 27Z"
				fill="#2563EB"
			/>
		</svg>
	);
}
