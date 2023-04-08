import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      autoLoadEntities: true,
      synchronize: true, // ! Usualmente solo en desarrollo
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
