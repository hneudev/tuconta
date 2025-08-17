"use client";

import { useEffect, useState } from "react";
import { Modal, Card, Button, Alert, Skeleton, Pagination } from "antd";
import { useLazyGetPackagesQuery } from "@/store/services/packagesApi";

interface PackagesModalProps {
	open: boolean;
	onClose: () => void;
}

export default function PackagesModal({ open, onClose }: PackagesModalProps) {
	const [getPackages, { data, isLoading, error }] = useLazyGetPackagesQuery();

	const DEFAULT_PAGE = 1;
	const DEFAULT_PAGE_SIZE = 4;
	const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

	useEffect(() => {
		const fetchInitialData = async () => {
			if (open) {
				setCurrentPage(DEFAULT_PAGE);
				setPageSize(DEFAULT_PAGE_SIZE);
				try {
					await getPackages({ page: DEFAULT_PAGE, limit: DEFAULT_PAGE_SIZE }).unwrap();
				} catch (err) {
					console.error("Error fetching packages:", err);
				}
			}
		};
		fetchInitialData();
	}, [open, getPackages]);

	useEffect(() => {
		const fetchData = async () => {
			if (open && (currentPage !== DEFAULT_PAGE || pageSize !== DEFAULT_PAGE_SIZE)) {
				try {
					await getPackages({ page: currentPage, limit: pageSize }).unwrap();
				} catch (err) {
					console.error("Error fetching packages:", err);
				}
			}
		};
		fetchData();
	}, [currentPage, pageSize, open, getPackages]);

	const handleRetry = () => {
		getPackages({ page: currentPage, limit: pageSize });
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageSizeChange = (current: number, size: number) => {
		setPageSize(size);
		setCurrentPage(1); // Reset to first page when changing page size
	};

	const packages = data?.data ?? [];
	const total = data?.total ?? 0;
	// If backend doesn't provide a total, estimate a total so Pagination can advance while
	// the server continues to return full pages. When the server returns a shorter page,
	// the estimate becomes exact.
	let effectiveTotal: number;
	if (total > 0) {
		effectiveTotal = total;
	} else {
		const fullPage = packages.length === pageSize;
		// estimate allows one extra full page available beyond the current page
		effectiveTotal = currentPage * pageSize + (fullPage ? pageSize : packages.length);
	}

	return (
		<Modal
			title='Lista de paquetes'
			open={open}
			onCancel={onClose}
			footer={null}
			width={1200}
			centered
			destroyOnClose={false}>
			<div className='space-y-6'>
				{isLoading && (
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{[...Array(8)].map((_, index) => (
							<Skeleton
								key={index}
								active
								paragraph={{ rows: 3 }}
								className='h-48'
							/>
						))}
					</div>
				)}

				{error && (
					<Alert
						message='Error al cargar los paquetes'
						description='No se pudieron cargar los paquetes. Intenta de nuevo.'
						type='error'
						action={
							<Button
								size='small'
								onClick={handleRetry}>
								Reintentar
							</Button>
						}
						showIcon
					/>
				)}

				{packages && packages.length > 0 && (
					<>
						{/* Page Size Selector */}
						<div className='flex items-center justify-between mb-4'>
							<div className='text-sm text-gray-600'>Mostrar {pageSize} elementos por página</div>
							<div className='flex items-center space-x-2'>
								<span className='text-sm text-gray-600'>Elementos por página:</span>
								<select
									value={pageSize}
									onChange={(e) => handlePageSizeChange(1, Number(e.target.value))}
									className='px-2 py-1 text-sm border border-gray-300 rounded'
									aria-label='Elementos por página'>
									<option value={4}>4</option>
									<option value={8}>8</option>
									<option value={12}>12</option>
								</select>
							</div>
						</div>

						<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr'>
							{packages.map((pkg) => (
								<Card
									key={pkg.id}
									className='h-full transition-shadow border-0 shadow-sm bg-[#cce2ef] hover:shadow-md [&_.ant-card-body]:h-full'>
									<div className='flex flex-col justify-between h-full'>
										{/* Top Content */}
										<div className='flex flex-col justify-between h-full'>
											{/* Title with divider line */}
											<div className='mb-4'>
												<h4 className='mb-2 text-xl font-bold text-[#387ab2] text-center'>{pkg.name}</h4>
												<div className='h-px bg-blue-200 mx-auto w-1/2'></div>
											</div>

											{/* Price */}
											<div className='mb-4'>
												{pkg.price ? (
													<div className='flex items-baseline justify-center space-x-1'>
														<span className='text-base text-gray-600'>$</span>

														<span className='text-5xl font-bold text-gray-600'>{pkg.price}</span>
														<span className='text-base text-gray-600'>+ IVA/mes</span>
													</div>
												) : null}
											</div>

											{/* Description */}
											<div className='mb-4'>
												<p className='text-sm leading-relaxed text-gray-700'>{pkg.description}</p>
											</div>

											{/* Movements */}
											{pkg.movements && (
												<div className='mb-4'>
													<p className='text-xs text-gray-600'>{pkg.movements}</p>
												</div>
											)}
										</div>

										{/* Button - Bottom */}
										<div>
											<Button
												type='primary'
												size='middle'
												className='w-full rounded-full bg-[#387ab2] border-[#387ab2] hover:bg-blue-700 hover:border-blue-700'>
												{pkg.buttonText || "Elegir"}
											</Button>
										</div>
									</div>
								</Card>
							))}
						</div>

						{/* Pagination - render whenever packages are present */}
						<div className='flex justify-center mt-6'>
							<Pagination
								current={currentPage}
								total={effectiveTotal}
								pageSize={pageSize}
								onChange={handlePageChange}
								showSizeChanger={false}
								showQuickJumper={false}
								showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} paquetes`}
								responsive={true}
								className='text-sm'
							/>
						</div>
					</>
				)}

				{!isLoading && !error && (!packages || packages.length === 0) && (
					<div className='py-8 text-center text-gray-500'>No hay paquetes disponibles</div>
				)}
			</div>
		</Modal>
	);
}
