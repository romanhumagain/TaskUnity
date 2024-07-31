import { useAuth } from "../context/AuthContext";

const useAuthUser = () => {

  const {authUserProfile} = useAuth()
  return authUserProfile;
}

export default useAuthUser;