import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: 'user' })
  role!: string;

  @Column({ nullable: true })
  totpSecret!: string;

  @CreateDateColumn()
  createdAt!: Date;

   setTOTP(secret: string) {
    this.totpSecret = secret;
  }
}