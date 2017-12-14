import EngangsstonadIndex from './../../components/engangsstonad/Engangsstonad.index';
import Counter from './../../components/counter/index';
import engangsstonadSteps from './../../components/engangsstonad/steps';

const routeConfig = [
    {
        path: '/',
        component: EngangsstonadIndex,
        exact: true
    },
    {
        path: '/counter',
        component: Counter,
        exact: true
    },
    {
        path: '/engangsstonad',
        component: EngangsstonadIndex,
        routes: engangsstonadSteps.map((step) => {
            const subPath = step.WrappedComponent ? step.WrappedComponent.name : step.name;
            return {
                subpath: subPath.toLowerCase(),
                component: step
            };
        })
    }
];

export default routeConfig;
