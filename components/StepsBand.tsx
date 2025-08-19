"use client";

const steps = [
	{
		number: "1",
		title: "Agrega tu FIEL",
		iconSrc: "/images/step1.webp",
	},
	{
		number: "2",
		title: "Sincroniza tus cuentas bancarias",
		iconSrc: "/images/step2.webp",
	},
	{
		number: "3",
		title: "Recibe mensualmente tu declaración de impuestos",
		iconSrc: "/images/step3.webp",
	},
];

export default function StepsBand() {
	return (
		<section className='py-12 text-white bg-primary'>
			<div className='container px-4 mx-auto'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
					{steps.map((step, index) => (
						<div
							key={index}
							className='text-center'>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex items-center justify-center w-32 h-auto'>
									<img
										src={step.iconSrc}
										alt={`Paso ${step.number}`}
										className='w-28 h-auto object-contain'
									/>
								</div>
								<div>
									<h3 className='mb-2 text-lg font-bold text-accent'>PASO {step.number}</h3>
									<p className='text-sm leading-relaxed opacity-90'>{step.title}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
