import Image from 'next/image'
import Link from 'next/link'

import Steam from '../../../public/StoresLogo/steam-svgrepo-com.svg'
import XboxStore from '../../../public/StoresLogo/xbox-svgrepo-com.svg'
import Xbox360Store from '../../../public/StoresLogo/xbox-360.svg'
import PlayStationStore from '../../../public/StoresLogo/playstation-svgrepo-com.svg'
import AppStore from '../../../public/StoresLogo/app-store-svgrepo-com.svg'
import GOG from '../../../public/StoresLogo/gog-dot-com-svgrepo-com.svg'
import NintendoStore from '../../../public/StoresLogo/nintendo-switch-svgrepo-com.svg'
import GooglePlay from '../../../public/StoresLogo/google-play-svgrepo-com.svg'

import type { Store } from '../api/RawgApi-hook'

export const StoreLogoList = ({ stores }: { stores: Store[] }) =>
	stores.map((store: Store) => {
		let storeImage
		switch (store.id) {
			case 1:
				storeImage = Steam
				break
			case 2:
				storeImage = XboxStore
				break
			case 3:
				storeImage = PlayStationStore
				break
			case 4:
				storeImage = AppStore
				break
			case 5:
				storeImage = GOG
				break
			case 6:
				storeImage = NintendoStore
				break
			case 7:
				storeImage = Xbox360Store
				break
			case 8:
				storeImage = GooglePlay
				break
			default:
				return
		}
		return (
			<Link
				key={`${store.name}-${store.id}`}
				href={`https://${store.domain}`}
				className={`mr-1`}
			>
				<Image
					src={storeImage}
					width={20}
					height={20}
					alt='Picture of the author'
					className=''
				/>
			</Link>
		)
	})
