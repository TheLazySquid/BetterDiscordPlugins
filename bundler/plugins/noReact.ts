import type { Plugin } from "esbuild";

const reactExports = [
    "Children",
    "Component",
    "Fragment",
    "Profiler",
    "PureComponent",
    "StrictMode",
    "Suspense",
    "act",
    "cache",
    "cloneElement",
    "createContext",
    "createElement",
    "createRef",
    "forwardRef",
    "isValidElement",
    "lazy",
    "memo",
    "startTransition",
    "use",
    "useActionState",
    "useCallback",
    "useContext",
    "useDebugValue",
    "useDeferredValue",
    "useEffect",
    "useId",
    "useImperativeHandle",
    "useInsertionEffect",
    "useLayoutEffect",
    "useMemo",
    "useOptimistic",
    "useReducer",
    "useRef",
    "useState",
    "useSyncExternalStore",
    "useTransition",
    "version"
]

export function noReactPlugin(): Plugin {
    return {
        name: "meta",
        setup(build) {
            build.onResolve({ filter: /^react$/ }, args => ({
                path: args.path,
                namespace: "react-ns"
            }));

            build.onLoad({ filter: /.*/, namespace: "react-ns" }, () => ({
                contents: `export default BdApi.React;\n` +
                `export const {${reactExports.join(",")}} = BdApi.React;`,
                loader: "js"
            }));
        }
    }
}