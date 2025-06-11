import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('country') country?: string,
    @Query('category') category?: string,
  ) {
    return this.recipesService.getRecipesByFilters({
      ingredient,
      country,
      category,
    });
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string) {
    return this.recipesService.getRecipeById(id);
  }
}
