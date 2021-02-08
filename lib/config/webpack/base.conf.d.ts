import webpack from 'webpack';
declare const awd: {
    resolve: {
        extensions: string[];
        alias: {
            "@": any;
        };
        modules: any[];
    };
    module: {
        rules: any;
    };
    plugins: (webpack.IgnorePlugin | webpack.DefinePlugin)[];
};
export default awd;
