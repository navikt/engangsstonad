const getModulesFromContext = (context) => {
    const modules = [];
    context.keys().forEach((ref) => {
        modules.push(context(ref).default);
    });
    return modules;
};

export default getModulesFromContext;
