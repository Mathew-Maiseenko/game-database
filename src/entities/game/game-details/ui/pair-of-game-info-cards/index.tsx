import CardWithBaseInfo from './ui/card-with-base-info'
import CardWithStatisticalInfo from './ui/card-with-statistical-info'

export function PairOfGameInfoCards() {
	return (
		<section className='flex justify-between mb-9'>
			<CardWithBaseInfo />
			<CardWithStatisticalInfo />
		</section>
	)
}
