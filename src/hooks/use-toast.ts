
import { toast as sonnerToast, type ToastT } from "sonner";
import { useToast as useHookToast } from "@/components/ui/use-toast";

// Re-export the toast component from sonner for easy access
export const toast = sonnerToast;

// Re-export the useToast hook
export const useToast = useHookToast;
