import "./styles.css";
import { onStart, onStop, setSettingsPanel } from "$shared/bd";
import Snippets from "./ui/Snippets";
import { loadSnippets, unloadSnippets } from "./snippets";

setSettingsPanel(() => BdApi.React.createElement(Snippets));

onStart(() => loadSnippets());
onStop(() => unloadSnippets());