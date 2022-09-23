import axios, { AxiosResponse, AxiosError } from "axios";
const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";


export const validateUserContact = async (user_id: number, receiver_id: number) => {
    let isValid = false;
    await axios ({
        method: "post",
        url:  `${BASE_URL}/user/contact_list/check`,
        params: {
            user_id,
            receiver_id,
        }
    }).then((res: AxiosResponse) => {
         isValid = true;
    }).catch((err: AxiosError<{ error: string }>) => {
        console.log(err.response!.data);
    });
    return isValid;
};

/**
 * Unsubscription request to change is_subscribed status from true to false
 * @param user_id 
 * @param receiver_id 
 * @param receiver_email 
 * @returns 
 */
export const unsubscribeContact = async (user_id: number, receiver_id: number, receiver_email: string) => {
    let status = false;
    await axios({
        method: "patch",
        url: `${BASE_URL}/user/contact/unsubscribe`,
        params: {
            receiver_email,
            receiver_id,
            user_id,
        }
    })
    .then((res: AxiosResponse) => {
        status = true;
    })
    .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.response!.data);
    });
    return status;
};

/**
 * Send unsubscribed notification to melbee.noreply@gmail.com account as record
 * @param email 
 * @param allGivenReasons 
 */
export const sendUnsubscribeNotification = (email: string, allGivenReasons: string[]) => {
    const data = {
        email: ["melbee.noreply@gmail.com"],
        subject: `Notification of unsubscribed contact <${email}> from melBee`,
        message_body: `${email} has unsubscribed from your mailing list with the following reason: ${allGivenReasons})}.`,
        user_id: sessionStorage.melbeeID,
    };

    axios({
        method: "post",
        url: `${BASE_URL}/email/send`,
        data: data,
    })
    .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.response!.data);
    });
};
