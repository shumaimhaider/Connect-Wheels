import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRole1767101088747 implements MigrationInterface {
    name = 'CreateUserRole1767101088747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."app_user" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."app_user" DROP COLUMN "role"`);
    }

}
