import axios, { AxiosResponse, AxiosError } from "axios";
const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

/**
 * USER LOGIN & SIGNUP
 */

/**
 * Check if email is registered as user or not to redirect login OR signup
 * @param email 
 * @returns 
 */
export const checkEmail = async (email: string) => {
    let emailFound = false;
    await axios({
        method: "post",
        url: `${BASE_URL}/user/check`,
        data: {
          email: email,
        },
      })
    .then((res: AxiosResponse) => {
        if (res.data["isUserSignnedUp"] === true) emailFound = true;
    })
    .catch((err: AxiosError<{ error: string }>) => {
    });

    return emailFound;
};
