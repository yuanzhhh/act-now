interface ServerOptions {
    env: 'development' | 'production';
    entryPath: string | undefined;
}
declare const _default: ({ env, entryPath }: ServerOptions) => Promise<void>;
export default _default;
