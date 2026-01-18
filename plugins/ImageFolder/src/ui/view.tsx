import type { DirContents } from "../types";
import Manager from "../manager";
import MediaDisplay from "./mediaDisplay";
import FolderDisplay from "./folderDisplay";
import { LucideIcon } from "$shared/ui/icons";
import { FilePlus, FolderOutput, FolderPlus, FolderTree, Search } from "lucide";

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
	
	React.useEffect(() => {
		Manager.read(dir, setContents);
	}, [dir]);

	const [canDrop, setCanDrop] = React.useState(false);
	const dragEnterCount = React.useRef(0);

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	}

	const onDragEnter = () => {
		dragEnterCount.current++;
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

		Manager.addFileList(e.dataTransfer.files);
	}

	const [searching, setSearching] = React.useState(false);
	const [searchText, setSearchText] = React.useState("");
	const [showContents, setShowContents] = React.useState<DirContents>({ folders: [], media: [] });

	React.useEffect(() => {
		if(searching) {
			const searched = searchText.trim().toLowerCase();
	
			setShowContents({
				folders: contents.folders.filter(f => f.name.toLowerCase().includes(searched)),
				media: contents.media.filter(m => m.name.toLowerCase().includes(searched))
			});
		} else {
			setShowContents({ folders: contents.folders, media: contents.media });
		}
	}, [searching, searchText, contents]);

	// Clear search when the folder changes
	React.useEffect(() => {
		setSearching(false);
		setSearchText("");
	}, [dir]);

	// Clear search when pressing escape
	const searchKeyDown = (e: React.KeyboardEvent) => {
		e.stopPropagation();
		if(e.code === "Escape") {
			setSearching(false);
			setSearchText("");
		}
	}

	React.useEffect(() => {
		// Close search when clicking outside, and open with ctrl+f
		const onClick = () => setSearching(false);
		const onKeyDown = (e: KeyboardEvent) => {
			if(e.ctrlKey && e.key === "f") {
				e.preventDefault();
				e.stopPropagation();
				setSearching(true);
			}
		}

		window.addEventListener("click", onClick);
		window.addEventListener("keydown", onKeyDown, true);
		return () => {
			window.removeEventListener("click", onClick);
			window.removeEventListener("keydown", onKeyDown, true);
		}
	}, []);

	const startSearch = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSearching(true);
	}

	const searchInput = React.useCallback((node: HTMLInputElement) => {
		if(node) node.focus()
	}, []);

	return (<div className="if-view">
		<div className="if-controls">
			<button title="Upload media" onClick={() => Manager.uploadMedia()}>
				<LucideIcon icon={FilePlus} />
			</button>
			<button title="Create folder" onClick={() => Manager.createFolder()}>
				<LucideIcon icon={FolderPlus} />
			</button>
			<div className="if-search">
				<button className="if-search-icon" onClick={startSearch}>
					<LucideIcon icon={Search} />
				</button>
				{searching ?
					<input type="text"
						value={searchText} ref={searchInput}
						onChange={e => setSearchText(e.target.value)}
						onKeyDown={searchKeyDown}
						spellCheck={false} placeholder="Search by filename"
					/>
				: null}
			</div>
			<button title="Reveal in file manager" onClick={() => Manager.showFolder()}>
				<LucideIcon icon={FolderTree} />
			</button>
		</div>
		{dir !== "" ? <div className="if-path">
			<button className="if-back" onClick={() => moveBack()}>
				<LucideIcon icon={FolderOutput} />
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
				{showContents.folders.map((folder) => (<FolderDisplay folder={folder}
					onClick={() => navigate(folder.name)} key={dir + "/" + folder.name} />))}
			</div>
			<div className={`if-media-list ${canDrop ? "highlighted" : ""}`} onDrop={onDrop}
			onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave}>
				{showContents.media.length === 0 && searchText === "" ? <div className="if-no-media">
					There isn't any media in this folder! Use the button at the top left or drag and drop to upload some.
				</div> : null}
				{showContents.media.length === 0 && showContents.folders.length === 0 && searchText !== "" ? <div className="if-no-media">
					No results found for "{searchText}"
				</div> : null}
				{showContents.media.map((media) => (<div className="if-media" key={dir + "/" + media.name}>
					<MediaDisplay media={media} />
				</div>))}
			</div>
		</div>
	</div>);
}