const jwt = require('jsonwebtoken');

function authenticator(req, res, next) {
    console.log("🟡 [AUTH] Authenticator function called."); // Log when the function is triggered

    const token = req.headers['authorization'];

    if (!token) {
        console.log("🚫 [AUTH] No token provided.");
        return res.status(403).json({ err: 'Missing token' });
    }

    console.log("🔍 [AUTH] Received Token:", token);

    // Ensure token is in correct format
    const formattedToken = token.startsWith("Bearer ") ? token.slice(7).trim() : token;

    console.log("🔍 [AUTH] Formatted Token:", formattedToken);

    // Verify token
    jwt.verify(formattedToken, process.env.SECRET_TOKEN, async (err, decoded) => {
        if (err) {
            console.log("❌ [AUTH] Invalid token:", err.message);
            return res.status(403).json({ err: 'Invalid token' });
        } 
        
        console.log("✅ [AUTH] Token Verified! Decoded User Data:", decoded);
        
        // Attach user info to `req` for further use
        req.user = decoded;

        next(); // Proceed to next middleware
    });
}

module.exports = authenticator;
