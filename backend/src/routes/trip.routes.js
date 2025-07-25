import express from "express";
import { generateItinerary, chatWithTripAssistant } from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/generate", generateItinerary);
router.post("/chat", chatWithTripAssistant);

export default router; 