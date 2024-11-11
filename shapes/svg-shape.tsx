export default function Shape({ img }: { img: string }) {
	return (
		<svg
			id="sw-js-blob-svg"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
		>
			<defs>
				{/* Define the image pattern */}
				<pattern
					id="image-pattern"
					patternUnits="objectBoundingBox"
					width="1"
					height="1"
				>
					<image
						href={img}
						width="100"
						height="100"
						preserveAspectRatio="xMidYMid slice"
					/>
				</pattern>
			</defs>

			{/* Apply the pattern as the fill for the path */}
			<path
				fill="url(#image-pattern)"
				d="M18.7,-26C22.2,-19.3,21.7,-11.5,25,-2.9C28.2,5.7,35.3,15,34.4,23.1C33.6,31.1,24.9,37.8,16.7,37.1C8.4,36.3,0.6,28,-8.6,24.4C-17.9,20.7,-28.5,21.7,-31.4,17.7C-34.2,13.6,-29.3,4.7,-25.6,-2.5C-22,-9.7,-19.6,-15.1,-15.5,-21.6C-11.5,-28.2,-5.7,-35.9,0.9,-37C7.6,-38.1,15.2,-32.6,18.7,-26Z"
				width="100%"
				height="100%"
				transform="translate(50 50)"
				strokeWidth="0"
				style={{ transition: "0.3s" }}
			/>
		</svg>
	);
}
