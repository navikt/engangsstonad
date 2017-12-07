import { withRouter } from 'react-router-dom';

const getModulesFromContext = (context) => {
    const modules = [];
    context.keys().forEach((ref) => {
        const defaultExport = context(ref).default;
        if (defaultExport.WrappedComponent) {
            return modules.push(withRouter(defaultExport));
        }
        return modules.push(defaultExport);
    });
    return modules;
};

export default getModulesFromContext;
