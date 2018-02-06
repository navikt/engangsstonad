import ErrorPage from 'components/error/ErrorPage';
import EngangsstonadConfirmation from 'components/engangsstonad/EngangsstonadConfirmation';
import EngangsstonadIndex from 'components/engangsstonad/EngangsstonadIndex';
import EngangsstonadCompleted from 'components/engangsstonad/EngangsstonadCompleted';

const defaultRouteConfig = [
	{
		path: '/engangsstonad/completed',
		component: EngangsstonadCompleted,
		exact: true
	},
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
