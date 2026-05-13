"use client";
import type { Genre } from "@/shared/api";
import { fetchApiWrapper } from "@/shared/api";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux/hooks";
import { Carousel, Modal, MinimalistInput, CrossIcon } from "@/shared/ui";
import { useEffect, useState } from "react";
import { FiltrationSkeleton } from "@/features/filtration/ui/filtration-skeleton";
import { MinimalistFiltrationCarouselCard } from "@/features/filtration/ui/cards";
import { filteredGamesSlice } from "@/features/filtration";
import { Button } from "@/shared/ui/button";
import styles from "./shared.module.css";

export function GenresManipulator() {
	const [genres, setGenres] = useState<Genre[]>([]);
	const dispatch = useAppDispatch();
	const reduxStoredGenres = useAppSelector(
		filteredGamesSlice.selectors.selectGenreList,
	);

	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [newGenreName, setNewGenreName] = useState("");
	const [newGenreSlug, setNewGenreSlug] = useState("");
	const [newGenreImage, setNewGenreImage] = useState("");
	const [error, setError] = useState("");

	const fetchGenres = async () => {
		const data = await fetchApiWrapper<Genre[]>(`metadata/genres`);
		setGenres(data);
		dispatch(filteredGamesSlice.actions.initGenres(data));
	};

	useEffect(() => {
		if (reduxStoredGenres.length) {
			setGenres(reduxStoredGenres);
		} else {
			fetchGenres();
		}
	}, [dispatch, reduxStoredGenres]);

	const handleAddGenre = async () => {
		if (!newGenreName || !newGenreSlug || !newGenreImage) {
			setError("All fields are required");
			return;
		}

		const newGenre: Genre = {
			id: Date.now(),
			name: newGenreName,
			slug: newGenreSlug,
			gamesCount: 0,
			image: newGenreImage,
		};

		const res = await fetch("/api/metadata/genres", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newGenre),
		});

		if (res.ok) {
			await fetchGenres();
			setNewGenreName("");
			setNewGenreSlug("");
			setNewGenreImage("");
			setError("");
			setIsAddModalOpen(false);
		}
	};

	const handleDeleteGenre = async () => {
		if (!selectedGenre) {
			setError("No genre selected");
			return;
		}

		setIsDeleteModalOpen(false);
		const res = await fetch("/api/metadata/genres", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: selectedGenre.id }),
		});

		if (res.ok) {
			await fetchGenres();
			setError("");

			setSelectedGenre(null);
		}
	};

	const handleCardClick = (genre: Genre) => {
		setSelectedGenre((prev) => (prev?.id === genre.id ? null : genre));
	};

	if (genres.length) {
		return (
			<section className="mb-3">
				<Carousel>
					<ViewCards
						filterParams={genres}
						selectedGenre={selectedGenre}
						onCardClick={handleCardClick}
					/>
				</Carousel>
				<section className={styles.controls}>
					<button
						className="w-20 rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black"
						onClick={() => setIsAddModalOpen(true)}
					>
						Add Genre
					</button>
					<button
						className="rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black"
						onClick={() => {
							if (!selectedGenre) {
								setError("Please select a genre to delete");
								return;
							}
							setError("");
							setIsDeleteModalOpen(true);
						}}
					>
						Delete Genre
					</button>
				</section>
				{error && !isAddModalOpen && !isDeleteModalOpen && (
					<p className="text-validationRed text-sm mt-2">{error}</p>
				)}

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
							<h2 className="text-xl font-bold">Add Genre</h2>
							<div onClick={() => setIsAddModalOpen(false)}>
								<CrossIcon classes="w-6 h-6 cursor-pointer" />
							</div>
						</header>
						<MinimalistInput
							inputValue={newGenreName}
							setInputValue={setNewGenreName}
							message="Genre name"
							className="w-full bg-inherit mb-5"
							withMagnifierIcon={false}
						/>
						<MinimalistInput
							inputValue={newGenreSlug}
							setInputValue={setNewGenreSlug}
							message="Slug"
							className="w-full bg-inherit mb-5"
							withMagnifierIcon={false}
						/>
						<MinimalistInput
							inputValue={newGenreImage}
							setInputValue={setNewGenreImage}
							message="Image URL"
							className="w-full bg-inherit mb-5"
							withMagnifierIcon={false}
						/>
						{error && isAddModalOpen && (
							<p className="text-validationRed text-sm">{error}</p>
						)}
						<Button onClick={handleAddGenre}>Add</Button>
					</section>
				</Modal>

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
							<h2 className="text-xl font-bold">Delete Genre</h2>
							<div onClick={() => setIsDeleteModalOpen(false)}>
								<CrossIcon classes="w-6 h-6 cursor-pointer" />
							</div>
						</header>
						<p className="text-base w-full text-center">
							Are you sure you want to delete genre:{" "}
							<span className="font-bold">{selectedGenre?.name}</span>?
						</p>
						{error && isDeleteModalOpen && (
							<p className="text-validationRed text-sm">{error}</p>
						)}
						<Button onClick={handleDeleteGenre}>Delete</Button>
					</section>
				</Modal>
			</section>
		);
	} else {
		return <FiltrationSkeleton />;
	}
}

const ViewCards = ({
	filterParams,
	selectedGenre,
	onCardClick,
}: {
	filterParams: Genre[];
	selectedGenre: Genre | null;
	onCardClick: (genre: Genre) => void;
}) => {
	return filterParams.map((genre: Genre) => (
		<MinimalistFiltrationCarouselCard
			key={`${genre.name}-${genre.id}`}
			title={genre.name}
			image={genre.image}
			isActive={selectedGenre?.id === genre.id}
			setFiltration={() => onCardClick(genre)}
		/>
	));
};
