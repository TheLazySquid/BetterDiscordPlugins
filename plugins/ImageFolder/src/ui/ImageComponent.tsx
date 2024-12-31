const React = BdApi.React;

import { pathToSrc } from '../imageLoading';
import { sendProcessedImage, sendRawImage } from '../uploader';
import AddCaption from './AddCaption';
// @ts-ignore
import TrashCanOutline from '$assets/trash-can-outline.svg';
import { setLastUsed } from '../saveInfo';
import { settings } from '../settings';

const fs = require('fs');
const { join } = require('path');

function imageComponent({ name, path, updateFolder }: { name: string, path: string, updateFolder: () => void }) {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const [ src, setSrc ] = React.useState<string>('');
    
    let observer = new IntersectionObserver((entries) => {
        if(src != "") return;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // get the base64 src
                pathToSrc(join(path, name)).then((src) => {
                    setSrc(src);
                });
            }
        });
    })

    // when the image is loaded, add it to the observer
    React.useEffect(() => {
        if (imgRef.current) observer.observe(imgRef.current);
        return () => {
            if (imgRef.current) observer.unobserve(imgRef.current);
        }
    }, [imgRef.current]);

    function sendImage() {
        if(!src) return;

        setLastUsed(join(path, name));

        // don't rerender gifs
        if(settings.rerender && !name.endsWith('.gif')) {
            sendProcessedImage(name, src);
        } else {
            sendRawImage(name, path);
        }
    }

    function renameImage() {
        let fileName = ''
        let parts = name.split('.');
        let ext = parts.pop();
        let startName = parts.join('.');

        BdApi.UI.showConfirmationModal(`Rename ${startName}`, (
            <div className='if-nameWrap'>
                <input className='if-nameInput' onChange={(e) => fileName = e.target.value} spellCheck={false}
                placeholder='Folder Name'></input>
            </div>
        ), {
            confirmText: 'Rename',
            onConfirm: () => {
                fs.rename(join(__dirname, 'imageFolder', path, name),
                join(__dirname, 'imageFolder', path, fileName + '.' + ext), {}, (err: any) => {
                    if (err) {
                        BdApi.UI.showToast('Failed to rename image', { type: 'error' });
                        return;
                    }
                    BdApi.UI.showToast('Successfully renamed image', { type: 'success' });

                    // Reload folder
                    updateFolder();
                });
            }
        })
    }

    function deleteImage(e: any) {
        e.stopPropagation();
        BdApi.UI.showConfirmationModal('Delete Image', `Are you sure you want to delete ${name}?`, {
            danger: true,
            confirmText: 'Delete',
            onConfirm: () => {
                fs.unlinkSync(join(__dirname, 'imageFolder', path, name))
                BdApi.UI.showToast('Successfully deleted image', { type: 'success' });

                // Reload folder
                updateFolder();
            }
        });
    }

    function openContextMenu(e: React.MouseEvent) {
        if(!src) return;

        let menu = BdApi.ContextMenu.buildMenu([{
            type: "text",
            label: "Rename",
            onClick: renameImage
        }, {
            type: "text",
            label: "Delete",
            onClick: deleteImage
        }, {
            type: "submenu",
            label: "Send",
            items: [{
                type: "text",
                label: "Send Re-rendered",
                onClick: () => sendProcessedImage(name, src)
            }, {
                type: "text",
                label: "Send Raw",
                onClick: () => sendRawImage(name, path)
            }, {
                type: "text",
                label: "Send with Caption",
                onClick: () => {
                    let submitCallback: () => void;
                    BdApi.UI.showConfirmationModal("Add caption", BdApi.React.createElement(AddCaption, {
                        name,
                        src,
                        // this is scuffed but I don't care
                        onSubmit: (cb: () => void) => submitCallback = cb
                    }) as any, {
                        onConfirm: () => submitCallback()
                    })
                }
            }],
            onClick: sendImage
        }])

        BdApi.ContextMenu.open(e, menu);
    }

    return (
        <div className='image'>
            <div className="icon" onClick={(e) => deleteImage(e)}
            dangerouslySetInnerHTML={{__html: TrashCanOutline}}>
            </div>
            <img onClick={sendImage} ref={imgRef} src={src} onContextMenu={openContextMenu}
            style={{ height: src ? '' : '50%' }} />
        </div>
    )
}

export default imageComponent;