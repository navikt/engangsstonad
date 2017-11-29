import EngangsstonadIndex from './../../components/engangsstonad/EngangsstonadIndex';
import Step1 from './../../components/engangsstonad/Step1';
import Step2 from './../../components/engangsstonad/Step2';
import Step3 from './../../components/engangsstonad/Step3';
import Step4 from './../../components/engangsstonad/Step4';

const routeConfig = [
    {
        path: '/',
        component: EngangsstonadIndex,
        exact: true
    },
    {
        path: '/engangsstonad',
        component: EngangsstonadIndex,
        routes: [
            { path: '/engangsstonad/steg-1', component: Step1 },
            { path: '/engangsstonad/steg-2', component: Step2 },
            { path: '/engangsstonad/steg-3', component: Step3 },
            { path: '/engangsstonad/steg-4', component: Step4 }
        ]
    }
];

export default routeConfig;
