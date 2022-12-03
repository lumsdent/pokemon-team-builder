import React, { useState, useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import TeamPokemonCard from "./TeamPokemonCard";
import styled from "styled-components";
import "../App.css";
import { Outlet } from "react-router-dom";

const options = {
	protocol: "https",
	versionPath: "/api/v2/",
	timeout: 5 * 1000,
};
const P = new Pokedex(options);

function Layout() {
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

	function removePokemonFromTeam(pokemon) {
		const newTeam = team.filter((teamer) => teamer.id !== pokemon.id);
		setTeam([...newTeam]);
	}
	return (
		<AppContainer className="App">
			<StyledHeader className="App-header">
				<Title>Pokemon Team Builder</Title>
			</StyledHeader>
			<StyledSection>
				<Outlet
					context={{
						loaded: [loaded, setLoaded],
						data: [data, setData],
						team: [team, setTeam],
						next: [next, setNext],
						previous: [previous, setPrevious],
					}}
				></Outlet>
				<TeamWrapper>
					<Title className="small">PokeTeam</Title>
					{team.map((pokemon) => (
						<TeamPokemonCard
							key={"Teamer_".concat(pokemon.id)}
							pokemon={pokemon}
							removePokemonFromTeam={removePokemonFromTeam}
						></TeamPokemonCard>
					))}
				</TeamWrapper>
			</StyledSection>
			<StyledFooter>
				<TeamButton onClick={() => handleClick(previous)}>
					Previous
				</TeamButton>
				<TeamButton onClick={() => handleClick(next)}>Next</TeamButton>
			</StyledFooter>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	background-color: #fffbfe;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
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

const StyledSection = styled.section`
	display: flex;
`;

const TeamWrapper = styled.div`
	width: 30vw;
	background-color: #003a70;
	display: flex;
	flex-direction: column;
	align-items: center;
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

const Title = styled.h1`
	font-family: "pokefont";
	font-size: 64px;
	color: #ffcb05;
	-webkit-text-stroke: 1px black;
	&.small {
		font-size: 36px;
		margin: 15px;
	}
`;

export default Layout;
