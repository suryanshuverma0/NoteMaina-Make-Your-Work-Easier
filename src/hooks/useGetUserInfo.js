export const useGetUserInfo = () => {
  const userInfoString = localStorage.getItem("auth");
  if (userInfoString) {
    const { name, profilePhoto, email, userID, isAuth ,emailVerified } =
      JSON.parse(userInfoString);
    return { name, profilePhoto, email, userID, isAuth,emailVerified };
  } else {
    return {
      name: null,
      profilePhoto: null,
      email: null,
      userID: null,
      isAuth: false,
      emailVerified:false,
    };
  }
};
