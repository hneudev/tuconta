"use client";

import { useState } from "react";

export default function VideoEmbed() {
	const [playing, setPlaying] = useState(false);
	const videoId = "dQw4w9WgXcQ";

	const thumbnail = "/images/video-preview.png";
	const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;

	return (
		<div className='w-full'>
			<div
				className='relative w-full'
				style={{ paddingBottom: "56.25%" }}>
				{!playing ? (
					<button
						type='button'
						aria-label='Reproducir video'
						onClick={() => setPlaying(true)}
						className='absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden'>
						<img
							src={thumbnail}
							alt='Video de presentación'
							className='w-full h-full object-cover opacity-90'
							width={1280}
							height={720}
						/>

						<span className='absolute z-10 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg'>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden>
								<path
									d='M8 5v14l11-7L8 5z'
									fill='#176BFF'
								/>
							</svg>
						</span>
					</button>
				) : (
					<iframe
						className='absolute top-0 left-0 w-full h-full rounded-lg'
						src={embedUrl}
						title='tuConta - Tu Contador en línea'
						loading='lazy'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					/>
				)}
			</div>
		</div>
	);
}
