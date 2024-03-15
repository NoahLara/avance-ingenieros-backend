import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { USERS } from "./USERS";
import { ROLES } from "./ROLES";

@Entity()
export class USERS_ROLES extends BaseEntity {
  @PrimaryColumn()
  @ManyToOne(() => USERS, (user) => user.roles)
  role_id: string;

  @PrimaryColumn()
  @ManyToOne(() => ROLES, (role) => role.users)
  user_id: string;
}
