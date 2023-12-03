import { Alert, Snackbar } from '@mui/material';
import useAlert from '../hooks/useAlert';

const AlertPopup = () => {
    const { text, type } = useAlert();

    if (text && type) {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open
            >
                <Alert
                    severity={type}
                    variant="filled"
                >
                    {text}
                </Alert>
            </Snackbar>
        );
    } else {
        return <></>;
    }
};

export default AlertPopup;