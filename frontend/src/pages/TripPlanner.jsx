import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TripPlanner = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        city: "",
        days: "",
        budget: "moderate"
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.city.trim()) {
            setError("Please enter a city name");
            return;
        }
        if (!formData.days || formData.days < 1) {
            setError("Please enter a valid number of days");
            return;
        }

        const tripData = {
            ...formData,
            days: parseInt(formData.days)
        };

        navigate("/trip-results", { state: tripData });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError("");
    };

    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <div className="relative h-[40vh] bg-gradient-to-br from-primary/5 to-base-200">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-base-100/0 to-base-100"></div>
                <div className="relative h-full flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center px-4"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                            Plan Your Journey
                        </h1>
                        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                            Let AI craft your perfect travel experience
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Form Section */}
            <div className="max-w-2xl mx-auto px-4 -mt-16 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-base-100 rounded-2xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* City Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Destination</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Where do you want to go?"
                                        className="input input-bordered w-full focus:input-primary pl-12 bg-base-200/50"
                                        required
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🌍</span>
                                </div>
                            </div>

                            {/* Days Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Duration</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="days"
                                        value={formData.days}
                                        onChange={handleChange}
                                        placeholder="How many days?"
                                        className="input input-bordered w-full focus:input-primary pl-12 bg-base-200/50"
                                        min="1"
                                        required
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
                                </div>
                            </div>

                            {/* Budget Selection */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Budget</span>
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { value: "cheap", label: "Budget", icon: "💰" },
                                        { value: "moderate", label: "Moderate", icon: "💰💰" },
                                        { value: "luxury", label: "Luxury", icon: "💰💰💰" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex flex-col items-center">
                                            <input
                                                type="radio"
                                                name="budget"
                                                value={option.value}
                                                checked={formData.budget === option.value}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <div className={`p-4 rounded-xl w-full text-center cursor-pointer transition-all duration-300 ${
                                                formData.budget === option.value 
                                                    ? "bg-primary text-primary-content shadow-md" 
                                                    : "bg-base-200/50 hover:bg-base-200"
                                            }`}>
                                                <span className="text-xl mb-1 block">{option.icon}</span>
                                                <div className="font-medium">{option.label}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="alert alert-error shadow-sm"
                                >
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="btn btn-primary w-full shadow-sm"
                            >
                                Create Itinerary
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TripPlanner; 