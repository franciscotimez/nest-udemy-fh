import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { unique: true })
  email: string;

  @ApiProperty()
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column('text')
  fullName: string;

  @ApiProperty()
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  // (() => [Entidad], (instancia) => instancia.propiedad)
  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }
}
