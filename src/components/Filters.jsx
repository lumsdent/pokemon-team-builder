import React from "react";
import { Title, ColumnWrapper } from "./Layout";

const generationIdStart = [0, 151, 251, 386, 494, 649, 721, 809];
const regions = [
	"Kanto",
	"Johto",
	"Hoenn",
	"Sinnoh",
	"Unova",
	"Kalos",
	"Alola",
	"Galar",
];
function Filters({ pokemon, refs }) {
	const handleClick = async (id) => {
		refs[id].current.scrollIntoView({});
	};

	return (
		<ColumnWrapper>
			<Title className="small">Filters</Title>
			{generationIdStart.map((gen, index) => (
				<button
					className="generation-filter"
					onClick={() => handleClick(gen)}
				>
					{regions[index]}
				</button>
			))}
		</ColumnWrapper>
	);
}

export default Filters;
