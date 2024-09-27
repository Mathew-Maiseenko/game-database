import CalendarDownloadSwg from '../../../../../../public/calendar-download.svg'
import { HoverIconWithText } from '../..'

export function HoverDownloadCalendarIcon() {
	return (
		<HoverIconWithText
			title='Last update'
			image={CalendarDownloadSwg}
			alt='Last update icon'
		/>
	)
}
