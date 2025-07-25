import { IoCode } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { FiZap } from "react-icons/fi";

const AboutSection = () => {
    return (
        <section className="py-10">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Wanderly?</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Your AI-powered travel companion. Whether you're looking for personalized trip planning, travel buddies, or local expertise,
                            we've got you covered.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="flex flex-col justify-between space-y-4 border border-primary/40 p-6 rounded-xl min-h-[250px]">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                                <IoCode className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">AI Trip Planning</h3>
                                <p className="text-muted-foreground sm:text-base text-sm">
                                    Get personalized itineraries crafted by AI based on your preferences, budget, and travel style.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-4 border border-primary/40 p-6 rounded-xl min-h-[250px]">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                                <HiUsers className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Travel Companion Matching</h3>
                                <p className="text-muted-foreground sm:text-base text-sm">
                                    Find like-minded travelers with our intuitive swiping interface. Connect with potential travel buddies instantly.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-4 border border-primary/40 p-6 rounded-xl min-h-[250px]">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                                <FiZap className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Local Guide Experience</h3>
                                <p className="text-muted-foreground sm:text-base text-sm">
                                    Connect with local guides who create custom group itineraries for authentic travel experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
