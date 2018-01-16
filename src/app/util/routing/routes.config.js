import ErrorPage from 'components/error';
import EngangsstonadIndex from 'components/engangsstonad/Engangsstonad.index';
import engangsstonadSteps from 'components/engangsstonad/steps';
import Planlegger from 'apps/planlegger/Planlegger.app';

const defaultRouteConfig = [
	{
		path: '/engangsstonad',
		component: EngangsstonadIndex,
		routes: engangsstonadSteps.map((step) => {
			const subpath = step.WrappedComponent
				? step.WrappedComponent.name.toLowerCase()
				: step.name.toLowerCase();
			return {
				subpath,
				path: `/engangsstonad/${subpath}`,
				component: step
			};
		})
	},
	{
		path: '/planlegger',
		component: Planlegger
	},
	{ component: ErrorPage }
];

export default defaultRouteConfig;
