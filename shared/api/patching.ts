import { Api, onStart, onStop } from "$shared/bd";

interface BeforeArgs {
    thisVal: any;
    args: IArguments;
}

interface AfterArgs extends BeforeArgs {
    returnVal: any;
}

export function after<T = any>(module: T, key: keyof T, callback: (args: AfterArgs) => any) {
    onStart(() => {
        Api.Patcher.after(module, key, (thisVal, args, returnVal) => {
            return callback({ thisVal, args: args as any, returnVal });
        });
    });
}

export function tempAfter<T = any>(module: T, key: keyof T, callback: (args: AfterArgs) => any) {
    let unpatch = Api.Patcher.after(module, key, (thisVal, args, returnVal) => {
        unpatch();
        return callback({ thisVal, args: args as any, returnVal });
    });
}

export function before<T = any>(module: T, key: keyof T, callback: (args: BeforeArgs) => void) {
    onStart(() => {
        Api.Patcher.before(module, key, (thisVal, args) => {
            callback({ thisVal, args: args as any });
        });
    });
}

export function instead<T = any>(module: T, key: keyof T, callback: (args: BeforeArgs) => void) {
    onStart(() => {
        Api.Patcher.instead(module, key, (thisVal, args) => {
            callback({ thisVal, args: args as any });
        });
    });
}

onStop(() => {
    Api.Patcher.unpatchAll();
});