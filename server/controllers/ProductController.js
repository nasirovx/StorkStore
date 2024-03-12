import ProductModel from '../models/Product.js'
export const getAll = async (req, res) => {
  try {
    const posts = await ProductModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await ProductModel.findOne({ _id: postId }).populate('user').exec();

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await ProductModel.findOneAndDelete({ _id: postId }).exec();

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};



export const createPost = async (req, res) => {
  console.log("Received request body:", req.body); // Добавляем вывод тела запроса в консоль
  try {
      const post = new ProductModel({
          id: req.body.id,
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          rating: req.body.rating,
          brand: req.body.brand,
          topprice: req.body.topprice,
          planprice: req.body.planprice,
          installment: req.body.installment,
          discountPercentage: req.body.discountPercentage,
          images: req.body.images,
          user: req.userId,
      });
      await post.save();
      res.status(201).json(post);
  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: "Не удалось создать Пост",
      });
  }
};



