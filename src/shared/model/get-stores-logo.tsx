import Link from 'next/link'

import type { Store } from '../api'
import {
	AppStoreIcon,
	GOGIcon,
	GooglePlayIcon,
	NintendoSwitchIcon,
	PlaystationIcon,
	SteamIcon,
	Xbox360Icon,
	XboxIcon,
} from '../ui'

export const StoreLogoList = ({ stores }: { stores: Store[] }) =>
	stores.map((store: Store) => {
		switch (store.id) {
			case 1:
				return (
					<StoreLink store={store}>
						<SteamIcon />
					</StoreLink>
				)
			case 2:
				return (
					<StoreLink store={store}>
						<XboxIcon />
					</StoreLink>
				)
			case 3:
				return (
					<StoreLink store={store}>
						<PlaystationIcon />
					</StoreLink>
				)
			case 4:
				return (
					<StoreLink store={store}>
						<AppStoreIcon />
					</StoreLink>
				)
			case 5:
				return (
					<StoreLink store={store}>
						<GOGIcon />
					</StoreLink>
				)
			case 6:
				;<StoreLink store={store}>
					<NintendoSwitchIcon />
				</StoreLink>
				break
			case 7:
				return (
					<StoreLink store={store}>
						<Xbox360Icon />
					</StoreLink>
				)
			case 8:
				return (
					<StoreLink store={store}>
						<GooglePlayIcon />
					</StoreLink>
				)
			default:
				return ''
		}
	})

const StoreLink = ({
	children,
	store,
}: {
	children: JSX.Element
	store: Store
}) => (
	<Link
		key={`${store.name}-${store.id}`}
		href={`https://${store.domain} text-errorMessageRed`}
		className={`mr-1 w-4 h-4 sm:w-5 sm:h-5`}
	>
		{children}
	</Link>
)
