import { useContext } from 'react';
import AlertContext from '../context/alertContext';

const useAlert = () => useContext(AlertContext);

export default useAlert;