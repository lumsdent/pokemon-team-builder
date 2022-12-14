import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { OutletWrapper, StyledLink } from "./Layout";
import StatVisual from "./StatVisual";

function Detail() {
	let { id } = useParams();
	const [loaded, setLoaded] = useState(false);
	const {
		pokemon: [pokemon],
	} = useOutletContext();

	const [aPokemon, setAPokemon] = useState();

	useEffect(() => {
		setAPokemon(pokemon.find((poke) => poke.id == id));
		setLoaded(true);
	}, [id, pokemon]);
	return (
		<OutletWrapper>
			<StyledLink to="/">Return</StyledLink>

			{loaded && (
				<>
					<h4>{JSON.stringify(aPokemon.stats)}</h4>
					<StatVisual stats={aPokemon.stats}></StatVisual>
				</>
			)}
		</OutletWrapper>
	);
}

export default Detail;
