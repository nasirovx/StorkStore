import React, { useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import styles from "./change-post.module.css";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ChangePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/post/${id}`);
                const { title, rating, price, description } = response.data;
                setValue("title", title);
                setValue("rating", rating);
                setValue("price", price);
                setValue("description", description);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [id, setValue]);

    const handleUpdatePost = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("price", data.price);
            formData.append("rating", data.rating);
            formData.append("image", data.image[0]);
            formData.append("description", data.description);

            const updateData = await axios.patch(`/post/update/${id}`, formData);
            console.log("response update>>>>", updateData);
            navigate(`/`)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <form onSubmit={handleSubmit(handleUpdatePost)} encType="multipart/form-data">
                <TextField
                    className={styles.field}
                    type='text'
                    variant='standard'
                    fullWidth
                    {...register("title")}
                />
                <TextField
                    className={styles.field}
                    type='text'
                    variant='standard'
                    fullWidth
                    {...register("rating")}
                />
                <TextField
                    className={styles.field}
                    type='text'
                    variant='standard'
                    fullWidth
                    {...register("price")}
                />
                <TextField
                    className={styles.field}
                    type='file'
                    label='Image'
                    variant='standard'
                    name='image'
                    fullWidth
                    {...register("image")}
                />
                <TextField
                    className={styles.field}
                    multiline
                    rows={5}
                    fullWidth
                    {...register("description")}
                />
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Обновить пост
                </Button>
            </form>
        </Paper>
    );
}

export default ChangePost;
