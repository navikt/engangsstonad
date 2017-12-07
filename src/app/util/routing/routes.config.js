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
        routes: engangsstonadSteps.map((step) => {
            const subPath = step.WrappedComponent ? step.WrappedComponent.name : step.name;
            return {
                path: `/engangsstonad/${subPath.toLowerCase()}`,
                component: step
            };
        })
    }
];

export default routeConfig;
