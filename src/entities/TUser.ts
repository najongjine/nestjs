import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TOrder } from "./TOrder";

@Entity("t_user", { schema: "mydb" })
export class TUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => TOrder, (tOrder) => tOrder.user)
  tOrders: TOrder[];
}
