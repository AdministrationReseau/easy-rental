'use client'

import { useEffect, useState } from "react";
import WbSunnyOutlinedIcon  from '@mui/icons-material/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';

const ThemeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			setIsDarkMode(true);
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}, []);
	
	// changing the navigation theme
	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
		if (!isDarkMode) {
			document.body.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.body.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};
	
	return (
		<div
			onClick={toggleTheme}
			className={`relative cursor-pointer w-[73px] h-10 rounded-full flex items-center transition-all duration-300 text-white
				${isDarkMode ? "bg-toggle-blue-background": "bg-toggle-yellow-background"}
			`}
		>
			<div
				className={`
          absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 rounded-full p-1 ml-1
          ${
						isDarkMode ?
						"translate-x-8 bg-toggle-blue" :
						"translate-x-0 bg-toogle-yellow"
					}
        `}
			>
				{!isDarkMode ? <WbSunnyOutlinedIcon /> : <NightsStayOutlinedIcon />}
			</div>
		</div>
	);
};

export default ThemeToggle;
