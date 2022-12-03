import React, { useState, useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import PokemonCard from "./components/PokemonCard";
import styled from "styled-components";
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
		<AppContainer className="App">
			<StyledHeader className="App-header">
				<button onClick={() => handleClick(previous)}>Previous</button>
				<button onClick={() => handleClick(next)}>Next</button>
				<br></br>
			</StyledHeader>
			<CardWrapper>
				{loaded &&
					data.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							pokemon={pokemon}
						></PokemonCard>
					))}
			</CardWrapper>
			<StyledFooter>
				<button onClick={() => handleClick(previous)}>Previous</button>
				<button onClick={() => handleClick(next)}>Next</button>
			</StyledFooter>
		</AppContainer>
	);
}

const CardWrapper = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 69vw;
	flex-wrap: wrap;
`;

const StyledHeader = styled.header`
	background-color: #3d7dca;
	min-height: 10vh;
	width: inherit;
`;
const StyledFooter = styled.footer`
	background-color: #3d7dca;
	min-height: 10vh;
	width: inherit;
`;

const AppContainer = styled.div`
	background-color: #fffbfe;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

export default App;
