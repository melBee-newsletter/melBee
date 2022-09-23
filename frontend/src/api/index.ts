import axios, { AxiosResponse, AxiosError } from "axios";
const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

interface contact {
  email: string;
  id: number;
  is_subscribed: boolean;
}

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
        console.log(err.response!.data);
    });

    return emailFound;
};

/**
 * USER'S CONTACT LIST
 */

/**
 * Get all contacts and returns as subscribed and unsubscribed arrays of contacts
 * @returns 
 */
export const getContacts = async () => {
  const subscribedContacts: string[] = [];
  const unsubscribedContacts: string[] = [];
  await axios({
    method: "get",
    url: `${BASE_URL}/user/${sessionStorage.melbeeID}/contact_list/`,
  })
  .then((res: AxiosResponse) => {
    let data: contact[] = res.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_subscribed) subscribedContacts.push(data[i].email);
      if (!data[i].is_subscribed) unsubscribedContacts.push(data[i].email);
    };
  })
  .catch((err: AxiosError<{ error: string }>) => {
    console.log(err.response!.data);
  });
  return {subscribedContacts: subscribedContacts, unsubscribedContacts: unsubscribedContacts};
};

/**
 * Add multiple emails to user's contact list
 * @param email 
 * @returns 
 */
export const addContacts = async (emails: string[]) => {
  let newContacts;
  const data = {
    email: emails,
    user_id: sessionStorage.melbeeID,
    is_subscribed: true,
  };
  await axios({
    method: "post",
    url: `${BASE_URL}/user/contact_list`,
    data: data,
  })
  .then((res: AxiosResponse) => {
    newContacts = emails;
  })
  .catch((err: AxiosError<{ error: string }>) => {
    console.log(err.response!.data);
  });

  return newContacts;
};

/**
 * Add single emails to user's contact list
 * @param email 
 * @returns 
 */
 export const addContact = async (email: string) => {
  let addSuccess;
  const data = {
    email: email,
    user_id: sessionStorage.melbeeID,
    is_subscribed: true,
  };
  await axios({
    method: "post",
    url: `${BASE_URL}/user/contact_list`,
    data: data,
  })
  .then((res: AxiosResponse) => {
    addSuccess = true;
  })
  .catch((err: AxiosError<{ error: string }>) => {
    addSuccess = false;
    console.log(err.response!.data);
  });

  return addSuccess;
};

/**
 * Delete single/multiple emails from user's contact list
 * @param emails 
 * @returns 
 */
export const deleteContacts = async (emails: string[]) => {
  let deleteSuccess;
  await axios({
    method: "delete",
    url: `${BASE_URL}/user/contact_list`,
    params: {
      user_id: sessionStorage.melbeeID
    },
    data: emails
  })
  .then((res: AxiosResponse) => {
    deleteSuccess = true;
  })
  .catch((err: AxiosError<{ error: string }>) => {
    console.log(err.response!.data);
  });
  return deleteSuccess;
}