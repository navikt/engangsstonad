import ErrorPage from 'components/error';
// import EngangsstonadIndex from 'components/engangsstonad/Engangsstonad.index';
// import engangsstonadSteps from 'components/engangsstonad/steps';
import Planlegger from 'apps/planlegger/Planlegger.app';
import Workbench from 'apps/workbench/';
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
	{
		path: '/planlegger',
		component: Planlegger
	},
	{
		path: '/workbench',
		component: Workbench
	},
	{ component: ErrorPage }
];

export default defaultRouteConfig;
