import { useContext } from 'react';
import LoadingContext from '../context/loadingContext';

const useLoader = () => useContext(LoadingContext);

export default useLoader;