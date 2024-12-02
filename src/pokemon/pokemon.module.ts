import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
    imports: [
        HttpModule,
        ConfigModule,
    ],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule { }
