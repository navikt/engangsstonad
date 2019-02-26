export enum ToggleValue {
    ON = 'on',
    OFF = 'off'
}

export const storageFeatureIsActive = () => {
    return (window as any).FEATURE_STORAGE === ToggleValue.ON;
};

export const uke22FeatureIsActive = () => {
    return (window as any).FEATURE_UKE22 === ToggleValue.ON;
};
