import * as React from 'react';
import { Periode } from 'apps/planlegger/components/uttaksplan/mock/perioder';

export interface Props {
	perioder: Periode[];
}

const Periode: React.StatelessComponent<{ periode: Periode }> = ({ periode }) => (
	<div className="periode">
		<h2>{periode.navn}</h2>
		<p>Kvote: {periode.kvote}</p>
		<p>Forelder: {periode.forelder}</p>
		<p>
			Tidsrom: {periode.tidsrom.start.toDateString()} - {periode.tidsrom.slutt.toDateString()}
		</p>
	</div>
);

const Periodetidslinje: React.StatelessComponent<Props> = (props) => {
	const { perioder } = props;
	return <div>{perioder.map((p, idx) => <Periode key={idx} periode={p} />)}</div>;
};

export default Periodetidslinje;
