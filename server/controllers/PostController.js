import PostModel from "../models/Post.js";

export const createPost = async (req, res) => {
    // console.log("req.body>>>", req.body);
    try {
        const post = new PostModel({
            owner: req.userId,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            user: req.userId,
            image: req.file ? `http://localhost:4444/${req.file.path}` : null,
        });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: "Не удалось создать Пост",
        });
    }
};

export const getPost = async (req, res) => {
    try {
        const { userId } = req.query;
        const posts = await PostModel.find({ owner: userId });
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const getAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await PostModel.findByIdAndDelete(id);

        if (deletedPost) {
            res.status(200).json({
                message: "Пост успешно удален",
                deletedPost,
            });
        } else {
            res.status(404).json({
                message: "Пост не найден",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Не удалось удалить пост",
            error: err.message,
        });
    }
};


export const updatePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await PostModel.findByIdAndUpdate(postId, {
            owner: req.userId,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            image: req.file ? `http://localhost:4444/${req.file.path}` : null,
        });

        if (!post) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Не удалось обновить пост' });
    }
};

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Пост не найден" });
        }

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении поста" });
    }
};