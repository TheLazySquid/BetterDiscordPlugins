import rl from 'node:readline';

export function write(str: string) {
    process.stdout.write(str);
}

export default function waitForEnter(callback: () => void) {
    rl.emitKeypressEvents(process.stdin);
    
    if(process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }
    
    console.log("Press Ctrl+C to exit");
    callback();
    
    process.stdin.on('keypress', async (_, key) => {
        if(key.ctrl && key.name === 'c') {
            if(process.stdin.isTTY) process.stdin.setRawMode(false);
            process.exit(0);
        } else if(key.name === 'return') {
            // build the plugin
            callback();
        }
    })
}