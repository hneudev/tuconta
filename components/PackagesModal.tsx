"use client";

import React from "react";

import { useEffect, useState, useRef } from "react";
import { Modal, Card, Button, Alert, Skeleton, Pagination } from "antd";
import { useGetPackagesQuery } from "@/store/services/packagesApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closePackagesModal, openPackagesModal, setPackagesPage, setPackagesPageSize } from "@/store/slices/uiSlice";
import safeStorage from "@/lib/safeStorage";

interface PackagesModalProps {
	open: boolean;
	onClose: () => void;
}

export default function PackagesModal({ open, onClose }: PackagesModalProps) {
	const dispatch = useAppDispatch();
	const { packagesModalOpen, packagesPage, packagesPageSize } = useAppSelector((s) => s.ui);

	const currentPage = packagesPage;
	const pageSize = packagesPageSize;

	const { data, isLoading, error, refetch } = useGetPackagesQuery(
		{ page: currentPage, limit: pageSize },
		{ skip: !packagesModalOpen }
	);

	// Coordinate content visibility to avoid abrupt layout shifts.
	const [contentVisible, setContentVisible] = useState(false);

	// Prevent hydration mismatch: render nothing on first client render until mounted
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	// Focus management: remember previously focused element and focus first focusable element inside the modal
	const modalContentRef = useRef<HTMLDivElement | null>(null);
	const previouslyFocusedRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (packagesModalOpen) {
			// store previously focused element to restore later
			try {
				previouslyFocusedRef.current = (document.activeElement as HTMLElement) || null;
			} catch (e) {
				previouslyFocusedRef.current = null;
			}

			// focus the first focusable element inside the modal after it becomes visible
			const t = setTimeout(() => {
				if (modalContentRef.current) {
					const focusable = modalContentRef.current.querySelector<HTMLElement>(
						"button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
					);
					if (focusable) focusable.focus();
				}
			}, 120);
			return () => clearTimeout(t);
		}
		// when modal closes restore focus
		if (!packagesModalOpen && previouslyFocusedRef.current) {
			try {
				previouslyFocusedRef.current.focus();
			} catch (e) {}
			previouslyFocusedRef.current = null;
		}
	}, [packagesModalOpen]);

	useEffect(() => {
		// Whenever packages data or loading state changes, briefly hide content then show it
		// to trigger the transition on grid updates (page change, pageSize change, etc.).
		if (!isLoading && data) {
			// hide first to allow exit transition
			setContentVisible(false);
			const t = setTimeout(() => setContentVisible(true), 80); // small delay to avoid flicker
			return () => clearTimeout(t);
		}
		// while loading or no data, keep hidden
		setContentVisible(false);
	}, [isLoading, data?.data, data?.total]);

	useEffect(() => {
		// Sync external open prop into the ui store and restore saved pagination
		if (open) {
			try {
				const savedPage = safeStorage.getItem("tuconta:packagesPage");
				const savedSize = safeStorage.getItem("tuconta:packagesPageSize");
				if (savedPage) dispatch(setPackagesPage(Number(savedPage)));
				else dispatch(setPackagesPage(1));
				if (savedSize) dispatch(setPackagesPageSize(Number(savedSize)));
				else dispatch(setPackagesPageSize(4));
				// Cleanup leftover sorting key (sorting feature removed)
				try {
					safeStorage.removeItem("tuconta:packagesSort");
				} catch (e) {}
			} catch (e) {
				// localStorage unavailable — fallback to defaults
				dispatch(setPackagesPage(1));
				dispatch(setPackagesPageSize(4));
			}
			dispatch(openPackagesModal());
		} else {
			dispatch(closePackagesModal());
		}
	}, [open, dispatch]);

	const handleRetry = () => {
		try {
			refetch();
		} catch (e) {}
	};

	const handlePageChange = (page: number, newPageSize?: number) => {
		if (typeof newPageSize === "number" && newPageSize !== pageSize) {
			dispatch(setPackagesPageSize(newPageSize));
			try {
				safeStorage.setItem("tuconta:packagesPageSize", String(newPageSize));
			} catch (e) {}
		}
		dispatch(setPackagesPage(page));
		try {
			safeStorage.setItem("tuconta:packagesPage", String(page));
		} catch (e) {}
	};

	const handlePageSizeChange = (current: number, size: number) => {
		// Calculate new page so the currently visible items remain on screen.
		// We compute the zero-based index of the first item on the current page,
		// then determine which page (with the new page size) contains that index.
		const firstItemIndexZero = (currentPage - 1) * pageSize;
		const newPage = Math.floor(firstItemIndexZero / size) + 1;

		dispatch(setPackagesPageSize(size));
		dispatch(setPackagesPage(newPage));
		try {
			safeStorage.setItem("tuconta:packagesPageSize", String(size));
			safeStorage.setItem("tuconta:packagesPage", String(newPage));
		} catch (e) {}
	};

	// Page size and pagination are controlled via uiSlice; packages come directly from the API
	const packages = data?.data ?? [];
	const total = data?.total ?? 0;

	if (!mounted) return null;

	return (
		<Modal
			title={
				<div className='flex items-center justify-between'>
					<h2
						id='packages-modal-title'
						className='text-lg font-semibold'>
						Lista de paquetes
					</h2>
					<Button
						aria-label='Cerrar'
						type='text'
						size='small'
						onClick={() => {
							dispatch(closePackagesModal());
							onClose();
						}}>
						Cerrar
					</Button>
				</div>
			}
			open={packagesModalOpen}
			onCancel={() => {
				dispatch(closePackagesModal());
				onClose();
			}}
			closable={false}
			footer={null}
			width={1200}
			centered
			destroyOnClose={false}
			keyboard={true}
			forceRender={true}
			focusTriggerAfterClose={true}>
			<div
				className='space-y-6'
				ref={modalContentRef}
				role='dialog'
				aria-modal='true'
				aria-labelledby='packages-modal-title'
				aria-describedby='packages-modal-desc'>
				<div
					id='packages-modal-desc'
					className='sr-only'>
					Lista de paquetes disponibles para seleccionar
				</div>

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

				{data && (
					<div
						className={`transition-opacity transform duration-200 ease-out ${
							contentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
						}`}>
						{/* Page Size Selector */}
						<div className='flex items-center justify-end mb-4'>
							<div className='flex items-center space-x-2'>
								<label
									htmlFor='packages-page-size'
									className='text-sm text-gray-600'>
									Elementos por página:
								</label>
								<select
									id='packages-page-size'
									value={pageSize}
									onChange={(e) => handlePageSizeChange(1, Number(e.target.value))}
									className='px-2 py-1 text-sm border border-gray-300 rounded'
									aria-label='Elementos por página:'>
									<option value={4}>4</option>
									<option value={8}>8</option>
									<option value={12}>12</option>
								</select>
							</div>
						</div>

						<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr'>
							{packages.map((pkg, idx) => (
								<Card
									key={pkg.id ?? `pkg-${idx}`}
									className='h-full min-h-[220px] transition-shadow border-0 shadow-sm bg-[#cce2ef] hover:shadow-md [&_.ant-card-body]:h-full'>
									<div className='flex flex-col justify-between h-full'>
										{/* Top Content */}
										<div className='flex flex-col justify-between h-full'>
											{/* Title with divider line */}
											<div className='mb-4'>
												<h4 className='mb-2 text-xl font-bold text-[#387ab2] text-center'>{pkg.name ?? "Paquete"}</h4>
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

						{/* Pagination - reserved area to avoid layout shifts */}
						{data && (
							<div className='flex justify-center mt-6 min-h-[56px]'>
								{isLoading ? (
									<div className='w-64 h-4 bg-gray-200 rounded animate-pulse' />
								) : (
									total > pageSize && (
										<Pagination
											current={currentPage}
											total={total}
											pageSize={pageSize}
											onChange={handlePageChange}
											showSizeChanger={false}
											showQuickJumper={false}
											showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} paquetes`}
											responsive={true}
											className='text-sm'
										/>
									)
								)}
							</div>
						)}
					</div>
				)}

				{!isLoading && !error && data && total === 0 && (
					<div className='py-8 text-center text-gray-500'>No hay paquetes disponibles</div>
				)}
			</div>
		</Modal>
	);
}
