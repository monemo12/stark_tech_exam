import { user } from "./user";

export const register = async (email, pass) => {
    if (await user.is_email_exist(email)) {
        throw new Error("The email is exist.");
    }

    const user_id = await user.add(email, pass);
    return user_id;
};