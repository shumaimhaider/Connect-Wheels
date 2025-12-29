import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveAppUserToGarageSchema1767014716819 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ensure 'garage' schema exists
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS garage`);

        // Move tables to 'garage' schema
        await queryRunner.query(`ALTER TABLE public.cars SET SCHEMA garage`);
        await queryRunner.query(`ALTER TABLE public.garages SET SCHEMA garage`);
        await queryRunner.query(`ALTER TABLE public.user_garage_follows SET SCHEMA garage`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints first to allow moving tables
        await queryRunner.query(`ALTER TABLE "garage"."user_garage_follows" DROP CONSTRAINT IF EXISTS "FK_451fad9cdcc74617f7b5f3243ce"`);
        await queryRunner.query(`ALTER TABLE "garage"."cars" DROP CONSTRAINT IF EXISTS "FK_31f371255dc7adf8be81d032e4e"`);

        // Move tables back to public schema
        await queryRunner.query(`ALTER TABLE "garage"."user_garage_follows" SET SCHEMA public`);
        await queryRunner.query(`ALTER TABLE "garage"."cars" SET SCHEMA public`);
        await queryRunner.query(`ALTER TABLE "garage"."garages" SET SCHEMA public`);
    }
}
