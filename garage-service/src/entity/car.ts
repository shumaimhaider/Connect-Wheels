import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Garage } from './garage';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column({ nullable: true })
  pictureUrl!: string;

  @Column()
  garageId!: number;

  @ManyToOne(() => Garage, garage => garage.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'garageId' })
  garage!: Garage;
}

