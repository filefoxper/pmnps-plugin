export type Plugin = string | [string] | [string, Record<string, any>];

export type PackageJson = {
    name: string;
    scripts?: Record<string, string>;
    version?: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
};

export type PmnpsConfig = {
    platDependencies?: string[];
    ownRoot?: boolean;
    alias?: string;
    buildHook?: { before?: string; after?: string };
};

export type PlatPackageJson = PackageJson & {
    pmnps?: PmnpsConfig;
};

export type Project = {
    packagePath: string;
    platformPath: string;
    packageJsons: () => Promise<{
        root: PackageJson;
        packages: PackageJson[];
        platforms: PlatPackageJson[];
    }>;
};

export type Tools = {
    message: {
        info: (content: string) => void;
        log: (content: string) => void;
        warn: (content: string) => void;
        error: (content: string) => void;
        success: (content: string) => void;
        desc: (content: string) => void;
    };
};

export type Actions = 'refresh';

export type ActionHook = {
    before?: () => Promise<boolean>;
    after?: () => Promise<boolean>;
};

export type PluginResult = {
    [key in Actions]?:ActionHook;
};

export type PluginCallBack = (project: Project, tools: Tools) => PluginResult;
