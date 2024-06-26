import { Column, Entity } from "typeorm";
import { BaseAbstractEntity } from '../../../common/entities/base/base.abstract.entity';

@Entity("posts")
export class Posts extends BaseAbstractEntity<Posts>{

  @Column("int", { name: "userId", nullable: true })
      userId: number | null;

  @Column("varchar", { name: "title", nullable: true, length: 250 })
      title: string | null;

  @Column("varchar", { name: "subtitle", nullable: true, length: 250 })
      subtitle: string | null;

  @Column("datetime", {
      name: "createdAt",
      nullable: true,
      default: () => "CURRENT_TIMESTAMP",
  })
      createdAt: Date | null;

  @Column("text", { name: "text", nullable: true })
      text: string | null;

  @Column("int", { name: "likes", nullable: true })
      likes: number | null;
  @Column("int", { name: "companyId", nullable: true })
      companyId: number | null;
  @Column("varchar", { name: "image", nullable: true, length: 250 })
      image: string | null;

  @Column("text", { name: "likesOwners", nullable: true })
      likesOwners: string | null;
}
