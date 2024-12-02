import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { PokemonDto, PokemonTypeDto, RandomPokemonDto } from './pokemon.dto';

@ApiTags('Pokémon')
@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get(':name')
    @ApiParam({ name: 'name', type: String, description: 'Name of the Pokémon' })
    @ApiResponse({
        status: 200,
        description: 'Returns information about a specific Pokémon',
        type: PokemonDto,
    })
    async getPokemonByName(@Param('name') name: string): Promise<PokemonDto> {
        return this.pokemonService.getPokemonByName(name);
    }

    @Get('type/:type')
    @ApiParam({ name: 'type', type: String, description: 'Type of Pokémon' })
    @ApiResponse({
        status: 200,
        description: 'Returns a list of Pokémon with the specified type',
        type: PokemonTypeDto,
    })
    async getPokemonByType(@Param('type') type: string): Promise<PokemonTypeDto> {
        return this.pokemonService.getPokemonByType(type);
    }

    @Get('random')
    @ApiResponse({
        status: 200,
        description: 'Returns a random Pokémon',
        type: RandomPokemonDto,
    })
    async getRandomPokemon(): Promise<RandomPokemonDto> {
        return this.pokemonService.getRandomPokemon();
    }
}
