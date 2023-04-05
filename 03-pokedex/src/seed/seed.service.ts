import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import axios from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    console.log('Deleting dataBase...');
    await this.pokemonModel.deleteMany();

    console.log('Fetching data...');
    const { data } = await this.axios.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=10`,
    );

    console.log('Loading dataBase');
    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      // const pokemon = await this.pokemonModel.create({ name, no });
      insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    });

    await Promise.all(insertPromisesArray);

    return 'seed executed';
  }
}