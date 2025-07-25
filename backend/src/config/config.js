import "dotenv/config";

export const PORT = process.env.PORT,
    MONGODB_URL = process.env.MONGODB_URI || process.env.MONGODB_URL,
    JWT_SECRET = process.env.JWT_SECRET,
    FRONTEND_URL = process.env.FRONTEND_URL,
    GEMINI_API_KEY = process.env.GEMINI_API_KEY;
