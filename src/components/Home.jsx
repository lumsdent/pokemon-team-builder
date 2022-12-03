import React from "react";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import "../App.css";
import { useOutletContext } from "react-router-dom";

function Home() {
	const {
		loaded: [loaded],
		data: [data],
		team: [team, setTeam],
	} = useOutletContext();

	function onPokemonSelect(pokemon) {
		console.log(team);
		if (team.length < 6) {
			setTeam((team) => [...team, pokemon]);
		}
	}

	return (
		<CardWrapper>
			{loaded &&
				data.map((pokemon) => (
					<PokemonCard
						key={"Wrapper_".concat(pokemon.id)}
						id={pokemon.id}
						pokemon={pokemon}
						onPokemonSelect={onPokemonSelect}
					></PokemonCard>
				))}
		</CardWrapper>
	);
}

const CardWrapper = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 69vw;
	flex-wrap: wrap;
`;

export default Home;
