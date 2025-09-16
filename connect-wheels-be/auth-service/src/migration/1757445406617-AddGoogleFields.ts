import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoogleFields1757445406617 implements MigrationInterface {
    name = 'AddGoogleFields1757445406617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" ADD "googleId" character varying`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "googleId"`);
    }

}
