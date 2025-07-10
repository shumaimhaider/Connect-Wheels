import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Car } from './car';
import { UserGarageFollow } from './user-garage-follow';

@Entity('garages')
export class Garage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  pictureUrl!: string;

  @Column()
  ownerId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Car, car => car.garage)
  cars!: Car[];

  @OneToMany(() => UserGarageFollow, follow => follow.garage)
  followers!: UserGarageFollow[];
}