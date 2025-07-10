import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGarage1752059489650 implements MigrationInterface {
    name = 'CreateGarage1752059489650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "make" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "pictureUrl" character varying, "garageId" integer NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "garages" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pictureUrl" character varying, "ownerId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b82da5aaa1265089e02a4493818" UNIQUE ("name"), CONSTRAINT "PK_5aab32f702d77c87b2555553919" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_garage_follows" ("userId" integer NOT NULL, "garageId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6923e6a77ac7f42e688ea11c18d" PRIMARY KEY ("userId", "garageId"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_31f371255dc7adf8be81d032e4e" FOREIGN KEY ("garageId") REFERENCES "garages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_garage_follows" ADD CONSTRAINT "FK_451fad9cdcc74617f7b5f3243ce" FOREIGN KEY ("garageId") REFERENCES "garages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_garage_follows" DROP CONSTRAINT "FK_451fad9cdcc74617f7b5f3243ce"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_31f371255dc7adf8be81d032e4e"`);
        await queryRunner.query(`DROP TABLE "user_garage_follows"`);
        await queryRunner.query(`DROP TABLE "garages"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
