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
        <div className="flex items-center w-full rounded-full border border-gray-300 bg-whitish-background px-2 py-2 shadow-sm ">

            {/* Champ de recherche */}
            <input
                type="text"
                className="flex-1 ml-4 bg-transparent outline-none placeholder-gray-500 text-primary-text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
        </div>
    );
};

export default SearchField;
