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
	const [next, setNext] = useState("");
	const [previous, setPrevious] = useState("");

	useEffect(() => {
		let ignore = false;
		let pokemon = [];
		const loadData = async () => {
			pokemon = await P.getPokemonsList({ limit: 20, offset: 0 });
			loadPokemonData(pokemon);
		};

		if (!ignore) {
			loadData();
		}

		return () => {
			ignore = true;
		};
	}, []);

	async function loadPokemonData(pokemon) {
		let pokemonData = [];
		for (let mon of pokemon.results) {
			let data = await P.getResource(mon.url);
			console.log(data);
			pokemonData.push(data);
		}
		setData([...pokemonData]);
		setNext(pokemon.next);
		setPrevious(pokemon.previous);
		setLoaded(true);
	}

	async function handleClick(url) {
		setLoaded(false);
		let pokemon = await P.getResource(url);
		loadPokemonData(pokemon);
		window.scrollTo(0, 0);
	}

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={() => handleClick(previous)}>Previous</button>
        <button onClick={() => handleClick(next)}>Next</button>
        <br></br>
				{loaded &&
					data.map((pokemon, index) => (
						<>
							<img
								key={index}
								src={pokemon.sprites.front_default}
								alt={pokemon.sprites.front_default}
							></img>
							<h2 key={pokemon.id}>{pokemon.name}</h2>
						</>
					))}
				<p>test</p>
				<button onClick={() => handleClick(previous)}>Previous</button>
				<button onClick={() => handleClick(next)}>Next</button>
			</header>
		</div>
	);
}

export default App;
