import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { v4 as id4 } from "uuid";

import { user_database } from "../../database/index.js";

dotenv.config();

const envSalt = process.env.SALT ?? "";

async function UserCreateService({
  email,
  password,
}){
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password + envSalt, salt);

    const newUser = {
      id: id4(),
      created_at: new Date(),
      email,
      password: hashedPassword,
    };

    user_database.push(newUser);

    return true;
  } catch (err) {
    /* empty */
  }
}

export default UserCreateService;
