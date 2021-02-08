declare const MiniCssExtractPlugin: any;
declare const __PROD__: any;
declare const plugins: string[];
declare const lessUse: ({
    loader: string;
    options: {
        importLoaders: number;
        postcssOptions?: undefined;
    };
} | {
    loader: string;
    options: {
        postcssOptions: {
            plugins: string[];
        };
        importLoaders?: undefined;
    };
} | {
    loader: string;
    options?: undefined;
})[];
declare const less: {
    test: RegExp;
    use: any[];
};
declare const css: {
    test: RegExp;
    use: any[];
};
