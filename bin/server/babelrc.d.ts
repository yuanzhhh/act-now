declare const _default: ({ isDevelopment }: {
    isDevelopment: boolean;
}) => {
    cacheDirectory: boolean;
    babelrc: boolean;
    presets: ((string | {
        targets: {
            browsers: string[];
        };
        modules: boolean;
    })[] | (string | {
        runtime: string;
        development: boolean;
        importSource: string;
    })[])[];
    plugins: (string | false | (string | {
        legacy: boolean;
    })[] | (string | {
        libraryName: string;
        style: string;
    })[] | (string | {
        corejs: boolean;
    })[])[];
};
export default _default;
