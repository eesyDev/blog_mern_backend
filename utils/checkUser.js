import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'seretkey');
            req.userId = decodedToken._id
            next();
        } catch (err) {
            res.status(402).json({
                message: 'No access'
            })
        }
    } else {
        res.status(403).json({
            message: 'Not valid access'
        })
    }
}