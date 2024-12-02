import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
    let service: PokemonService;

    const mockConfigService = {
        get: jest.fn((key: string) => {
            const env = {
                BASE_URL: 'https://pokeapi.co/api',
                POKEAPI_VERSION_PATH: '/v2',
            };
            return env[key];
        }),
    };

    const mockHttpService = {
        axiosRef: {
            get: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PokemonService,
                { provide: HttpService, useValue: mockHttpService },
                { provide: ConfigService, useValue: mockConfigService },
            ],
        }).compile();

        service = module.get<PokemonService>(PokemonService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getPokemonByName', () => {
        it('should return Pokémon data for a valid name', async () => {
            const mockResponse = {
                data: {
                    id: 25,
                    name: 'pikachu',
                    types: [{ type: { name: 'electric' } }],
                    abilities: [{ ability: { name: 'static' } }, { ability: { name: 'lightning-rod' } }],
                },
            };

            mockHttpService.axiosRef.get.mockResolvedValueOnce(mockResponse);

            const result = await service.getPokemonByName('pikachu');

            expect(result).toEqual({
                id: 25,
                name: 'pikachu',
                types: ['electric'],
                abilities: ['static', 'lightning-rod'],
                numberOfAbilities: 2,
            });
        });

        it('should throw an exception for an invalid Pokémon name', async () => {
            mockHttpService.axiosRef.get.mockRejectedValueOnce({
                response: { status: 404 },
            });

            await expect(service.getPokemonByName('invalid')).rejects.toThrow(
                'The Pokémon with name: "invalid" does not exist in the Pokémon database.',
            );
        });
    });

    describe('getPokemonByType', () => {
        it('should return a list of Pokémon for a valid type', async () => {
            const mockResponse = {
                data: {
                    pokemon: [
                        { pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' } },
                        { pokemon: { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' } },
                    ],
                },
            };

            mockHttpService.axiosRef.get.mockResolvedValueOnce(mockResponse);

            const result = await service.getPokemonByType('fire');

            expect(result).toEqual({
                0: {
                    name: 'charmander',
                    url: 'https://pokeapi.co/api/v2/pokemon/4/',
                },
                1: {
                    name: 'charmeleon',
                    url: 'https://pokeapi.co/api/v2/pokemon/5/',
                },
                metadata: {
                    total: 2,
                },
            });
        });

        it('should throw an exception for an invalid Pokémon type', async () => {
            mockHttpService.axiosRef.get.mockRejectedValueOnce({
                response: { status: 404 },
            });

            await expect(service.getPokemonByType('invalid')).rejects.toThrow(
                'The type "invalid" does not exist in the Pokémon database.',
            );
        });
    });
    describe('getRandomPokemon', () => {
        it('should return a random Pokémon', async () => {
            const mockResponse = {
                data: {
                    id: 150,
                    name: 'mewtwo',
                    types: [{ type: { name: 'psychic' } }],
                    abilities: [{ ability: { name: 'pressure' } }, { ability: { name: 'unnerve' } }],
                },
            };

            mockHttpService.axiosRef.get.mockResolvedValueOnce(mockResponse);

            const result = await service.getRandomPokemon();

            expect(result).toEqual({
                id: 150,
                name: 'mewtwo',
                types: ['psychic'],
                abilities: ['pressure', 'unnerve'],
                numberOfAbilities: 2,
            });
        });

        it('should throw an exception if the random fetch fails', async () => {
            mockHttpService.axiosRef.get.mockRejectedValueOnce({
                response: { status: 500 },
            });

            await expect(service.getRandomPokemon()).rejects.toThrow('Failed to fetch random Pokémon');
        });
    });
});
