// eslint-disable-next-line import/prefer-default-export
export const shouldShowStepper = (nextRoute, state) => {
	if (nextRoute) {
		switch (nextRoute.path) {
			case '/engangsstonad/step2':
				return (
					state.childBorn !== undefined &&
					state.terminDato !== undefined &&
					state.bekreftetTermindato !== undefined &&
					state.noOfChildren !== undefined
				);
			case '/engangsstonad/step3':
				return (
					state.residedInNorwayLastTwelveMonths !== undefined &&
					state.workedInNorwayLastTwelveMonths !== undefined &&
					state.residingInNorwayDuringBirth !== undefined &&
					state.residingInNorwayNextTwelveMonths !== undefined
				);
			default:
				return true;
		}
	}
	return true;
};
