import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoogleFields1758506678397 implements MigrationInterface {
  name = "AddGoogleFields1758506678397";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new columns to the existing table
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD "googleId" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD "googleRefreshToken" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the columns if we need to rollback
    await queryRunner.query(
      `ALTER TABLE "app_user" DROP COLUMN "googleRefreshToken"`
    );
    await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "googleId"`);
  }
}
