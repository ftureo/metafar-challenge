import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './env/development.env',
        }),
        PokemonModule,
    ],
})
export class AppModule { }
