import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-slate-800 to-black text-gray-100">
      <div className="text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl font-bold text-teal-400 drop-shadow-md animate-bounce">
          Welcome!!
        </h1>
        <p className="text-gray-300 text-xl sm:text-2xl tracking-wide">
          Explore your Latest Scores
        </p>
        <Link
          to="./leaderboard"
          className="inline-block px-8 py-3 mt-6 text-base sm:text-lg font-medium rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 transition-transform transform hover:scale-105 shadow-lg"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default Home;