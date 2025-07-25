import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key
if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    throw new Error("GEMINI_API_KEY is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create a basic itinerary structure
const createBasicItinerary = (city, numDays, budget) => {
    const timeSlots = ['Morning', 'Afternoon', 'Evening'];
    const activities = {
        Morning: {
            title: "City Exploration",
            description: "Explore the city's main attractions",
            cost: budget === "cheap" ? "$0-20" : budget === "moderate" ? "$30-50" : "$100+"
        },
        Afternoon: {
            title: "Local Experience",
            description: "Experience local culture and cuisine",
            cost: budget === "cheap" ? "$10-30" : budget === "moderate" ? "$40-60" : "$150+"
        },
        Evening: {
            title: "Entertainment",
            description: "Enjoy local entertainment",
            cost: budget === "cheap" ? "$15-25" : budget === "moderate" ? "$50-70" : "$200+"
        }
    };

    const days = Array.from({ length: numDays }, (_, i) => ({
        day: i + 1,
        activities: timeSlots.map(time => ({
            time,
            ...activities[time]
        }))
    }));

    return {
        city,
        days: numDays,
        budget,
        days
    };
};

const generateItinerary = async (req, res) => {
    try {
        const { city, days, budget } = req.body;
        console.log("Received request:", { city, days, budget });

        if (!city || !days || !budget) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: city, days, and budget"
            });
        }

        const numDays = parseInt(days);
        if (isNaN(numDays) || numDays < 1) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid number of days"
            });
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            const prompt = `Create a ${numDays}-day travel itinerary for ${city} with ${budget} budget. Format the response as a JSON object with this exact structure:
{
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "time": "Morning",
          "title": "Activity Name",
          "description": "Brief activity description",
          "cost": "Estimated cost"
        },
        {
          "time": "Afternoon",
          "title": "Activity Name",
          "description": "Brief activity description",
          "cost": "Estimated cost"
        },
        {
          "time": "Evening",
          "title": "Activity Name",
          "description": "Brief activity description",
          "cost": "Estimated cost"
        }
      ]
    }
  ]
}

Important:
1. Return ONLY valid JSON, no additional text or markdown
2. Include exactly 3 activities per day (Morning, Afternoon, Evening)
3. Keep descriptions concise
4. Include realistic costs based on the budget level
5. Make sure the JSON is properly formatted with no trailing commas`;
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            console.log("Raw AI response:", text);

            // Clean the response text
            let cleanedText = text
                .replace(/```json\s*|\s*```/g, '') // Remove markdown code blocks
                .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes with straight quotes
                .replace(/[\u2018\u2019]/g, "'") // Replace smart single quotes
                .replace(/\n\s*\n/g, '\n') // Remove multiple newlines
                .trim();

            console.log("Cleaned text:", cleanedText);

            try {
                const aiItinerary = JSON.parse(cleanedText);
                console.log("Parsed AI itinerary:", aiItinerary);

                if (aiItinerary && Array.isArray(aiItinerary.days)) {
                    const structuredDays = aiItinerary.days.map((day, index) => {
                        // Ensure we have all three time slots
                        const morningActivity = day.activities.find(a => 
                            a.time.toLowerCase().includes('morning')) || {
                            time: 'Morning',
                            title: 'Morning Activity',
                            description: 'Explore the city',
                            cost: 'Varies'
                        };
                        
                        const afternoonActivity = day.activities.find(a => 
                            a.time.toLowerCase().includes('afternoon')) || {
                            time: 'Afternoon',
                            title: 'Afternoon Activity',
                            description: 'Local experience',
                            cost: 'Varies'
                        };
                        
                        const eveningActivity = day.activities.find(a => 
                            a.time.toLowerCase().includes('evening')) || {
                            time: 'Evening',
                            title: 'Evening Activity',
                            description: 'Night entertainment',
                            cost: 'Varies'
                        };

                        return {
                            day: index + 1,
                            activities: [
                                morningActivity,
                                afternoonActivity,
                                eveningActivity
                            ]
                        };
                    });

                    return res.status(200).json({
                        success: true,
                        data: {
                            city,
                            days: numDays,
                            budget,
                            days: structuredDays
                        }
                    });
                } else {
                    throw new Error("Invalid AI response structure");
                }
            } catch (parseError) {
                console.error("Parse error:", parseError);
                console.error("Failed to parse text:", cleanedText);
                throw new Error("Failed to parse AI response");
            }
        } catch (aiError) {
            console.warn("AI generation failed:", aiError);
            // Use basic itinerary as fallback
            const basicItinerary = createBasicItinerary(city, numDays, budget);
            return res.status(200).json({
                success: true,
                data: basicItinerary
            });
        }
    } catch (error) {
        console.error("Error generating itinerary:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate itinerary",
            error: error.message
        });
    }
};

const chatWithTripAssistant = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Please provide a message"
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `You are a helpful travel assistant. The user has asked: "${message}". 
        Provide a helpful, concise response focusing on travel advice, recommendations, or trip planning.
        Format your response in a clean, readable way:
        - Use bullet points (•) instead of asterisks (*)
        - Use proper spacing and line breaks
        - Keep paragraphs short and readable
        - Use emojis sparingly to make the response more engaging
        - Keep your response under 200 words
        - Make it engaging and informative`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the response text
        const cleanedResponse = text
            .replace(/\*\*/g, '') // Remove double asterisks
            .replace(/\*/g, '') // Remove single asterisks
            .replace(/•/g, '• ') // Ensure proper spacing after bullet points
            .replace(/\n\s*\n/g, '\n\n') // Normalize multiple newlines
            .trim();

        return res.status(200).json({
            success: true,
            data: {
                response: cleanedResponse
            }
        });

    } catch (error) {
        console.error("Error in chatWithTripAssistant:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get response from AI assistant"
        });
    }
};

export { generateItinerary, chatWithTripAssistant }; 