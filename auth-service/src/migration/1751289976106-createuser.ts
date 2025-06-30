import { MigrationInterface, QueryRunner } from "typeorm";

export class Createuser1751289976106 implements MigrationInterface {
    name = 'Createuser1751289976106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "totpSecret" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c480e576dd71729addbc2d51b67" UNIQUE ("username"), CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "app_user"`);
    }

}
