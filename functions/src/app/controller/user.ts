import { firestore } from "firebase-admin";

class User {

    is_email_exist = async (email: string) => {
        const users = await firestore().collection("users").where("email", "==", email).get();
        if (users.docs.length > 0) return true;
        return false;
    }

    add = async (email: string, pass: string) => {
        const user = await firestore().collection("users").add({
            email: email, password: pass
        });
        return user.id;
    }
}


export const user = new User;