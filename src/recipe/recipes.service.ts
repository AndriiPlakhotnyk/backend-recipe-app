import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetAllRecipesResponse, GetRecipeByIdResponse, Meal } from './types';

@Injectable()
export class RecipesService {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('RECIPE_API_BASE_URL') ??
      'https://www.themealdb.com/api/json/v1/1';

    if (!this.baseUrl) {
      throw new Error('RECIPE_API_BASE_URL is not defined');
    }
  }

  async getAllRecipes(): Promise<GetAllRecipesResponse> {
    const res = await firstValueFrom(
      this.httpService.get<GetAllRecipesResponse>(
        `${this.baseUrl}/search.php?s=`,
      ),
    );
    return res.data;
  }

  async getRecipesByFilter(
    type: 'i' | 'a' | 'c',
    value: string,
  ): Promise<GetAllRecipesResponse> {
    const res = await firstValueFrom(
      this.httpService.get<GetAllRecipesResponse>(
        `${this.baseUrl}/filter.php?${type}=${value}`,
      ),
    );
    return res.data;
  }

  async getRecipesByFilters(filters: {
    ingredient?: string;
    country?: string;
    category?: string;
  }): Promise<GetAllRecipesResponse> {
    const { ingredient, country, category } = filters;

    const filterCalls: Promise<GetAllRecipesResponse>[] = [];

    if (ingredient) {
      filterCalls.push(this.getRecipesByFilter('i', ingredient));
    }
    if (country) {
      filterCalls.push(this.getRecipesByFilter('a', country));
    }
    if (category) {
      filterCalls.push(this.getRecipesByFilter('c', category));
    }

    if (filterCalls.length === 0) {
      return this.getAllRecipes();
    }

    const results = await Promise.all(filterCalls);

    const intersectedMeals = results
      .map((res) => res.meals)
      .reduce(
        (acc, meals) => {
          if (!acc) return meals;
          return acc.filter((meal) =>
            meals.some((m) => m.idMeal === meal.idMeal),
          );
        },
        undefined as GetAllRecipesResponse['meals'] | undefined,
      );

    return {
      meals: intersectedMeals ?? [],
    };
  }

  async getRecipeById(id: string): Promise<Meal | null> {
    const res = await firstValueFrom(
      this.httpService.get<GetRecipeByIdResponse>(
        `${this.baseUrl}/lookup.php?i=${id}`,
      ),
    );
    console.log('DATA: ', res.data.meals?.[0]);
    return res.data.meals?.[0] ?? null;
  }
}
