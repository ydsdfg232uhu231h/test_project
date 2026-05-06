import { useNavigate } from 'react-router-dom'

const useNavigatehelper = () => {
    const navigate = useNavigate();
   return (path)=> {navigate(path)};
}

export default useNavigatehelper;