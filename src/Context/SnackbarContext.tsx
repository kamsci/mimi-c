import { createContext, useState } from 'react';

interface SnackbarProps {
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
    anchorOrigin: { vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' };
}

const defaultSnackbarProps: SnackbarProps = {
    message: '',
    severity: 'info',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
};

interface SnackbarContextType {
    anchorOrigin: { vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' };
    closeSnackbar: () => void;
    message: string;
    open: boolean;
    openSnackbar: (props: SnackbarProps) => void;
    severity: 'success' | 'info' | 'warning' | 'error';
}

// Snackbar context
const SnackbarContext = createContext({});


// Snackbar provider
function SnackbarProvider({ children }: { children: React.ReactNode }) {
    // Snackbar state
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(defaultSnackbarProps.message);
    const [severity, setSeverity] = useState
        <'success' | 'info' | 'warning' | 'error'> // severity options
        (defaultSnackbarProps.severity); // default is info
    const [anchorOrigin, setAnchorOrigin] = useState
        <{ vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' }> // vertical and horizontal options
        (defaultSnackbarProps.anchorOrigin); // default is top right

    // Snackbar functions
    function openSnackbar({ message, severity, anchorOrigin }: SnackbarProps) {
        console.log('openSnackbar');
        message && setMessage(message);
        severity && setSeverity(severity);
        anchorOrigin && setAnchorOrigin(anchorOrigin);
        setOpen(true);
    }

    function closeSnackbar({ message, severity, anchorOrigin }: SnackbarProps) {
        message && setMessage(defaultSnackbarProps.message);
        severity && setSeverity(defaultSnackbarProps.severity);
        anchorOrigin && setAnchorOrigin(defaultSnackbarProps.anchorOrigin);
        setOpen(false);
    }

    return (
        <SnackbarContext.Provider value={{
            anchorOrigin,
            closeSnackbar,
            message,
            open,
            openSnackbar,
            severity,
        }}>
            {children}
        </SnackbarContext.Provider>
    );
}

export  {
    SnackbarContext,
    SnackbarProvider,
};
export type { 
    SnackbarProps,
    SnackbarContextType, 
};