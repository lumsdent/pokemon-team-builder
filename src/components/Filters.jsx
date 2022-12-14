import React from "react";
import { Title, ColumnWrapper } from "./Layout";
import Type from "./Type";

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

function Filters({ pokemon, display, setDisplay, refs, types }) {
	const handleClick = async (id) => {
		refs[id].current.scrollIntoView({});
	};

	const searchByType = (type) => {
		setDisplay(
			display.filter((pokemon) => {
				console.log(pokemon.typeNames);
				return pokemon.typeNames.includes(type);
			})
		);
	};

	const resetDisplay = () => {
		setDisplay(pokemon);
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
			{types.map((type, index) => (
				<button onClick={() => searchByType(type)}>
					<Type type={type} index={index}></Type>
				</button>
			))}
			<button onClick={resetDisplay}>Reset</button>
		</ColumnWrapper>
	);
}

export default Filters;
