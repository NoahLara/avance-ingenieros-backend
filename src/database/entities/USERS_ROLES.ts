import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { USERS } from "./USERS";
import { ROLES } from "./ROLES";

@Entity()
export class USERS_ROLES extends BaseEntity {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  role_id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => USERS, (user) => user.roles)
  user: USERS;

  @JoinColumn({ name: "role_id" })
  @ManyToOne(() => ROLES, (role) => role.users)
  role: ROLES;
}
