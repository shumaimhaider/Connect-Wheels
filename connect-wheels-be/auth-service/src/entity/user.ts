import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: 'user' })
  role!: string;

  @Column({ nullable: true })
  totpSecret!: string;

  @Column({ nullable: true })
  googleId!: string;

  @Column({ nullable: true })
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  setTOTP(secret: string) {
    this.totpSecret = secret;
  }
}