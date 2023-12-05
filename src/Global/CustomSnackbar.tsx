import { useContext } from 'react';
// Lib Components
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// Custom Context
import { SnackbarContext } from '../Context/SnackbarContext';

function CustomSnackbar() {
    const { anchorOrigin, message, open, closeSnackbar, severity } = useContext<any>(SnackbarContext);

    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            onClose={closeSnackbar}
            key={anchorOrigin.vertical + anchorOrigin.horizontal}
            message={severity ? '' : message}
        >
        { severity &&
            <Alert
                onClose={closeSnackbar}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        }
        </Snackbar>
    );
}

export default CustomSnackbar;
