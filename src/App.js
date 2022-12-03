import React, { useState, useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import PokemonCard from "./components/PokemonCard";
import styled from "styled-components";
import "./App.css";
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
	const [team, setTeam] = useState([]);

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

	function onPokemonSelect(pokemon) {
    setTeam((team) => [...team, pokemon]);
    console.log("team -> {}" , team)
	}

	return (
		<AppContainer className="App">
			<StyledHeader className="App-header">
				<Title>Pokemon Team Builder</Title>
			</StyledHeader>
			<CardWrapper>
				{loaded &&
					data.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							pokemon={pokemon}
							onPokemonSelect={onPokemonSelect}
						></PokemonCard>
					))}
			</CardWrapper>
			<div>
				{team.map((pokemon) => (
					<div>{pokemon}</div>
				))}
			</div>
			<StyledFooter>
				<TeamButton onClick={() => handleClick(previous)}>
					Previous
				</TeamButton>
				<TeamButton onClick={() => handleClick(next)}>Next</TeamButton>
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #3d7dca;
	box-shadow: 0px 3px 5px gray;
	min-height: 10vh;
	width: inherit;
	margin: auto;
`;
const StyledFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #3d7dca;
	min-height: 10vh;
	width: inherit;
`;

const TeamButton = styled.button`
	margin: 5px;
	background-color: #3d7dca;
	border-radius: 4px;
	border: none;
	padding: 5px;
	color: #fffbfe;
	&:hover {
		background-color: #729ed4;
	}
`;

const AppContainer = styled.div`
	background-color: #fffbfe;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	font-family: "pokefont";
	font-size: 64px;
	color: #ffcb05;
	-webkit-text-stroke: 1px black;
`;

export default App;
