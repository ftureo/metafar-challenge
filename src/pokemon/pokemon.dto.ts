import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
    @ApiProperty({ example: 25, description: 'Pokémon ID' })
    id: number;

    @ApiProperty({ example: 'pikachu', description: 'Pokémon name' })
    name: string;

    @ApiProperty({ example: ['electric'], description: 'List of Pokémon types' })
    types: string[];

    @ApiProperty({ example: ['static', 'lightning-rod'], description: 'List of Pokémon abilities' })
    abilities: string[];

    @ApiProperty({ example: 2, description: 'Number of abilities the Pokémon has' })
    numberOfAbilities: number;
}

export class PokemonTypeDto {
    @ApiProperty({ example: 'fire', description: 'Type of Pokémon' })
    type: string;

    @ApiProperty({
        example: [
            { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
        description: 'List of Pokémon with the specified type',
    })
    pokemon: { name: string; url: string }[];
}

export class RandomPokemonDto extends PokemonDto { }
