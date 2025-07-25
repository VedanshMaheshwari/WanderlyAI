import UserCard from "../components/Cards/UserCard";
import GuideTripCard from "../components/Cards/GuideTripCard";
import TripAssistantCard from "../components/Cards/TripAssistantCard";
import useGetFeed from "../hooks/useGetFeed";
import { useGlobalStore } from "../store/useStore";
import "../styles/feed.css";

// Dummy data for guide trips
const dummyGuideTrips = [
    {
        id: 1,
        guideName: "Rajesh Kumar",
        guideImage: "https://randomuser.me/api/portraits/men/1.jpg",
        destination: "Kerala Backwaters",
        location: "Alleppey, Kerala",
        duration: "3 days, 2 nights",
        maxGroupSize: 6,
        spotsLeft: 4,
        price: "₹12,999",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Experience the serene backwaters of Kerala with a local guide. Stay in traditional houseboats, enjoy authentic Kerala cuisine, and explore the beautiful villages."
    },
    {
        id: 2,
        guideName: "Priya Sharma",
        guideImage: "https://randomuser.me/api/portraits/women/2.jpg",
        destination: "Rajasthan Heritage Tour",
        location: "Jaipur, Rajasthan",
        duration: "4 days, 3 nights",
        maxGroupSize: 7,
        spotsLeft: 5,
        price: "₹15,999",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Discover the royal heritage of Jaipur with a local expert. Visit magnificent palaces, explore local markets, and experience traditional Rajasthani culture."
    },
    {
        id: 3,
        guideName: "Arun Singh",
        guideImage: "https://randomuser.me/api/portraits/men/3.jpg",
        destination: "Goa Beach Adventure",
        location: "North Goa",
        duration: "5 days, 4 nights",
        maxGroupSize: 6,
        spotsLeft: 3,
        price: "₹18,999",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Experience the best of Goa with a local guide. Enjoy water sports, explore hidden beaches, and party at the best local spots."
    },
    {
        id: 4,
        guideName: "Meera Patel",
        guideImage: "https://randomuser.me/api/portraits/women/4.jpg",
        destination: "Himalayan Trek",
        location: "Manali, Himachal Pradesh",
        duration: "6 days, 5 nights",
        maxGroupSize: 8,
        spotsLeft: 6,
        price: "₹22,999",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Embark on an adventurous trek in the Himalayas. Experience breathtaking views, local culture, and challenging trails with an experienced guide."
    }
];

const Feed = () => {
    useGetFeed();
    const { feed } = useGlobalStore();

    return (
        <div className="flex-1 h-full flex flex-col items-center overflow-auto relative py-10 px-4">
            <div className="w-full max-w-7xl">
                {/* AI Trip Assistant Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-neutral-content">AI Trip Assistant</h2>
                    </div>
                    <TripAssistantCard />
                </div>

                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-neutral-content">Local Guide Trips</h2>
                        <button className="text-primary hover:text-primary/80 transition-colors">
                            View All Trips →
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dummyGuideTrips.map((trip) => (
                            <GuideTripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-neutral-content">Discover People</h2>
                        <button className="text-primary hover:text-primary/80 transition-colors">
                            View All →
                        </button>
                    </div>
                    {feed?.length === 0 ? (
                        <div className="text-center">
                            <h2 className="sm:text-3xl text-2xl font-bold text-neutral-content">No New Users Found!</h2>
                            <img
                                loading="lazy"
                                src="/assets/empty-feed.svg"
                                alt="user-not-found"
                                className="block mx-auto w-96"
                            />
                        </div>
                    ) : (
                        <div className="grid place-items-center">
                            {feed?.map((user) => (
                                <UserCard
                                    key={user._id}
                                    user={user}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feed;
