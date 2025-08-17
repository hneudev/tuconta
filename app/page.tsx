"use client";

import { useState } from "react";
import { Button } from "antd";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import VideoEmbed from "@/components/VideoEmbed";
import BenefitsList from "@/components/BenefitsList";
import StepsBand from "@/components/StepsBand";
import PackagesModal from "@/components/PackagesModal";
/**
 * tuConta Landing Page
 *
 * Para configurar la API de paquetes, crea un archivo .env.local con:
 * NEXT_PUBLIC_PACKAGES_API=https://tu-api-endpoint.com/packages
 *
 * Para ejecutar: npm run dev
 */

const featureCards = [
	{
		title: "Hacemos tu contabilidad mensual",
		iconSrc: "/icons/calculator.png",
	},
	{
		title: "Calculamos tus impuestos",
		iconSrc: "/icons/percentage.png",
	},
	{
		title: "Presentamos tus declaraciones SAT",
		iconSrc: "/icons/file-text.png",
	},
	{
		title: "Cálculo, timbrado y envío de nómina",
		iconSrc: "/icons/dollar.png",
	},
];

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<main className='min-h-screen bg-gray-50'>
			<Header />

			{/* Feature Cards Section */}
			<section className='py-12 bg-white'>
				<div className='container px-4 mx-auto'>
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
						{featureCards.map((card, index) => (
							<FeatureCard
								key={index}
								title={card.title}
								iconSrc={card.iconSrc}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Video and Benefits Section */}
			<section className='py-12 bg-gray-50'>
				<div className='container px-4 mx-auto'>
					<div className='grid items-start grid-cols-1 gap-12 lg:grid-cols-2'>
						<div>
							<VideoEmbed />
						</div>
						<div>
							<BenefitsList />
						</div>
					</div>
				</div>
			</section>

			{/* Steps Band */}
			<StepsBand />

			{/* CTA Section */}
			<section className='py-12 bg-white'>
				<div className='container px-4 mx-auto'>
					<div className='space-y-6 text-center'>
						<div>
							<p className='w-1/2 mx-auto text-base text-gray-700'>
								¿Quieres cambiar a tu Conta? Nosotros nos encargamos de llevar a cabo la transición de toda tu
								contabilidad hasta el día de hoy.
							</p>
						</div>
						<div className='flex flex-col justify-center w-4/5 max-w-4xl gap-4 mx-auto sm:flex-row py-8'>
							<Button
								type='primary'
								size='large'
								onClick={handleOpenModal}
								className='w-full rounded-full sm:w-1/2'
								style={{ backgroundColor: "#38b433", borderColor: "#38b433" }}>
								Ver Paquetes
							</Button>
							<Button
								type='primary'
								size='large'
								className='w-full rounded-full sm:w-1/2'
								style={{ backgroundColor: "#176BFF", borderColor: "#176BFF" }}>
								Agenda una cita con un contador experto
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Packages Modal */}
			<PackagesModal
				open={isModalOpen}
				onClose={handleCloseModal}
			/>
		</main>
	);
}
