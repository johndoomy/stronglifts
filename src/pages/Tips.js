import { motion } from "framer-motion";
import SkeletonLoaderCard from "../components/SkeletonLoaderCard";

function Tips() {
  return (
    <motion.div
      className="pt-20"
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, x: window.innerWidth }}
    >
      <SkeletonLoaderCard />
    </motion.div>
  );
}

export default Tips;
