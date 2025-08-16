export default function demangle(module: Record<string, any>, demangler: Record<string, (mod: any) => boolean>) {
    let returned: Record<string, any> = {};
    let values = Object.values(module);

    for(let id in demangler) {
        for(let i = 0; i < values.length; i++) {
            if(demangler[id](values[i])) {
                returned[id] = values[i];
                break;
            }
        }
    }

    return returned;
}