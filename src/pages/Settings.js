import { motion } from "framer-motion";

function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, x: window.innerWidth }}
    >
      Settings
    </motion.div>
  );
}

export default Settings;
