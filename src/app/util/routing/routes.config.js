import ErrorPage from 'components/error';
import EngangsstonadConfirmation from 'components/engangsstonad/EngangsstonadConfirmation';
import EngangsstonadIndex from 'components/engangsstonad/EnangsstonadIndex';

const defaultRouteConfig = [
	{
		path: '/engangsstonad',
		component: EngangsstonadConfirmation,
		exact: true
	},
	{
		path: '/engangsstonad/:stepNo',
		component: EngangsstonadIndex
	},
	{ component: ErrorPage }
];

export default defaultRouteConfig;
