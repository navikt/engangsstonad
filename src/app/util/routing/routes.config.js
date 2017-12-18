import EngangsstonadIndex from './../../components/engangsstonad/Engangsstonad.index';
import engangsstonadSteps from './../../components/engangsstonad/steps';

const defaultRouteConfig = [
    {
        path: '/',
        component: EngangsstonadIndex,
        exact: true
    },
    {
        path: '/engangsstonad',
        component: EngangsstonadIndex,
        routes: engangsstonadSteps.map((step) => {
            const subpath = step.name;
            return {
                subpath: subpath.toLowerCase(),
                component: step
            };
        })
    }
];

export default defaultRouteConfig;
