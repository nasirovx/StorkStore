import AdminBro from "admin-bro";
import AdminBroExpress from "admin-bro-expressjs";
import AdminBroMongoose from "admin-bro-mongoose";
import mongoose from "mongoose";

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: "/admin",
});

const ADMIN = {
    login: process.env.ADMIN_EMAIL || "admin@gmail.com",
    password: process.env.ADMIN_PASSWORD || "admin",
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
    cookiePassword:
        process.env.ADMIN_COOKIE_PASS ||
        "suppersecret-and-long-password-for-a-cookie-in-the-browser",
    authenticate: async (login, password) => {
        if (login === ADMIN.login && password === ADMIN.password) {
            return ADMIN
        }
        return null
    }
});
export default router;
