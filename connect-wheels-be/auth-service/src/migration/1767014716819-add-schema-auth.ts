import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveAppUserToAuthSchema1767014716819 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ensure schema exists
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth`);

        // Move the table
        await queryRunner.query(`ALTER TABLE public.app_user SET SCHEMA auth`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rollback: move table back to public
        await queryRunner.query(`ALTER TABLE auth.app_user SET SCHEMA public`);
    }
}