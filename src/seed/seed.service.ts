import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}
  async executeSeed() {
    const { data } = await firstValueFrom(
      this.httpService.get<PokeResponse>('http://pokeapi.co/api/v2/pokemon?limit=10'),
    );
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      console.log(name, no);
    });
    return data;
  }
}
