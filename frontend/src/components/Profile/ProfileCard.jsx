import { truncateString } from "../../utils/truncateString";

const ProfileCard = ({ user }) => {
    const { name, about, age, gender, photoUrl } = user;

    return (
        <div
            draggable={false}
            className="max-w-sm border border-gray-200 rounded-lg overflow-hidden pointer-events-none lg:block hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col h-full bg-base-100 shadow-lg">
                <div className="relative">
                    <img
                        src={photoUrl}
                        draggable="false"
                        loading="lazy"
                        className="h-[60%] w-full object-cover"
                        alt="user"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">{name}</h2>
                        <p className="text-white/80 text-sm">{`${age}, ${gender}`}</p>
                    </div>
                </div>
                <div className="p-6 bg-base-200 flex flex-col justify-between h-[40%]">
                    <div>
                        <p className="text-gray-700 text-base leading-relaxed">{truncateString(about, 50) || "No description available"}</p>
                    </div>
                    <div className="card-actions hidden sm:flex justify-between space-x-2 mt-4">
                        <button className="btn btn-outline btn-error btn-sm sm:btn-md flex-1">Not Interested</button>
                        <button className="btn btn-primary btn-sm sm:btn-md flex-1">Connect</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
