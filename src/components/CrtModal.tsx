import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CrtModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CrtModal = ({ open, onClose, children }: CrtModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* CRT TV Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scaleX: 0, scaleY: 0.005, opacity: 1 }}
              animate={{
                scaleX: [0, 1, 1],
                scaleY: [0.005, 0.005, 1],
                opacity: 1,
              }}
              exit={{
                scaleY: [1, 0.005, 0.005],
                scaleX: [1, 1, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.4, 1],
                ease: "easeInOut",
              }}
              className="relative w-full max-w-lg pointer-events-auto rounded-xl bg-card border border-border overflow-hidden"
              style={{
                boxShadow:
                  "0 0 40px hsl(var(--primary) / 0.15), 0 0 80px hsl(var(--primary) / 0.05), inset 0 0 60px hsl(var(--primary) / 0.03)",
              }}
            >
              {/* Scanline overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.1) 2px, hsl(var(--foreground) / 0.1) 4px)",
                }}
              />

              {/* Glow line animation */}
              <motion.div
                initial={{ top: "-4px" }}
                animate={{ top: "100%" }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute left-0 right-0 z-10 h-[2px] opacity-20"
                style={{
                  background: `linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-20 p-1.5 rounded-md bg-secondary/80 text-secondary-foreground hover:bg-accent transition-colors"
              >
                <X size={16} />
              </button>

              {/* Content */}
              <div className="relative z-[5] p-6 pt-10">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CrtModal;
