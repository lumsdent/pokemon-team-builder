import React from "react";
import styled from "styled-components";
import { toCapitalCase } from "./PokemonCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function TeamPokemonCard({ pokemon, removePokemonFromTeam }) {
	function handleClick() {
		removePokemonFromTeam(pokemon);
	}

	return (
		<Card>
			<img src={pokemon.sprites.front_default} alt="test"></img>
			<h4>{toCapitalCase(pokemon.name)}</h4>
			<StyledButton onClick={handleClick}>
				<FontAwesomeIcon icon={solid("x")} />
			</StyledButton>
		</Card>
	);
}

const Card = styled.div`
	display: flex;
	box-shadow: 3px 3px 5px #dc3545;
	align-items: center;
	justify-content: space-between;
	width: 300px;
	border-radius: 5px;
	background-color: #fffbfe;
	margin: 3px;
`;

const StyledButton = styled.button`
	height: 30px;
	width: 30px;
	border: none;
	border-radius: 5px;
	box-shadow: 2px 2px 3px lightgray;
	margin: 10px;
	background-color: #dc3545;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export default TeamPokemonCard;
