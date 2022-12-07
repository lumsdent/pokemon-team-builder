import React from "react";
import PokemonCard from "./PokemonCard";
import "../App.css";
import { useOutletContext } from "react-router-dom";
import { OutletWrapper } from "./Layout";

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
		<OutletWrapper>
			{loaded &&
				data.map((pokemon) => (
					<PokemonCard
						key={"Wrapper_".concat(pokemon.id)}
						id={pokemon.id}
						pokemon={pokemon}
						onPokemonSelect={onPokemonSelect}
					></PokemonCard>
				))}
		</OutletWrapper>
	);
}



export default Home;
