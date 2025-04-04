import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900 px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-heading font-bold text-primary dark:text-primary-light">404</h1>
          <div className="h-2 w-24 bg-primary dark:bg-primary-light mx-auto rounded-full mb-6"></div>
          <h2 className="text-3xl font-heading font-bold text-surface-800 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-300 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="btn btn-primary w-full sm:w-auto"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline w-full sm:w-auto"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;