import type { Folder } from "../types";
import Manager from "../manager";
import FolderOpen from "$assets/folder-open.svg";

export default function FolderDisplay({ folder, onClick }: { folder: Folder, onClick: () => void }) {
	const React = BdApi.React;

    const onContextMenu = (e: React.MouseEvent) => {
		BdApi.ContextMenu.open(e, BdApi.ContextMenu.buildMenu([
			{
				type: "text",
				label: "Rename",
				onClick: () => Manager.renameFolder(folder)
			},
			{
				type: "text",
				label: "Delete",
				onClick: () => {
					BdApi.UI.showConfirmationModal("Deletion confirmation", `Are you sure you want to delete ${folder.name}?`, {
						danger: true,
						confirmText: "Confirm",
						onConfirm() {
							Manager.deleteFolder(folder);
						}
					});
				}
			}
		]));
	}
	
	const [canDrop, setCanDrop] = React.useState(false);
	const dragEnterCount = React.useRef(0);

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	}

	const onDragEnter = () => {
		dragEnterCount.current++;
		console.log("Can drop")
		setCanDrop(true);
	}

	const onDragLeave = () => {
		dragEnterCount.current--;
		setCanDrop(dragEnterCount.current > 0);
	}

	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		dragEnterCount.current = 0;
		setCanDrop(false);
		if(!e.dataTransfer.files) return;

		Manager.addFileList(e.dataTransfer.files, folder.name);
	}

    return (<button className={`if-folder ${canDrop ? "highlighted" : ""}`} onDrop={onDrop}
	onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave}
    onContextMenu={onContextMenu} onClick={onClick}>
        <div className="if-svg-wrap" dangerouslySetInnerHTML={{ __html: FolderOpen }}></div>
        {folder.name}
    </button>)
}