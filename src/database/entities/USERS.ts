import {
  Entity,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { createHash } from "crypto";
import { AUTH_TOKENS } from "./AUTH_TOKENS";
import { USERS_ROLES } from "./USERS_ROLES";

@Entity()
export class USERS extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AUTH_TOKENS, (authToken) => authToken.user)
  authTokens: AUTH_TOKENS[];

  @OneToMany(() => USERS_ROLES, (userRole) => userRole.user_id)
  roles: USERS_ROLES[];

  @BeforeInsert()
  generateUserId() {
    // Generar un hash único para el user_id
    const hash = createHash("sha256")
      .update(Date.now().toString())
      .digest("hex");

    // Tomar solo los primeros 8 caracteres del hash
    this.id = hash.substring(0, 8);
  }
}
