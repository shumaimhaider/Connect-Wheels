import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

@Column({ nullable: true })
  firstName!: string; 

@Column({ nullable: true })
  lastName!: string;    

  @Column({  nullable: true , unique: true })
  email!: string;   

 @Column({ nullable: true })
  password!: string; 


  @CreateDateColumn()
  createdAt!: Date;
}
