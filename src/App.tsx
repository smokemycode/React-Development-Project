import { useTheme } from "./hooks/useTheme";

function App() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div>
			<h1>Rest Countries App</h1>

			<p>Current theme: {theme}</p>

			<button onClick={toggleTheme}>Toggle Theme</button>
		</div>
	);
}

export default App;
