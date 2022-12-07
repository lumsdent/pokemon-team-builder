import React from "react";
import TeamPokemonCard from "./TeamPokemonCard";
import { ColumnWrapper, Title, StyledButton, StyledLink } from "./Layout";

function Team({ team, removePokemonFromTeam }) {
	return (
		<ColumnWrapper>
			<Title className="small">PokeTeam</Title>
			{team.map((pokemon) => (
				<TeamPokemonCard
					key={"Teamer_".concat(pokemon.id)}
					pokemon={pokemon}
					removePokemonFromTeam={removePokemonFromTeam}
				></TeamPokemonCard>
			))}
			{team.length > 0 && (
				<StyledLink to="/evaluate">
					<StyledButton>Evaluate</StyledButton>
				</StyledLink>
			)}
		</ColumnWrapper>
	);
}

export default Team;
