
import { toast as sonnerToast } from "sonner";

// Create a wrapper that matches the expected interface
export const toast = (options: { 
  title?: string; 
  description?: string; 
  variant?: 'default' | 'destructive' 
}) => {
  if (options.title && options.description) {
    // Use title as main message and description in options
    return sonnerToast(options.title, {
      description: options.description,
      style: options.variant === 'destructive' ? { 
        background: '#fee2e2', 
        color: '#991b1b',
        border: '1px solid #fecaca' 
      } : undefined
    });
  } else if (options.description) {
    // Use description as main message
    return sonnerToast(options.description, {
      style: options.variant === 'destructive' ? { 
        background: '#fee2e2', 
        color: '#991b1b',
        border: '1px solid #fecaca' 
      } : undefined
    });
  } else if (options.title) {
    // Use title as main message
    return sonnerToast(options.title, {
      style: options.variant === 'destructive' ? { 
        background: '#fee2e2', 
        color: '#991b1b',
        border: '1px solid #fecaca' 
      } : undefined
    });
  }
  
  return sonnerToast("Notification");
};

// Create a simple useToast hook that returns the toast function
export const useToast = () => {
  return { 
    toast,
    toasts: [] // Add this property to match expected interface
  };
};
