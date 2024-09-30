import CalendarSettingSwg from '../../../../../../public/calendar-setting.svg'
import { HoverIconWithText } from '../..'

export function HoverSettingCalendarIcon() {
	return (
		<HoverIconWithText
			title='Release date'
			image={CalendarSettingSwg}
			alt='Release icon'
		/>
	)
}
