import jwt from "jsonwebtoken";

export const identifier = (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization;
    } else if (req.cookies && req.cookies['Authorization']) {
        token = req.cookies['Authorization'];
    }

    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided. Unauthorized!' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
