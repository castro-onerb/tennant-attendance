import { motion } from 'framer-motion';
import { Triage } from '.';

export default function TriageWrapper() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Triage />
    </motion.div>
  );
}
