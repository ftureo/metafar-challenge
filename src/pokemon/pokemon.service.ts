import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        const base = this.configService.get<string>('BASE_URL');
        const versionPath = this.configService.get<string>('POKEAPI_VERSION_PATH');
        this.baseUrl = `${base}${versionPath}`;
    }


    async getPokemonByName(name: string): Promise<any> {
        try {
            const { data } = await this.httpService.axiosRef.get(
                `${this.baseUrl}/pokemon/${name}`,
            );

            const { id, types, abilities } = data;

            return {
                id,
                name,
                types: types.map((t) => t.type.name),
                abilities: abilities.map((a) => a.ability.name),
                numberOfAbilities: abilities.length,
            };
        } catch (error) {
            if (error.response?.status === 404) {
                throw new HttpException(
                    `The Pokémon with name: \"${name}\" does not exist in the Pokémon database.`,
                    404,
                );
            }
            throw new HttpException(
                `Failed to fetch Pokémon with name: ${name}`,
                error.response?.status || 500,
            );
        }
    }

    async getPokemonByType(type: string): Promise<any> {
        try {
            const response = await this.httpService.axiosRef.get(
                `${this.baseUrl}/type/${type}`,
            );

            const pokemonList = response.data.pokemon;
            return {
                ...(pokemonList.map((p) => ({
                    name: p.pokemon.name,
                    url: p.pokemon.url,
                }))),
                metadata: {
                    total: pokemonList.length,
                }
            }
        } catch (error) {
            if (error.response?.status === 404) {
                throw new HttpException(
                    `The type \"${type}\" does not exist in the Pokémon database.`,
                    404,
                );
            }
            throw new HttpException(
                `Failed to fetch Pokémon of type: ${type}`,
                error.response?.status || 500,
            );
        }
    }

    async getRandomPokemon(): Promise<any> {
        try {
            const randomId = Math.floor(Math.random() * 150) + 1;
            const { data } = await this.httpService.axiosRef.get(
                `${this.baseUrl}/pokemon/${randomId}`,
            );

            const { id, name, types, abilities } = data;

            return {
                id,
                name,
                types: types.map((t) => t.type.name),
                abilities: abilities.map((a) => a.ability.name),
                numberOfAbilities: abilities.length,
            };
        } catch (error) {
            throw new HttpException(
                `Failed to fetch random Pokémon`,
                error.response?.status || 500,
            );
        }
    }
}
