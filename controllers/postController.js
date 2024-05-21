import Post from "../models/Post.js";

export const create = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        const post = await doc.save();

        res.status(201).json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Cerate error"})
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('user');

        res.json({posts})
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Not found"})
    }
}

export const getOne = async (req, res) => {
    const postId = req.params.id;
    try {
        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {viewsCount : 1}
            },
            {
                new: true
            }
        )

        res.json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Error updating post"})
    }
}

export const update = async (req, res) => {
    const postId = req.params.id
    try {
        await Post.updateOne(
            {_id : postId},
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl
            }
        );

        res.json({sucess: true});
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Error updating post"})
    }
}