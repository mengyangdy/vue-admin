import { Injectable } from "@nestjs/common";
import { db } from "../../db";
import { roles } from "../../db/schema";
import { eq } from "drizzle-orm";

@Injectable()
export class RoleService {
  create() {
    return "This action adds a new role";
  }

  findAll() {
    return db.select().from(roles);
  }

  findOne(id: number) {
    return db.select().from(roles).where(eq(roles.id, id));
  }

  update(id: number) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
