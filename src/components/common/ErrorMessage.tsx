import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="alert alert-error shadow-lg max-w-md mx-auto my-8"
    >
      <div className="flex-1">
        <AlertCircle className="w-6 h-6" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-ghost">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      )}
    </motion.div>
  );
}
