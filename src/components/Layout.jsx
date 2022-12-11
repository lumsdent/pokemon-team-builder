import React, { useState, useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import Team from "./Team";
import styled from "styled-components";
import "../App.css";
import { Outlet, Link } from "react-router-dom";
import Filters from "./Filters";
import { PokemonDetail, Pokeobj, Stats } from "../Definitions";

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
		(async () => {
			let pokemon = [];
			pokemon = await P.getPokemonsList({ limit: 20, offset: 0 });
			loadPokemonData(pokemon);
			let allPokemon = await P.getPokemonsList();
			loadPokemonData(allPokemon);
		})();
	}, []);

	async function loadPokemonData(pokemon) {
		let pokemonData = [];
		for (let mon of pokemon.results) {
			let data = await P.getResource(mon.url);
			let pokemon = new PokemonDetail(
				data.id,
				data.name,
				getTypes(data),
				data.sprites.other.dream_world.front_default,
				data.sprites.front_default,
				new Stats(
					data.stats[0].base_stat,
					data.stats[1].base_stat,
					data.stats[2].base_stat,
					data.stats[3].base_stat,
					data.stats[4].base_stat,
					data.stats[5].base_stat
				)
			);
			// console.log(pokemon);
			pokemonData.push(pokemon);
		}
		setData([...pokemonData]);
		setNext(pokemon.next);
		setPrevious(pokemon.previous);
		setLoaded(true);
	}

	function getTypes(data) {
		let types = [];
		data.types.forEach((type) => types.push(type.type.name));
		return types;
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
				<StyledLink to="/">
					<Title>Pokemon Team Builder</Title>
				</StyledLink>
			</StyledHeader>
			<StyledSection>
				<Filters loadPokemonData={loadPokemonData}></Filters>
				<Outlet
					context={{
						loaded: [loaded, setLoaded],
						data: [data, setData],
						team: [team, setTeam],
						next: [next, setNext],
						previous: [previous, setPrevious],
					}}
				></Outlet>
				<Team
					team={team}
					removePokemonFromTeam={removePokemonFromTeam}
				></Team>
			</StyledSection>
			<StyledFooter>
				<StyledButton onClick={() => handleClick(previous)}>
					Previous
				</StyledButton>
				<StyledButton onClick={() => handleClick(next)}>
					Next
				</StyledButton>
			</StyledFooter>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	background-color: #fffbfe;
	display: flex;
	flex-direction: column;
	width: 100vw;
	align-items: center;
	justify-content: center;
	margin: 0;
`;

export const ColumnWrapper = styled.div`
	background-color: #003a70;
	width: 25vw;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const OutletWrapper = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50vw;
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

export const StyledLink = styled(Link)`
	display: flex;
	flex-direction: column;
	text-decoration: none;
	justify-content: center;
	align-items: center;
	color: black;
`;

const StyledSection = styled.section`
	display: flex;
`;

export const StyledButton = styled.button`
	margin: 5px;
	background-color: #3d7dca;
	border-radius: 4px;
	border: none;
	padding: 5px;
	color: #fffbfe;
	&:hover {
		background-color: #729ed4;
		cursor: pointer;
	}
	&:disabled {
		background-color: gray;
		cursor: auto;
	}
`;

export const Title = styled.h1`
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
