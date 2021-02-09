interface ConfigOptions {
    env: 'development' | 'production';
}
declare const _default: ({ env }: ConfigOptions) => {
    mode: string;
    devtool: string;
    entry: any;
    output: {
        path: any;
        filename: string;
        chunkFilename: string;
        publicPath: string;
        assetModuleFilename: string | undefined;
    };
    optimization: {
        moduleIds: string;
        splitChunks: {
            chunks: string;
            minSize: number;
            minChunks: number;
            maxAsyncRequests: number;
            maxInitialRequests: number;
            automaticNameDelimiter: string;
            cacheGroups: {
                vendors: {
                    test: RegExp;
                    priority: number;
                };
                default: {
                    minChunks: number;
                    priority: number;
                    reuseExistingChunk: boolean;
                };
            };
        };
        minimize: boolean;
        minimizer: any[];
    };
    resolve: {
        extensions: string[];
        alias: {
            src: any;
            'react-dom'?: string;
        };
        modules: any[];
    };
    module: {
        strictExportPresence: boolean;
        rules: {
            oneOf: ({
                test: RegExp[];
                use: {
                    loader: string;
                    options: any;
                }[];
                include: any;
                exclude: any;
                type?: undefined;
            } | {
                test: RegExp[];
                use: {
                    loader: string;
                    options: any;
                };
                include: any;
                exclude: any;
                type?: undefined;
            } | {
                test: RegExp;
                use: any[];
                include?: undefined;
                exclude?: undefined;
                type?: undefined;
            } | {
                test: RegExp;
                type: string;
                use?: undefined;
                include?: undefined;
                exclude?: undefined;
            })[];
        }[];
    };
    plugins: any[];
};
export default _default;
