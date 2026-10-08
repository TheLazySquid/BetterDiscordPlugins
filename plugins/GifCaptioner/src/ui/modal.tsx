import { Api } from "$shared/bd";
import type { OnSubmit } from "../render/gifRenderer";
import Captioner from "./captioner";
import SpeechBubbler from "./speechBubbler";

type Tab = "caption" | "speechbubble";
const tabs: { key: Tab, label: string }[] = [
	{ key: "caption", label: "Caption" },
	{ key: "speechbubble", label: "Speech Bubble" }
]

export default function Modal({ width, height, element, onSubmit }:
	{ width: number, height: number, element: HTMLElement, onSubmit: OnSubmit }) {
	const React = BdApi.React;
	const [activeTab, setTab] = React.useState<Tab>(Api.Data.load("tab") || "caption");

	React.useEffect(() => {
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

	return (
		<div className="gc-modal">
			<div className="gc-tabs">
				{tabs.map((tab) => (
					<button key={tab.key} onClick={() => setTab(tab.key)}
						className={activeTab === tab.key ? "active" : ""}>
						{tab.label}
					</button>
				))}
			</div>
			{activeTab === "caption" ?
				<Captioner width={width} element={element} onSubmit={onSubmit} /> :
				<SpeechBubbler width={width} height={height} element={element} onSubmit={onSubmit} />}
		</div>
	)
}