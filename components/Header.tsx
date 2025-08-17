"use client";

import { CloseOutlined } from "@ant-design/icons";

export default function Header() {
	return (
		<header className='bg-white shadow-sm border-b'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex justify-between items-center'>
					{/* Logo Placeholder */}
					<div className='flex items-center justify-center flex-1'>
						<div className='w-auto h-auto flex items-center justify-center'>
							<img
								src='/images/tuconta-logo-1.png'
								alt='tuConta logo'
								className='h-32 object-contain'
							/>
						</div>
					</div>

					{/* Close Icon */}
					<button
						className='p-2 hover:bg-gray-100 rounded-full transition-colors'
						aria-label='Cerrar'
						role='button'>
						<CloseOutlined className='text-gray-600 text-lg' />
					</button>
				</div>

				{/* Subtitle */}
				<div className='mt-4 space-y-1 text-center'>
					<p className='text-lg font-medium text-gray-700'>¡Nuevo servicio!</p>
					<p className='text-lg text-gray-700'>Encárgate de tu negocio, nosotros de tu contabilidad.</p>
				</div>
			</div>
		</header>
	);
}
