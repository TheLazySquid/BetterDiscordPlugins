import { Modal, modalContainerClass } from "$shared/modules";

export default function DynamicModal(props: any) {
    // Make the modal scale with the content
    BdApi.React.useEffect(() => {
        BdApi.DOM.addStyle("modal-size-override", `.${modalContainerClass} {
            max-width: max-content !important;
        }
            
        .${modalContainerClass} footer button {
            flex: 0 !important;
        }
            
        .${modalContainerClass} [data-justify=start] {
            justify-content: flex-end;
        }`);
        return () => BdApi.DOM.removeStyle("modal-size-override");
    }, []);

    return (
        <Modal {...props}>
            {props.children}
        </Modal>
    )
}