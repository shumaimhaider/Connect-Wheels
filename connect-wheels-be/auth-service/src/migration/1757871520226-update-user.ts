import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1757871520226 implements MigrationInterface {
    name = 'UpdateUser1757871520226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT IF EXISTS "UQ_c480e576dd71729addbc2d51b67"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "username"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "role"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "totpSecret"`);

        // Add new columns as nullable first
        await queryRunner.query(`ALTER TABLE "app_user" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "password" character varying`);

        // Add unique constraint for email
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "UQ_3fa909d0e37c531ebc237703391" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT IF EXISTS "UQ_3fa909d0e37c531ebc237703391"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "password"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "email"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "lastName"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN IF EXISTS "firstName"`);

        await queryRunner.query(`ALTER TABLE "app_user" ADD "totpSecret" character varying`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "UQ_c480e576dd71729addbc2d51b67" UNIQUE ("username")`);
    }
}
