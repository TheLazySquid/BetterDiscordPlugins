import { LucideIcon } from "$shared/ui/icons";
import { Check, ChevronDown, ChevronUp } from "lucide";
import { setSnippetEnabled, getSnippetEnabled } from "../snippets";
import { baseUrl, type Snippet } from "../fetch";

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
    const React = BdApi.React;
    const [enabled, setEnabled] = React.useState(getSnippetEnabled(snippet.name));
    const [expanded, setExpanded] = React.useState(false);
    
    // Save enabled whenever it changes
    const firstLoad = React.useRef(true);
    React.useEffect(() => {
        if(firstLoad.current) {
            firstLoad.current = false;
            return;
        }

        setSnippetEnabled(snippet.name, enabled);
    }, [enabled]);

    return (
        <div className="sr-card">
            <div className="sr-toggle" onClick={() => setEnabled(!enabled)}>
                {snippet.name}
                <div className="sr-checkbox">
                    {enabled && <LucideIcon icon={Check} color="var(--icon-strong)" size={24} />}
                </div>
            </div>
            <div className="sr-author">
                By {snippet.author}
            </div>
            {snippet.preview && (
                <div>
                    {snippet.preview.endsWith(".mp4") ? (
                        <video
                            className="sr-preview"
                            src={`${baseUrl}previews/${snippet.name}/${snippet.preview}`}
                            autoPlay
                            loop
                            muted
                        ></video>
                    ) : (
                        <img
                            className="sr-preview"
                            src={`${baseUrl}previews/${snippet.name}/${snippet.preview}`}
                            alt={`A preview of ${snippet.name}`}
                        />
                    )}
                </div>
            )}
            <div className="sr-description">
                {expanded ? (
                    <>
                        <div>
                            {snippet.description.map((line) => (
                                <p>{line}</p>
                            ))}
                        </div>
                        <div className="sr-arrow" onClick={() => setExpanded(false)}>
                            <LucideIcon icon={ChevronUp} />
                        </div>
                    </>
                ) : (
                    <>
                        <p>{snippet.description[0]}</p>
                        {snippet.description.length > 1 && (
                            <div className="sr-arrow" onClick={() => setExpanded(true)}>
                                <LucideIcon icon={ChevronDown} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}