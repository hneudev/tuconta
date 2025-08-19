"use client";

import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "antd";

export default function Header() {
	// State to control the exit confirmation modal
	const [confirmOpen, setConfirmOpen] = useState(false);
	return (
		<header className='bg-white shadow-sm border-b'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex justify-between items-center'>
					{/* Logo Placeholder */}
					<div className='flex items-center justify-center flex-1'>
						<div className='w-auto h-auto flex items-center justify-center'>
							<img
								src='/images/tuconta-logo-1_transparent.webp'
								alt='tuConta logo'
								className='h-32 object-contain'
							/>
						</div>
					</div>

					{/* Close Icon */}
					<button
						className='p-2 hover:bg-gray-100 rounded-full transition-colors'
						aria-label='Cerrar'
						role='button'
						onClick={() => setConfirmOpen(true)}>
						<CloseOutlined className='text-gray-600 text-lg' />
					</button>
				</div>

				{/* Subtitle */}
				<div className='mt-4 space-y-1 text-center'>
					<p className='text-lg font-medium text-gray-700'>¡Nuevo servicio!</p>
					<p className='text-lg text-gray-700'>Encárgate de tu negocio, nosotros de tu contabilidad.</p>
				</div>
			</div>

			{/* Separator Line */}
			<div className='mt-4 border-t border-gray-200'></div>

			{/* Confirm exit modal - redirects to external site when confirmed */}
			<Modal
				title={"¿Seguro que deseas salir de tu Conta?"}
				open={confirmOpen}
				onOk={() => {
					// Navigate to external site when user confirms exit
					window.location.href = "https://docdigitales.com";
				}}
				onCancel={() => setConfirmOpen(false)}
				okText='Si'
				cancelText='No'
			/>
		</header>
	);
}
