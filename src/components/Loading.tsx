import { faSpinner } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <motion.div
      animate="spin"
      variants={{
        spin: { rotate: 360 },
      }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="mr-2"
    >
      <FontAwesomeIcon icon={faSpinner} />
    </motion.div>
  );
};
