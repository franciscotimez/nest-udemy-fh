import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

// * En este Archivo va la logica de Negocio

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // { id: uuid(), brand: 'Toyota', model: 'Corolla' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let cardDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Id param not match with body param.');

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        cardDB = {
          ...cardDB,
          ...updateCarDto,
          id,
        };
        return cardDB;
      }
      return car;
    });
    return cardDB;
  }

  delete(id: string) {
    const cardDB = this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return cardDB;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
