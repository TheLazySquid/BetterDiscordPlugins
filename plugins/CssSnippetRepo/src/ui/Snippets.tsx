import { categoryOrder, fetchSnippets, type Snippet } from "../fetch";
import SnippetCard from "./SnippetCard";

interface Category {
    name: string;
    snippets: Snippet[];
}

export default function Snippets() {
    const React = BdApi.React;
    const [snippets, setSnippets] = React.useState<Snippet[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const searched = search.toLowerCase();
        const categoriesMap: Record<string, Category> = {};

        for(const snippet of snippets) {
            if(snippet.name.toLowerCase().includes(searched)) {
                categoriesMap[snippet.category] ??= { name: snippet.category, snippets: [] };
                categoriesMap[snippet.category].snippets.push(snippet);
            }
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

        setCategories(categories);
    }, [snippets, search]);

    React.useEffect(() => {
        fetchSnippets().then(setSnippets);
    }, []);

    return (
        <div>
            <div className="sr-search">
                <div>Search:</div>
                <input className="sr-search-input" placeholder="Search snippets" value={search}
                    onChange={e => setSearch(e.currentTarget.value)} />
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