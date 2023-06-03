import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  constructor() {
    this.id = 0; // Assign a default value or initialize the property
  }
}


// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: "varchar" }) // Specify the column type
//   username: string;

//   @Column({ type: "varchar" }) // Specify the column type
//   password: string;
// }
