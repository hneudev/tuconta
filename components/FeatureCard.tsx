"use client";

interface FeatureCardProps {
	title: string;
	iconSrc: string;
}

export default function FeatureCard({ title, iconSrc }: FeatureCardProps) {
	return (
		<div
			className='bg-white p-6 rounded-lg drop-shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100'
			role='button'
			tabIndex={0}
			aria-label={title}>
			<div className='flex flex-col items-center text-center space-y-4'>
				<div className='text-primary w-24 h-auto flex items-center justify-center'>
					<img
						src={iconSrc}
						alt={title}
						className='w-full h-full'
						width={24}
						height={24}
					/>
				</div>
				<h3 className='text-sm font-semibold text-gray-800 leading-tight w-3/4'>{title}</h3>
			</div>
		</div>
	);
}
