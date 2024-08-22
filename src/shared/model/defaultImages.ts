import GameDefaultImage1 from './../../../public/GameDefaultImages/GameDefaultImage1.jpg'
import GameDefaultImage2 from './../../../public/GameDefaultImages/GameDefaultImage2.jpg'
import GameDefaultImage3 from './../../../public/GameDefaultImages/GameDefaultImage3.jpg'
import GameDefaultImage4 from './../../../public/GameDefaultImages/GameDefaultImage4.jpg'
import GameDefaultImage5 from './../../../public/GameDefaultImages/GameDefaultImage5.jpg'
import GameDefaultImage6 from './../../../public/GameDefaultImages/GameDefaultImage6.jpg'
import GameDefaultImage7 from './../../../public/GameDefaultImages/GameDefaultImage7.jpg'
import GameDefaultImage8 from './../../../public/GameDefaultImages/GameDefaultImage8.jpg'

export default function getRandomDefaultImage(): any {
	let GameDefaultImages: any[] = [
		GameDefaultImage1,
		GameDefaultImage2,
		GameDefaultImage3,
		GameDefaultImage4,
		GameDefaultImage5,
		GameDefaultImage6,
		GameDefaultImage7,
		GameDefaultImage8,
	]

	let min: number = 0
	let max: number = GameDefaultImages.length - 1
	return GameDefaultImages[Math.floor(Math.random() * (max - min + 1) + min)]
}

// function getRandomInt(min: number, max: number): number {
// 	min = Math.ceil(min)
// 	max = Math.floor(max)
// 	return Math.floor(Math.random() * (max - min + 1) + min)
// }
// let GameDefaultImages: any = [
// 	GameDefaultImage1,
// 	GameDefaultImage2,
// 	GameDefaultImage3,
// 	GameDefaultImage4,
// 	GameDefaultImage5,
// 	GameDefaultImage6,
// 	GameDefaultImage7,
// 	GameDefaultImage8,
// ]
