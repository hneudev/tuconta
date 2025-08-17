"use client";

import { CheckCircleFilled } from "@ant-design/icons";

const benefits = [
	{
		title: "Automático",
		description: "Ahorra tiempo al eliminar la tarea de enviar facturas a tu contador ¡El proceso es automático!",
	},
	{
		title: "Servicio Oportuno",
		description: "Comunicación más fácil y efectiva con tu contador personal.",
	},
	{
		title: "Simplicidad",
		description: "Información contable en tiempo real.",
	},
	{
		title: "Confiable",
		description: "Cálculos hechos por uno de nuestros contadores expertos asignado especialmente a tu negocio.",
	},
];

export default function BenefitsList() {
	return (
		<div className='space-y-6'>
			<h2 className='text-2xl font-bold text-gray-800 mb-6'>Beneficios</h2>
			<div className='space-y-4'>
				{benefits.map((benefit, index) => (
					<div
						key={index}
						className='flex items-start space-x-3'>
						<CheckCircleFilled className='text-primary text-xl mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-800'>{benefit.title}</h3>
							<p className='text-gray-600 text-sm'>{benefit.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
