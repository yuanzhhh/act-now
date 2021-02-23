interface ConfigOptions {
    env: 'development' | 'production';
    entryPath: string | undefined;
}
declare const _default: ({ env, entryPath }: ConfigOptions) => Promise<{
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
    cache: {
        type: string;
        buildDependencies: {
            config: string[];
        };
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
            '@': any;
            'react-dom'?: string;
        };
        modules: any[];
    };
    module: {
        strictExportPresence: boolean;
        rules: {
            oneOf: ({
                test: RegExp[];
                use: ({
                    loader: string;
                    options: {
                        workers: any;
                        workerParallelJobs: number;
                        workerNodeArgs: string[];
                        poolRespawn: boolean;
                        poolTimeout: number;
                        poolParallelJobs: number;
                        name: string;
                    };
                } | {
                    loader: string;
                    options: {
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
                } | {
                    loader: string;
                    options: {
                        transpileOnly: boolean;
                        happyPackMode: boolean;
                        ignoreDiagnostics: never[];
                    };
                })[];
                include: any;
                exclude: any;
                type?: undefined;
            } | {
                test: RegExp[];
                use: {
                    loader: string;
                    options: {
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
}>;
export default _default;
