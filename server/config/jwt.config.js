const jwt = require("jsonwebtoken");

module.exports = {
    authenticate(req, res, next) {
        jwt.verify(
            req.cookies.usertoken,
            process.env.USER_TOKEN_SECRET,
            (err, payload) => {
                if (err) {
                    console.log(err);
                    res.status(403).json({ verified: false });
                } else {
                    console.log("Successfully authenticated");
                    next();
                }
            }
        );
    },
};
