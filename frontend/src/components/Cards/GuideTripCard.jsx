import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaRupeeSign, FaStar } from 'react-icons/fa';

const GuideTripCard = ({ trip }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full">
            <div className="relative h-40">
                <img 
                    src={trip.image} 
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {trip.spotsLeft} spots left
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h2 className="text-xl font-bold text-white">{trip.destination}</h2>
                    <div className="flex items-center text-white/90 text-sm">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{trip.location}</span>
                    </div>
                </div>
            </div>
            
            <div className="p-4">
                <div className="flex items-center mb-3">
                    <img 
                        src={trip.guideImage} 
                        alt={trip.guideName}
                        className="w-10 h-10 rounded-full mr-3 border-2 border-primary"
                    />
                    <div>
                        <h3 className="font-semibold text-base">{trip.guideName}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span>4.8</span>
                            <span className="mx-1">•</span>
                            <span>Local Guide</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2 text-primary" />
                        <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FaUsers className="mr-2 text-primary" />
                        <span>Max {trip.maxGroupSize}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <div className="text-primary font-bold text-lg">
                        {trip.price}
                        <span className="text-gray-500 text-sm font-normal"> /person</span>
                    </div>
                    <button className="bg-primary/10 text-primary px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuideTripCard; 