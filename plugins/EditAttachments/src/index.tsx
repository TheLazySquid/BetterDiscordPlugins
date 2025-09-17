import "./styles.css";
import { after } from "$shared/api/patching";
import { AttachmentButtons, AttachmentButton, ModalSystem, Modal, AttachmentSystem } from "$shared/modules";
import EditorElement from "./editorElement";
import { FilePen } from "lucide-react";
import Editor from "./editor";
import { error } from "$shared/api/toast";

Editor.init();

after(AttachmentButtons, "Z", ({ args, returnVal }) => {
    const editButton = BdApi.React.createElement(AttachmentButton, {
        tooltip: "Edit Attachment",
        onClick: () => {
            const { channelId, draftType, upload } = args[0];

            const onConfirm = (blob: Blob | null) => {
                ModalSystem.close(id);

                if(!blob) {
                    error("Failed to save image.");
                    return;
                }

                AttachmentSystem.remove(channelId, upload.id, draftType);

                // Create the new file
                const name = upload.item.file.name;
                const newName = name.slice(0, name.lastIndexOf(".")) + ".png";
                const newFile = new File([blob], newName, { type: "image/png" });

                // Attach it
                AttachmentSystem.addFile({
                    file: {
                        file: newFile,
                        isThumbnail: upload.item.isThumbnail,
                        origin: upload.item.origin,
                        platform: upload.item.platform
                    },
                    channelId,
                    draftType,
                    showLargeMessageDialog: false
                });
            }

            const file = args[0].upload.item.file;

            // This will be revoked by the Editor
            const url = URL.createObjectURL(file);

            let id = ModalSystem.open((props: any) => (
                <Modal.Root size="dynamic" {...props}>
                    <Modal.Content>
                        <EditorElement
                            url={url}
                            onCancel={() => ModalSystem.close(id)}    
                            onConfirm={onConfirm}    
                        />
                    </Modal.Content>
                </Modal.Root>
            ), {
                onCloseRequest: () => false
            });
        }
    }, BdApi.React.createElement(FilePen));
    
    returnVal.props.actions.props.children.splice(1, 0, editButton);
});