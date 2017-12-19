import ErrorPage from './../../components/error';
import EngangsstonadIndex from './../../components/engangsstonad/Engangsstonad.index';
import Counter from './../../components/counter/index';
import engangsstonadSteps from './../../components/engangsstonad/steps';

const defaultRouteConfig = [
    {
        path: '/counter',
        component: Counter,
        exact: true
    },
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
    { component: ErrorPage }
];

export default defaultRouteConfig;
