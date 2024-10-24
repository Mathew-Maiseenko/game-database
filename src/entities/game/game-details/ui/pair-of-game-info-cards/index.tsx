import CardWithBaseInfo from './ui/card-with-base-info'
import CardWithStatisticalInfo from './ui/card-with-statistical-info'

export function PairOfGameInfoCards() {
	return (
		<section className='flex flex-col justify-start md:flex-row md:justify-between mb-9'>
			<CardWithBaseInfo />
			<CardWithStatisticalInfo />
		</section>
	)
}
