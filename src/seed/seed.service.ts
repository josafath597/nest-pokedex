import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpService: HttpService,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const { data } = await firstValueFrom(
      this.httpService.get<PokeResponse>('http://pokeapi.co/api/v2/pokemon?limit=650'),
    );
    // const insertPromisesArray = [];
    // data.results.forEach(async ({ name, url }) => {
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];

    //   insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    // });
    // await Promise.all(insertPromisesArray);
    const pokemonToInsert: { name: string; no: number }[] = [];
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no });
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Executed';
  }
}
