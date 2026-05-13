"use client";
import { useEffect, useState } from "react";
import { Carousel, Modal, MinimalistInput, CrossIcon } from "@/shared/ui";
import { FiltrationSkeleton } from "@/features/filtration/ui/filtration-skeleton";
import { MinimalistFiltrationCarouselCard } from "@/features/filtration/ui/cards";
import { Button } from "@/shared/ui/button";
import styles from "./shared.module.css";

interface Developer {
	id: number;
	name: string;
	slug: string;
	image: string;
	gameCount: number;
}

export function DevelopersManipulator() {
	const [developers, setDevelopers] = useState<Developer[]>([]);
	const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(
		null,
	);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [newDevName, setNewDevName] = useState("");
	const [newDevSlug, setNewDevSlug] = useState("");
	const [newDevImage, setNewDevImage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const fetchDevelopers = async () => {
		try {
			const res = await fetch("/api/metadata/developers");
			if (!res.ok) throw new Error("Failed to fetch");
			const data = await res.json();
			setDevelopers(data);
		} catch (err) {
			console.error(err);
			setError("Failed to load developers");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDevelopers();
	}, []);

	const handleAddDeveloper = async () => {
		if (!newDevName || !newDevSlug || !newDevImage) {
			setError("All fields are required");
			return;
		}

		const newDeveloper: Developer = {
			id: Date.now(),
			name: newDevName,
			slug: newDevSlug,
			image: newDevImage,
			gameCount: 0,
		};

		const res = await fetch("/api/developers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newDeveloper),
		});

		if (res.ok) {
			await fetchDevelopers();
			setNewDevName("");
			setNewDevSlug("");
			setNewDevImage("");
			setError("");
			setIsAddModalOpen(false);
		} else {
			const err = await res.text();
			setError(err || "Failed to add developer");
		}
	};

	const handleDeleteDeveloper = async () => {
		if (!selectedDeveloper) {
			setError("No developer selected");
			return;
		}

		const res = await fetch("/api/developers", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: selectedDeveloper.id }),
		});

		if (res.ok) {
			await fetchDevelopers();
			setSelectedDeveloper(null);
			setIsDeleteModalOpen(false);
			setError("");
		} else {
			const err = await res.text();
			setError(err || "Failed to delete developer");
		}
	};

	const handleCardClick = (dev: Developer) => {
		setSelectedDeveloper((prev) => (prev?.id === dev.id ? null : dev));
	};

	if (loading) {
		return <FiltrationSkeleton />;
	}

	return (
		<section className="mb-3">
			<Carousel>
				{developers.map((dev: Developer) => (
					<MinimalistFiltrationCarouselCard
						key={`${dev.name}-${dev.id}`}
						title={dev.name}
						image={dev.image}
						isActive={selectedDeveloper?.id === dev.id}
						setFiltration={() => handleCardClick(dev)}
					/>
				))}
			</Carousel>

			<section className={styles.controls}>
				<button
					className="w-24 rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black"
					onClick={() => setIsAddModalOpen(true)}
				>
					Add Dev
				</button>
				<button
					className="rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black"
					onClick={() => {
						if (!selectedDeveloper) {
							setError("Please select a developer to delete");
							return;
						}
						setError("");
						setIsDeleteModalOpen(true);
					}}
				>
					Delete Dev
				</button>
			</section>

			{error && !isAddModalOpen && !isDeleteModalOpen && (
				<p className="text-validationRed text-sm mt-2">{error}</p>
			)}

			{/* Модальное окно добавления */}
			<Modal
				isOpen={isAddModalOpen}
				setModalCloseFunction={() => setIsAddModalOpen(false)}
			>
				<section
					onClick={(e) => e.stopPropagation()}
					className="relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray
            w-4/5 lg:w-3/5 p-5 md:p-6 lg:p-7 rounded-2xl lg:rounded-3xl cursor-default flex flex-col gap-5"
				>
					<header className="flex justify-between items-center mb-2">
						<h2 className="text-xl font-bold">Add Developer</h2>
						<div onClick={() => setIsAddModalOpen(false)}>
							<CrossIcon classes="w-6 h-6 cursor-pointer" />
						</div>
					</header>
					<MinimalistInput
						inputValue={newDevName}
						setInputValue={setNewDevName}
						message="Developer name"
						className="w-full bg-inherit mb-5"
						withMagnifierIcon={false}
					/>
					<MinimalistInput
						inputValue={newDevSlug}
						setInputValue={setNewDevSlug}
						message="Slug"
						className="w-full bg-inherit mb-5"
						withMagnifierIcon={false}
					/>
					<MinimalistInput
						inputValue={newDevImage}
						setInputValue={setNewDevImage}
						message="Image URL"
						className="w-full bg-inherit mb-5"
						withMagnifierIcon={false}
					/>
					{error && isAddModalOpen && (
						<p className="text-validationRed text-sm">{error}</p>
					)}
					<Button onClick={handleAddDeveloper}>Add</Button>
				</section>
			</Modal>

			{/* Модальное окно удаления */}
			<Modal
				isOpen={isDeleteModalOpen}
				setModalCloseFunction={() => setIsDeleteModalOpen(false)}
			>
				<section
					onClick={(e) => e.stopPropagation()}
					className="relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray
            p-5 md:p-6 lg:p-7 rounded-2xl lg:rounded-3xl cursor-default flex flex-col gap-5"
				>
					<header className="flex justify-between items-center mb-2">
						<h2 className="text-xl font-bold">Delete Developer</h2>
						<div onClick={() => setIsDeleteModalOpen(false)}>
							<CrossIcon classes="w-6 h-6 cursor-pointer" />
						</div>
					</header>
					<p className="text-base w-full text-center">
						Are you sure you want to delete developer:{" "}
						<span className="font-bold">{selectedDeveloper?.name}</span>?
					</p>
					{error && isDeleteModalOpen && (
						<p className="text-validationRed text-sm">{error}</p>
					)}
					<Button onClick={handleDeleteDeveloper}>Delete</Button>
				</section>
			</Modal>
		</section>
	);
}
