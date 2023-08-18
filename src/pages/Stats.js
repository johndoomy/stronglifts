import { motion } from "framer-motion";

function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, x: window.innerWidth }}
    >
      STATS
    </motion.div>
  );
}

export default Stats;
