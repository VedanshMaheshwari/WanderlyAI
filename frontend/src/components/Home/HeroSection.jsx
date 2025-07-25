import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";

const HeroSection = () => {
    return (
        <section className="py-10">
            <div className="flex lg:flex-row lg:gap-0 gap-7 flex-col items-center justify-center container mx-auto">
                <div className="flex-1 space-y-3">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Plan Your Perfect Trip with AI</h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        Get personalized travel itineraries powered by AI. Just tell us your destination, duration, and budget, and we'll create the perfect trip plan for you.
                    </p>
                    <div className="flex gap-4 items-center mt-5">
                        <Link to="/trip-planner">
                            <button className="btn btn-primary w-36 h-11">
                                Get Started
                                <FaArrowRight />
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="btn btn-dash w-36 h-11">Learn more</button>
                        </Link>
                    </div>
                </div>
                <div className="flex-1">
                    <img
                        src="/assets/hero-img.png"
                        loading="lazy"
                        alt="hero-img"
                        className="block mx-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
