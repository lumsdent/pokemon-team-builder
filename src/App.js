import "./App.css";
import React, { useState, useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
const options = {
	protocol: "https",
	versionPath: "/api/v2/",
	timeout: 5 * 1000,
};
const P = new Pokedex(options);

function App() {
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let ignore = false;
		let pokemon = [];
		const loadData = async () => {
			try {
				pokemon = await P.getPokemonsList();
			} catch (error) {
				throw error;
			}
			setData(pokemon.results);
			setLoaded(true);
		};

		if (!ignore) {
			loadData();
		}

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{loaded && data.map((pokemon) => <h2>{pokemon.name}</h2>)}
			</header>
		</div>
	);
}

export default App;
