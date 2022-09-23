import axios, { AxiosResponse, AxiosError } from "axios";
const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

interface contact {
  email: string;
  id: number;
  is_subscribed: boolean;
};

interface emailBody {
    email: string[],
    subject: string,
    message_body: string,
    user_id: number,
};

interface sentHistory {
  subject: string,
  recipients: string,
  template: string,
  date_sent: string,
  user_id: number,
}

type history = {
  date_sent: string;
  recipients: string;
  template: string;
  subject: string;
};

interface templateToSave {
  title: string,
  thumbnail: string,
  body: string,
};

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

/**
 * SENDING EMAIL & SENT HISTORY
 */

/**
 * Send email to selected receivers
 * @param emailBody
 * @returns 
 */
export const sendEmail = async (emailBody: emailBody) => {
  let sendComplete = false;
  await axios({
    method: "post",
    url: `${BASE_URL}/email/newsletter`,
    data: emailBody,
  })
    .then((res: AxiosResponse) => {
      sendComplete = true;
    })
  .catch((err: AxiosError<{ error: string }>) => {
    console.log(err.response!.data);
  });
  return sendComplete;
};

/**
 * Save sent history after email is successfully sent
 * @param sentHistory 
 * @returns 
 */
export const saveSentHistory = async (sentHistory: sentHistory) => {
  let sentHistorySaved = false;
  await axios({
    method: "post",
    url: `${BASE_URL}/user/${sessionStorage.melbeeID}/sent_history`,
    data: sentHistory
  })
  .then((res: AxiosResponse) => {
    sentHistorySaved = true;
  })
  .catch((err: AxiosError<{ error: string }>) => {
    console.log(err.response!.data);
  });
  return sentHistorySaved;
};

/**
 * Get user's all sent history
 * @returns 
 */
export const getSentHistory = async () => {
  const sentHistory: history[] = [];
  await axios({
    method: "get",
    url: `${BASE_URL}/user/${sessionStorage.melbeeID}/sent_history`,
  })
  .then((res: AxiosResponse) => {
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
      sentHistory.push(data[i]);
    };
  })
  .catch((err: AxiosError<{ error: string }>) => {
    console.log(err.response!.data);
  });
  return sentHistory;
};

/**
 * TEMPLATES
 */

/**
 * Save edited page from preview page
 * @param templateToSave 
 * @returns 
 */
export const saveMyTemplate = async (templateToSave: templateToSave) => {
  let templateSaved = false;
  await axios({
    method: "post",
    url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
    data: templateToSave
  })
  .then((res: AxiosResponse) => {
    templateSaved = true;
  })
  .catch((err: AxiosError<{ error: string }>) => {
    console.log(err.response!.data);
  });
  return templateSaved;
};