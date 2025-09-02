import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Garage } from './garage';

@Entity('user_garage_follows')
export class UserGarageFollow {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  garageId!: number;

  @ManyToOne(() => Garage, garage => garage.followers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'garageId' })
  garage!: Garage;

  @CreateDateColumn()
  createdAt!: Date;
}

