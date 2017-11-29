import EngangsstonadIndex from './../../components/engangsstonad/Engangsstonad.index';
import engangsstonadSteps from './../../components/engangsstonad/steps';

const routeConfig = [
    {
        path: '/',
        component: EngangsstonadIndex,
        exact: true
    },
    {
        path: '/engangsstonad',
        component: EngangsstonadIndex,
        routes: engangsstonadSteps.map((step) => ({
            path: `/engangsstonad/${step.name.toLowerCase()}`,
            component: step
        }))
    }
];

export default routeConfig;
