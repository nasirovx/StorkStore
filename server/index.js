import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { registerValidation, loginValidation } from './validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, ProductController, PostController } from './controllers/index.js';
import adminRouter from "./router/admin-router.js";

mongoose.connect('mongodb+srv://bekastan:bekastan@cluster0.m5jnqlq.mongodb.net/PikoStore?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch(() => console.log('DB error'));


const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "avatarUrl") {
            cb(null, "uploads/avatar/");
        } else if (file.fieldname === "image") {
            cb(null, "uploads/posts/");
        } else {
            cb(new Error("Invalid file type"))
        }
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name =
            file.originalname.replace(ext, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, name + ext);
    }
});

const fileFilter = function (req, file, cb) {
    if (file.fieldname === "avatarUrl") {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Only avatar with JPEG,JPG or PNG format are allowed."));
    } else if (file.fieldname === "image") {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Only avatar with JPEG,JPG or PNG format are allowed."));
    } else {
      cb(new Error("Invalid file type"));
    }
  };

const upload = multer({ storage, fileFilter });
app.use("/uploads", express.static("uploads"));


//? admin panel route
app.use("/admin", adminRouter);

//? post panel
app.post("/post/add", checkAuth, handleValidationErrors, upload.single("image"), PostController.createPost);
app.get("/post", PostController.getPost);
app.get("/post/all", PostController.getAllPost);
app.delete("/post/delete/:id", PostController.deletePost);
app.patch("/post/update/:id", upload.single("image"), PostController.updatePost);
app.get("/post/:id", PostController.getPostById);


app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/products/:id', ProductController.getOne);
app.get('/products', ProductController.getAll);
app.delete('/products/:id', checkAuth, handleValidationErrors, ProductController.remove);
app.post("/products", checkAuth, handleValidationErrors, ProductController.createPost);

const PORT = 4444;
app.listen(PORT, () => {
    console.log(`listening on post ${PORT}`);
});
