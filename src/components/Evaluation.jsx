import React, { useMemo, useState } from "react";
import { OutletWrapper } from "./Layout";
import { useOutletContext } from "react-router-dom";
import Pokedex from "pokedex-promise-v2";
import styled from "styled-components";
import PokemonCard, { toCapitalCase } from "./PokemonCard";
import Type from "./Type";

const options = {
	protocol: "https",
	versionPath: "/api/v2/",
	timeout: 5 * 1000,
};
const P = new Pokedex(options);

function Evaluation() {
	const {
		team: [team],
	} = useOutletContext();
	const [loaded, setLoaded] = useState(false);
	const [pokeObj, setPokeObj] = useState([]);

	useMemo(() => {
		const getTypes = async () => {
			setPokeObj([]);
			//for each pokemon
			console.log(team);
			let teamWeakness = [];
			let teamStrength = [];
			let { results } = await P.getResource(
				"https://pokeapi.co/api/v2/type"
			);
			let allTypes = results
				.map((object) => object.name)
				.filter((type) => type !== "unknown" && type !== "shadow");

			for (let pokemon of team) {
				let typesList = [];
				//get data on both of their types
				let weakFrom = [];
				let resistFrom = [];
				let noDamageFrom = [];
				for (let typeObj of pokemon.types) {
					let { damage_relations } = await P.getResource(
						typeObj.type.url
					);
					for (let type of damage_relations.double_damage_from) {
						weakFrom.push(type.name);
						teamWeakness.push(type.name);
					}
					for (let type of damage_relations.half_damage_from) {
						resistFrom.push(type.name);
						teamStrength.push(type.name);
					}
					for (let type of damage_relations.no_damage_from) {
						noDamageFrom.push(type.name);
					}
					typesList.push(typeObj.type.name);
					console.log("I am here", typeObj.type.name);
				}
				//if half damage and double damage type, they cancel and should be removed
				//in no damage table

				const noDamage = noDamageFrom;
				//twice resistant
				const quarterDamage = getDuplicates(resistFrom);
				//resistant, but not weak;
				const halfDamage = resistFrom.filter(
					(type) =>
						!weakFrom.includes(type) &&
						!quarterDamage.includes(type)
				);
				//twice weak to
				const fourXDamage = getDuplicates(weakFrom);
				//weak to, and not resistant
				const doubleDamage = weakFrom.filter(
					(type) =>
						!resistFrom.includes(type) &&
						!fourXDamage.includes(type)
				);

				const pokemonObj = new Pokeobj(
					pokemon.id,
					pokemon.name,
					typesList,
					pokemon.sprites.front_default,
					noDamage,
					quarterDamage,
					halfDamage,
					doubleDamage,
					fourXDamage
				);
				console.log(pokemonObj);
				setPokeObj((oldState) => [...oldState, pokemonObj]);
			}
			let weaknessMagnitude = count(teamWeakness);

			console.log("WM", weaknessMagnitude);
			console.log("TS", teamStrength);
			let missingResistances = allTypes.filter(
				(type) => !teamStrength.includes(type)
			);
			console.log(missingResistances);
			setLoaded(true);
		};
		if (!loaded) {
			getTypes();
		}
	}, [team]);

	class Pokeobj {
		constructor(
			id,
			name,
			types,
			sprite,
			noDamage,
			quarterDamage,
			halfDamage,
			doubleDamage,
			fourXDamage
		) {
			this.id = id;
			this.name = name;
			this.types = types;
			this.sprite = sprite;
			this.noDamage = noDamage;
			this.quarterDamage = quarterDamage;
			this.halfDamage = halfDamage;
			this.doubleDamage = doubleDamage;
			this.fourXDamage = fourXDamage;
		}
	}
	return (
		<OutletWrapper>
			<StyledDiv>
				<h1>Team Summary</h1>

				{loaded &&
					pokeObj.map((pokemon) => (
						<Pokemon key={pokemon.id}>
							<SummaryWrapper>
								<img
									src={pokemon.sprite}
									alt={pokemon.name}
								></img>
								<h2>{toCapitalCase(pokemon.name)}</h2>

								<Type types={pokemon.types}></Type>
							</SummaryWrapper>
							<DetailWrapper>
								<Detail>
									<h2>Resistances</h2>
									<div>
										<h4>{"Half Damage"}</h4>
										<Type types={pokemon.halfDamage}></Type>
									</div>
									<div>
										<h4>{"Quarter Damage"}</h4>
										<Type
											types={pokemon.quarterDamage}
										></Type>
									</div>
									<div>
										<h4>{"No Damage"}</h4>
										<Type types={pokemon.noDamage}></Type>
									</div>
								</Detail>
								<Detail>
									<h2>Weaknesses</h2>
									<div>
										<h4>{"Double Damage"}</h4>
										<Type
											types={pokemon.doubleDamage}
										></Type>
									</div>
									<div>
										<h4>{"Four X Damage"}</h4>
										<Type
											types={pokemon.fourXDamage}
										></Type>
									</div>
								</Detail>
							</DetailWrapper>
						</Pokemon>
					))}
			</StyledDiv>
		</OutletWrapper>
	);
}

function count(arr) {
	const count = {};

	for (const element of arr) {
		if (count[element]) {
			count[element] += 1;
		} else {
			count[element] = 1;
		}
	}
	return count;
}

function getDuplicates(array) {
	const uniqueValues = new Set(array);
	const duplicateValues = [];
	array.forEach((value) => {
		if (uniqueValues.has(value)) {
			uniqueValues.delete(value);
		} else duplicateValues.push(value);
	});

	const duplicates = [...new Set(duplicateValues)];
	return duplicates;
}

const Pokemon = styled.div`
	display: flex;
	background-color: #eeedf0;
	border-radius: 5px;
	box-shadow: 3px 3px 5px grey;
	margin: 5px;
`;
const SummaryWrapper = styled.div`
	background-color: #fffbfe;
	border-bottom-left-radius: 5px;
	border-top-left-radius: 5px;
	padding: 0 20px;
`;

const DetailWrapper = styled.div`
	display: flex;
	justify-content: space-around;
`;

const Detail = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

export default Evaluation;
