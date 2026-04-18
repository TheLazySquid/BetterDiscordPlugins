import { categoryOrder, fetchSnippets, type Snippet } from "../fetch";
import { enabledSnippets } from "../snippets";
import SnippetCard from "./SnippetCard";

interface Category {
    name: string;
    snippets: Snippet[];
}

const filters = [
    { label: "All", value: "all" },
    { label: "Enabled", value: "enabled" },
    { label: "Disabled", value: "disabled" }
]

export default function Snippets() {
    const React = BdApi.React;
    const [snippets, setSnippets] = React.useState<Snippet[]>([]);
    const [search, setSearch] = React.useState("");
    const [filter, setFilter] = React.useState("all");
    const input = React.useRef<HTMLInputElement>(null);

    const categories = React.useMemo(() => {
        const searched = search.toLowerCase();
        const categoriesMap: Record<string, Category> = {};

        for(const snippet of snippets) {
            if(!snippet.name.toLowerCase().includes(searched)) continue;
            if(filter === "enabled" && !enabledSnippets[snippet.name]) continue;
            if(filter === "disabled" && enabledSnippets[snippet.name]) continue;

            categoriesMap[snippet.category] ??= { name: snippet.category, snippets: [] };
            categoriesMap[snippet.category].snippets.push(snippet);
        }

        const order = [...categoryOrder];
        
        for(const snippet of snippets) {
            if(order.includes(snippet.category)) continue;
            order.push(snippet.category);
        }

        const categories: Category[] = [];  
        for(const category of order) {
            if(categoriesMap[category]) {
                categories.push(categoriesMap[category]);
            }
        }

        return categories;
    }, [snippets, search, filter]);

    React.useEffect(() => {
        fetchSnippets().then(({ snippets }) => setSnippets(snippets));
    }, []);

    React.useEffect(() => {
        input.current?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if(e.key === "f" && e.ctrlKey) {
                e.preventDefault();
                input.current?.focus();
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div>
            <div className="sr-search">
                <div>Search:</div>
                <input className="sr-search-input" placeholder="Search snippets" value={search}
                    onChange={e => setSearch(e.currentTarget.value)} ref={input} />
                <BdApi.Components.DropdownInput options={filters} value={filter} onChange={setFilter} />
            </div>
            {categories.length === 0 && (
                <div className="sr-no-results">
                    No snippets match your search
                </div>
            )}
            {categories.map(category => (
                <>
                    <h2 className="sr-category-header">{category.name}</h2>
                    <div className="sr-snippets">
                        {category.snippets.map(snippet => (
                            <SnippetCard key={snippet.name} snippet={snippet} />
                        ))}
                    </div>
                </>
            ))}
        </div>
    )
}