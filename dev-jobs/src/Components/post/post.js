import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import styles from "./post.module.css";
import Button from "@mui/material/Button";
import axios from "../../Axios";

const Post = () => {
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("rating", data.rating);
        formData.append("image", data.image[0]);

        try {
            const response = await axios.post('/post/add', formData);
            console.log(response);
            reset(); // Сбросить значения полей формы после успешной отправки
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Paper classes={{ root: styles.root }}>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <TextField
                        className={styles.field}
                        type="text"
                        label="Title"
                        variant="standard"
                        fullWidth
                        {...register("title", { required: true })}
                    />
                    <TextField
                        className={styles.field}
                        type="number"
                        label="Price"
                        variant="standard"
                        fullWidth
                        {...register("price", { required: true })}
                    />
                    <TextField
                        className={styles.field}
                        type="rating"
                        label="Rating"
                        variant="standard"
                        fullWidth
                        {...register("rating", { required: true })}
                    />
                    <TextField
                        className={styles.field}
                        type="file"
                        variant="standard"
                        name="image"
                        fullWidth
                        {...register("image", { required: true })}
                    />
                    <TextField
                        className={styles.field}
                        label="Description"
                        multiline
                        rows={5}
                        fullWidth
                        {...register("description", { required: true })}
                    />
                    <Button type="submit" size="large" variant="contained" fullWidth>
                        Создать пост
                    </Button>
                </form>
            </Paper>
            <div>
            </div>
        </div>
    );
};

export default Post;
