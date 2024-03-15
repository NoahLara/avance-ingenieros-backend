import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { createHash } from "crypto";
import { USERS_ROLES } from "./USERS_ROLES";

@Entity()
export class ROLES extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => USERS_ROLES, (userRole) => userRole.role_id)
  users: USERS_ROLES[];

  @BeforeInsert()
  generateRoleId() {
    // Generar un hash único para el role_id
    const hash = createHash("sha256")
      .update(Date.now().toString())
      .digest("hex");

    // Tomar solo los primeros 8 caracteres del hash
    this.id = hash.substring(0, 8);
  }
}
