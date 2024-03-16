import {
  Entity,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
import { createHash } from "crypto";
import { USERS } from "./USERS";

@Entity()
export class AUTH_TOKENS extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column()
  expires_at: string;

  @ManyToOne(() => USERS, (user) => user.authTokens)
  user: USERS;

  @BeforeInsert()
  generateTokenId() {
    // Generar un hash único para el token_id
    const hash = createHash("sha256")
      .update(Date.now().toString())
      .digest("hex");

    // Tomar solo los primeros 8 caracteres del hash
    this.id = hash.substring(0, 8);
  }
}
