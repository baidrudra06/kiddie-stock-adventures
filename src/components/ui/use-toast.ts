
import { toast as sonnerToast } from "sonner";

// Simple re-export to avoid circular dependency
export const toast = sonnerToast;

// Create a simple useToast hook that returns the toast function
export const useToast = () => {
  return { 
    toast: sonnerToast,
    toasts: [] // Add this property to match expected interface
  };
};
