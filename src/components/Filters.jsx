import React from "react";
import { Title, ColumnWrapper } from "./Layout";
import Pokedex from "pokedex-promise-v2";

const options = {
	protocol: "https",
	versionPath: "/api/v2/",
	timeout: 5 * 1000,
};
const P = new Pokedex(options);

const generationIdStart = [0, 151, 251, 386, 494, 649, 721, 809, 905];

function Filters({ loadPokemonData }) {
	const handleClick = async (id) => {
		const result = await P.getResource(
			"https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + id
		);
		loadPokemonData(result);
	};
	return (
		<ColumnWrapper>
			<Title className="small">Filters</Title>
			{generationIdStart.map((gen, index) => (
				<button
					className="generation-filter"
					onClick={() => handleClick(gen)}
				>
					Gen {index + 1}
				</button>
			))}
		</ColumnWrapper>
	);
}

export default Filters;
