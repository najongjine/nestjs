import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TUser } from "./TUser";

@Index("user_id", ["userId"], {})
@Entity("t_order", { schema: "mydb" })
export class TOrder {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "iorder", nullable: true, length: 255 })
  iorder: string | null;

  @ManyToOne(() => TUser, (tUser) => tUser.tOrders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: TUser;
}
