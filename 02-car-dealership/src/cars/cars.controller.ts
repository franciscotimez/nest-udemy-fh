import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

// ! Aca se declaran los endpoints
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carsService.findOneById(+id);
  }
}
