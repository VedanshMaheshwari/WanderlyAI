import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Common/Loader";

const TripResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [itinerary, setItinerary] = useState(null);
    const [error, setError] = useState(null);

    const generateItinerary = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!location.state) {
                navigate("/trip-planner");
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trip/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(location.state),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Failed to get response from server");
            }

            if (!data.success) {
                throw new Error(data.message || "Failed to generate itinerary");
            }

            setItinerary(data.data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateItinerary();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-base-300">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-8 bg-base-100 rounded-2xl shadow-xl"
                >
                    <Loader />
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-lg"
                    >
                        Planning your perfect trip...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-base-300">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full mx-auto p-6 bg-error/10 rounded-lg"
                >
                    <h2 className="text-xl font-bold text-error mb-4">Oops! Something went wrong</h2>
                    <p className="text-error mb-4">{error}</p>
                    <div className="flex justify-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-primary"
                            onClick={generateItinerary}
                        >
                            Try Again
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-ghost"
                            onClick={() => navigate("/trip-planner")}
                        >
                            Back
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-base-300">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-8 bg-base-100 rounded-2xl shadow-xl"
                >
                    <p className="text-lg mb-4">No itinerary data available</p>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn btn-primary"
                        onClick={() => navigate("/trip-planner")}
                    >
                        Create New Itinerary
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-base-300 py-8">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-primary mb-2"
                        >
                            Your Trip to {itinerary.city}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-base-content/70"
                        >
                            {itinerary.days?.length} days of amazing experiences
                        </motion.p>
                    </div>

                    {/* Itinerary Cards */}
                    <div className="space-y-6">
                        {itinerary.days?.map((day, dayIndex) => (
                            <motion.div
                                key={dayIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: dayIndex * 0.1 }}
                                className="bg-base-100 rounded-2xl shadow-xl overflow-hidden"
                            >
                                <div className="bg-primary/10 p-4">
                                    <h2 className="text-2xl font-semibold text-primary">
                                        Day {day.day}
                                    </h2>
                                </div>
                                
                                <div className="p-6 space-y-6">
                                    {day.activities?.map((activity, actIndex) => (
                                        <motion.div
                                            key={actIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (dayIndex * 0.1) + (actIndex * 0.1) }}
                                            className="flex gap-4 items-start"
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <span className="text-2xl">
                                                    {activity.time === 'Morning' ? '🌅' : 
                                                     activity.time === 'Afternoon' ? '☀️' : '🌙'}
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-medium">{activity.title}</h3>
                                                        <p className="text-base-content/70 mt-1">{activity.description}</p>
                                                    </div>
                                                    <span className="badge badge-primary">{activity.cost}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex justify-center gap-4"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-primary"
                            onClick={() => navigate("/trip-planner")}
                        >
                            Plan Another Trip
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-outline"
                            onClick={() => window.print()}
                        >
                            Print Itinerary
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default TripResults; 