import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertNewUsers();
    await this.insertNewProducts(adminUser);

    return 'Seed Executed!';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    const queryBuiler = this.userRepository.createQueryBuilder();

    await queryBuiler.delete().where({}).execute();
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach(({ password, ...restUser }) => {
      users.push(
        this.userRepository.create({
          ...restUser,
          password: bcrypt.hashSync(password, 10),
        }),
      );
    });

    await this.userRepository.save(users);

    return users[0];
  }

  private async insertNewProducts(user: User) {
    const { products } = initialData;

    const insertPromises = [];
    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
