import "./input.css";

function Input({ onChange }: { onChange: (value: string) => void }) {
    const React = BdApi.React;
    const input = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        // setTimeout needed because of course it is
        setTimeout(() => {
            input.current?.focus();
        }, 100);
    }, []);

    return (<input className="lazys-input" placeholder="..."
        onChange={(e) => onChange(e.target.value)} ref={input} />)
}

export function getInput(title: string, callback: (answer: string) => void) {
    let text = "";
    const onChange = (value: string) => text = value;

    BdApi.UI.showConfirmationModal(title, <Input onChange={onChange} />, {
        onConfirm: () => {
            if(text === "") return;
            callback(text);
        }
    });
}