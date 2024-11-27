import React from "react";

interface SearchFieldProps {
    placeholder?: string; // Texte affiché par défaut dans l'input
    onSearch?: (value: string) => void; // Callback pour la recherche
}

const SearchField: React.FC<SearchFieldProps> = ({
                                                     placeholder = "Search something here",
                                                     onSearch,
                                                 }) => {
    const [searchValue, setSearchValue] = React.useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    return (
        <div className="flex items-center w-full max-w-[500px] rounded-full border border-gray-300 bg-whitish-background px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-blue">
            {/* Icône de loupe */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16l-4-4m0 0l4-4m-4 4h16"
                />
            </svg>

            {/* Champ de recherche */}
            <input
                type="text"
                className="flex-1 bg-transparent outline-none placeholder-gray-500 text-primary-text ml-3"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            {/* Icône de filtre */}
            <button
                className="ml-3 text-gray-400 hover:text-primary-blue focus:outline-none"
                onClick={handleSearch}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6h4M6 10h12M8 14h8"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchField;
