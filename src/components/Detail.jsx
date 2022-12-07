import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokedex from "pokedex-promise-v2";
import { OutletWrapper, StyledLink } from "./Layout";

const options = {
	protocol: "https",
	versionPath: "/api/v2/",
	timeout: 5 * 1000,
};
const P = new Pokedex(options);

function Detail() {
	let { id } = useParams();

	const [pokemon, setPokemon] = useState();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			let pokemon = await P.getPokemonByName(id);
			setPokemon(pokemon);
			console.log(pokemon);
			setLoaded(true);
		};

		loadData();
	}, [id]);

	return (
		<OutletWrapper>
			<StyledLink to="/">Return</StyledLink>
			{loaded && (
				<>
					<h2>{pokemon.name}</h2>
					{pokemon.stats.map((stat) => (
						<>
							<h3>{stat.stat.name}</h3>
							<h3>{stat.base_stat}</h3>
						</>
					))}
					{pokemon.abilities.map((ability) => (
						<>
							<h4>{ability.ability.name}</h4>
						</>
					))}
				</>
			)}
		</OutletWrapper>
	);
}

export default Detail;
