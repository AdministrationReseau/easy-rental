import React from "react";
import { Search, Notifications, AccountCircle, Settings } from "@mui/icons-material";

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center gap-2">
                <Search className="text-gray-600" />
                <input
                    type="text"
                    placeholder="Search something here..."
                    className="border-none outline-none bg-gray-100 rounded-lg p-2"
                />
            </div>
            <div className="flex items-center gap-4">
                <Notifications className="text-gray-600 hover:text-blue-500" />
                <Settings className="text-gray-600 hover:text-blue-500" />
                <AccountCircle className="text-gray-600 hover:text-blue-500" />
            </div>
        </header>
    );
};

export default Header;
