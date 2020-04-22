const BEMHelper = (cls: string) => ({
    className: cls,
    element: (p?: string) => `${cls}__${p}`,
    modifier: (p?: string) => `${cls}--${p}`,
    child: (c: string) => BEMHelper(BEMHelper(cls).element(c)),
});

export default BEMHelper;
