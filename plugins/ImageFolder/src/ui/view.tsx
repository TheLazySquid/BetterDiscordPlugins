import FolderOpen from "$assets/folder-open.svg";
import FolderBack from "$assets/folder-back.svg";
import FolderTree from "$assets/folder-tree.svg";
import FolderPlus from "$assets/folder-plus-outline.svg";
import FilePlus from "$assets/file-plus.svg";

import Manager from "../manager";
import type { DirContents, Folder } from "../types";
import MediaDisplay from "./mediaDisplay";

export default function View() {
	const React = BdApi.React;
	const [dir, setDir] = React.useState<string>(Manager.dir);
	const [contents, setContents] = React.useState<DirContents>({ folders: [], media: [] });

	const clear = () => setContents({ folders: [], media: [] });

	const navigate = (subdir: string) => {
		clear();
		if(dir === "") setDir(subdir);
		else setDir(dir + "/" + subdir);
	}

	const moveBack = () => {
		clear();
		setDir(dir.split("/").slice(0, -1).join("/"));
	}

	const setDepth = (depth: number) => {
		clear();
		setDir(dir.split("/").slice(0, depth + 1).join("/"));
	}
	
	const folderContextMenu = (e: React.MouseEvent, folder: Folder) => {
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
	
	React.useEffect(() => {
		Manager.read(dir, setContents);
	}, [dir]);

	return (<div className="if-view">
		<div className="if-controls">
			<button title="Upload media" onClick={() => Manager.uploadMedia()}>
				<div className="if-svg-wrap" dangerouslySetInnerHTML={{ __html: FilePlus }}></div>
			</button>
			<button title="Create folder" onClick={() => Manager.createFolder()}>
				<div className="if-svg-wrap" dangerouslySetInnerHTML={{ __html: FolderPlus }}></div>
			</button>
			<div style={{ flexGrow: 1 }}></div>
			<button title="Reveal in file manager" onClick={() => Manager.showFolder()}>
				<div className="if-svg-wrap" dangerouslySetInnerHTML={{ __html: FolderTree }}></div>
			</button>
		</div>
		{dir !== "" ? <div className="if-path">
			<button className="if-back" onClick={() => moveBack()}>
				<div className="if-svg-wrap" dangerouslySetInnerHTML={{ __html: FolderBack }}></div>
			</button>
			<button onClick={() => {clear(); setDir("")}}>/</button>
			{dir.split("/").map((subdir, i, arr) => (<>
				<button onClick={() => setDepth(i)}>
					{subdir}
				</button>
				{i !== arr.length - 1 ? <button onClick={() => setDepth(i)}>
					/
				</button> : null}
			</>))}
		</div> : null}
		<div className="if-content">
			<div className="if-folder-list">
				{contents.folders.map((folder) => (<button className="if-folder"
				onContextMenu={(e) => folderContextMenu(e, folder)}
				onClick={() => navigate(folder.name)} key={dir + "/" + folder.name}>
					<div className="if-svg-wrap" dangerouslySetInnerHTML={{ __html: FolderOpen }}></div>
					{folder.name}
				</button>))}
			</div>
			<div className="if-media-list">
				{contents.media.length === 0 ? <div className="if-no-media">
					There isn't any media in this folder! Use the button at the top left to upload some.
				</div> : null}
				{contents.media.map((media) => (<div className="if-media" key={dir + "/" + media.name}>
					<MediaDisplay media={media} />
				</div>))}
			</div>
		</div>
	</div>);
}