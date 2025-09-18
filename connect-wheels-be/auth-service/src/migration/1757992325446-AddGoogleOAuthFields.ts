import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoogleOAuthFields1757992325446 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Only add the two Google-specific fields
        await queryRunner.query(`ALTER TABLE "app_user" ADD "googleId" character varying`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "googleRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "googleRefreshToken"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "googleId"`);
    }
}
