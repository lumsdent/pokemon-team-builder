import React from "react";
import styled from "styled-components";

function PokemonCard({ key, pokemon }) {
	return (
		<Card className="card-wrapper">
			<img
				key={key}
				src={pokemon.sprites.front_default}
				alt={pokemon.sprites.front_default}
			></img>
			<h2 key={pokemon.id}>{toCapitalCase(pokemon.name)}</h2>
			{pokemon.types.map((type, index) => (
				<Type key={index} className={type.type.name}>
					{toCapitalCase(type.type.name)}
				</Type>
			))}
		</Card>
	);
}

function toCapitalCase(prop) {
	return prop.charAt(0).toUpperCase().concat( prop.substring(1));
}
const Card = styled.div`
	background-color: #fffbfe;
	border-radius: 5%;
	box-shadow: 3px 3px 5px gray;
	display: flex;
	flex-direction: column;
	min-width: 10vw;
	align-items: center;
	justify-content: center;
	margin: 10px;
`;

const Type = styled.div`
	&.grass {
		background: #78c850;
		border-top-color: #c0f860;
		border-bottom-color: #588040;
	}
	&.normal {
		background: #a8a878;
		border-top-color: #d8d8d0;
		border-bottom-color: #705848;
	}
	&.fire {
		background: #f08030;
		border-top-color: #f8d030;
		border-bottom-color: #c03028;
	}
	&.water {
		background: #6890f0;
		border-top-color: #98d8d8;
		border-bottom-color: #807870;
	}
	&.electric {
		background: #f8d030;
		border-top-color: #f8f878;
		border-bottom-color: #b8a038;
	}
	&.bug {
		background: #a8b820;
		border-top-color: #d8e030;
		border-bottom-color: #a8b820;
	}
	&.flying {
		background: #a890f0;
		border-top-color: #c8c0f8;
		border-bottom-color: #705898;
	}
	&.fighting {
		background: #c03028;
		border-top-color: #f08030;
		border-bottom-color: #484038;
	}
	&.ice {
		background: #98d8d8;
		border-top-color: #d0f8e8;
		border-bottom-color: #9090a0;
	}
	&.rock {
		background: #b8a038;
		border-top-color: #e0c068;
		border-bottom-color: #886830;
	}
	&.ground {
		background: #e0c068;
		border-top-color: #f8f878;
		border-bottom-color: #886830;
	}
	&.poison {
		background: #a040a0;
		border-top-color: #d880b8;
		border-bottom-color: #483850;
	}
	&.psychic {
		background: #f85888;
		border-top-color: #f8c0b0;
		border-bottom-color: #789010;
	}
	&.ghost {
		background: #705898;
		border-top-color: #a890f0;
		border-bottom-color: #483850;
	}
	&.dragon {
		background: #7038f8;
		border-top-color: #b8a0f8;
		border-bottom-color: #483890;
	}
	&.dark {
		background: #705848;
		border-top-color: #a8a878;
		border-bottom-color: #484038;
	}
	&.steel {
		background: #b8b8d0;
		border-top-color: #d8d8c0;
		border-bottom-color: #807870;
	}
	&.fairy {
		background: #f0b6bc;
		border-top-color: #f5cad1;
		border-bottom-color: #905f63;
	}

	text-shadow: 0px 1px 1px #807870;
	border-style: solid none;
	border-width: 1px;
	border-radius: 5px;
	padding: 0.15em;
	font-size: 9pt;
	color: #f8f8f8;
`;

export default PokemonCard;
