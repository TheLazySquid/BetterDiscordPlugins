export function useUnlockFocus() {
    BdApi.React.useEffect(() => {
        const ignore = (e: FocusEvent) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }

        window.addEventListener("focusin", ignore, { capture: true });
        window.addEventListener("focusout", ignore, { capture: true });

        return () => {
            window.removeEventListener("focusin", ignore, { capture: true });
            window.removeEventListener("focusout", ignore, { capture: true });
        }
    }, []);
}