import EngangsstonadIndex from './../../components/engangsstonad/EngangsstonadIndex';
import Step1 from './../../components/engangsstonad/Step1';
import Step2 from './../../components/engangsstonad/Step2';

const routeConfig = [{
    path: '/',
    component: EngangsstonadIndex,
    exact: true
}, {
    path: '/engangsstonad',
    component: EngangsstonadIndex,
    routes: [
        { path: '/engangsstonad/steg-1', component: Step1 },
        { path: '/engangsstonad/steg-2', component: Step2 }
    ]
}];

export default routeConfig;
