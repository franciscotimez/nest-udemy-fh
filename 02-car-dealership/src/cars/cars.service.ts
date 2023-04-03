import { Injectable } from '@nestjs/common';

// ! En este Archivo va la logica de Negocio
@Injectable()
export class CarsService {
  private cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Honda', model: 'Civic' },
    { id: 3, brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    return this.cars.find((car) => car.id === id);
  }
}
