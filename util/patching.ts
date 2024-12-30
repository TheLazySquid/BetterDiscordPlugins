import { onStop } from "./bdFuncs.ts";

type PatchAfterCallback<ReturnValue> = (thisObject: any, args: any[], returnValue: any) => ReturnValue

// say that five times fast
interface IPatchPathPart {
    path?: (string | number)[]
    customPath?: { finalProp: string, run: (object: any) => any | any[] }
    validate?: PatchAfterCallback<boolean>
}

/**
 * Recursively patches a module, running a callback after the innermost patch is called.
 * Automatically disposes of the patch when the plugin is stopped.
 * @param module The module to patch
 * @param callback The callback to run to modify the return value of the innermost patched
 * @param path A list of lists of properties to patch, in order
 * @returns A function to dispose of the patch
 */
export function chainPatch(module: any, callback: PatchAfterCallback<any>, ...path: IPatchPathPart[]) {
    let patchedFns: ((...args: any[]) => any)[] = []
    let disposeFns: (() => void)[] = []
    
    patch(module, 0)
    
    function patch(object: any, depth: number) {
        // the variable names here are a mess
        let pathPart = path[depth];

        let toPatchArray: any[] = [];
        let patchProp: string | number;

        if(pathPart.path) {
            patchProp = pathPart.path[pathPart.path.length - 1];
            
            let toPatch = object;
            for(let i = 0; i < pathPart.path.length - 1; i++) {
                let prop = pathPart.path[i];
                toPatch = toPatch[prop];
            }

            toPatchArray.push(toPatch);
        } else if(pathPart.customPath) {
            patchProp = pathPart.customPath.finalProp;

            let customPath = pathPart.customPath.run(object);
            if(Array.isArray(customPath)) {
                toPatchArray.push(...customPath);
            } else {
                toPatchArray.push(customPath);
            }
        }

        if(toPatchArray.length === 0) return;

        // patch the function
        if(!patchedFns[depth]) {
            let nativeFn = toPatchArray[0][patchProp!];
            patchedFns[depth] = function(...args: any[]) {
                let returnVal = nativeFn.call(this, ...args);

                if(pathPart.validate && !pathPart.validate(this, args, returnVal)) {
                    return returnVal;
                }

                if(path.length > depth + 1) {
                    patch(returnVal, depth + 1);
                } else {
                    callback(this, args, returnVal)
                }

                return returnVal;
            }

            // add a dispose function
            disposeFns[depth] = () => {
                for(let item of toPatchArray) {
                    item[patchProp] = nativeFn;
                }
            }
        }

        // apply patches
        for(let item of toPatchArray) {
            item[patchProp!] = patchedFns[depth];
        }
    }

    const dispose = () => {
        for(let dispose of disposeFns) {
            dispose();
        }
    }

    onStop(dispose)
    return dispose;
}