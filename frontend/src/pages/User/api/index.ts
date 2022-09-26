import axios, { AxiosResponse, AxiosError } from "axios";
import { contact, emailBody, sentHistory, history, templateToSave, template, externalInfo } from "../../../type";

const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:8000";

/**
 * USER'S CONTACT LIST
 */
export const contactAPI = {
  /**
   * Get all contacts and returns as subscribed and unsubscribed arrays of contacts
   * @returns 
   */
  get: async () => {
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
    });
    return {subscribedContacts: subscribedContacts, unsubscribedContacts: unsubscribedContacts};
  },

  /**
   * Add multiple emails to user's contact list
   * @param email 
   * @returns 
   */
  addMultiple: async (emails: string[]) => {
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
    });

    return newContacts;
  },

  /**
   * Add single emails to user's contact list
   * @param email 
   * @returns 
   */
  addSingle: async (email: string) => {
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
    });

    return addSuccess;
  },

  /**
   * Delete single/multiple emails from user's contact list
   * @param emails 
   * @returns 
   */
  delete: async (emails: string[]) => {
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
    });
    return deleteSuccess;
  },
};

/**
 * SENDING EMAIL
 */
export const emailAPI = {
  /**
   * Send email to selected receivers
   * @param emailBody
   * @returns 
   */
  send: async (emailBody: emailBody) => {
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
    });
    return sendComplete;
  },
};

/**
 * SENT HISTORY
 */
export const sentHistoryAPI = {
  /**
   * Save sent history after email is successfully sent
   * @param sentHistory 
   * @returns 
   */
  save: async (sentHistory: sentHistory) => {
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
    });
    return sentHistorySaved;
  },

  /**
   * Get user's all sent history
   * @returns 
   */
  get: async () => {
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
    });
    return sentHistory;
  },
};

/**
 * TEMPLATES
 */
export const templateAPI = {
  /**
   * Seed template when app loaded
   * @returns 
   */
  seed: async () => {
    axios({
      method: "post",
      url: `${BASE_URL}/template/seed`,
      data: "tomatoTest",
    })
    .catch((err: AxiosError<{ error: string }>) => {
      console.log(err.response!.data);
    });
  return true;
  },

  /**
   * Get melBee's Original Templates
   * @param id 
   * @returns 
   */
  getMelbee: async (id: number) => {
    const melbeeTemplates: template[] = [];
    await axios({
      method: "get",
      url: `${BASE_URL}/template/${id}`,
    })
    .then((res: AxiosResponse) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        melbeeTemplates.push(data[i]);
      }
    })
    .catch((err: AxiosError<{ error: string }>) => {
    });

    return melbeeTemplates;
  },

  /**
   * Get user's saved templates
   * @returns 
   */
  getMy: async () => {
    const myTemplates: template[] = [];
    await axios({
      method: "get",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template`,
    })
    .then((res: AxiosResponse) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        myTemplates.push(data[i]);
      }
    })
    .catch((err: AxiosError<{ error: string }>) => {
    });
    return myTemplates;
  },

  /**
   * Save edited page from preview page
   * @param templateToSave 
   * @returns 
   */
  saveMy: async (templateToSave: templateToSave) => {
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
    });
    return templateSaved;
  },

  /**
   * Deleted selected myTemplate from database
   * @param templateId 
   * @returns 
   */
  deleteMy: async (templateId: number) => {
    let deleted = false;
    await axios({
      method: "delete",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/template/${templateId}`,
    })
    .then((res: AxiosResponse) => {
      deleted = true;
    })
    .catch((err: AxiosError<{ error: string }>) => {
    });
    return deleted;
  },
};

/**
 * MARKETING TOOLS
 */
export const externalInfoAPI = {
  /**
   * Get user's external info
   * @returns
   */
  get: async () => {
    const externalInfo: externalInfo = {
      analytics: "",
      externalLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        homepage: "",
      },
    };
    await axios({
      method: "get",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/external_info`,
    })
    .then((res: AxiosResponse) => {
      let data = res.data;
      for (const info in data) {
        if (info !== "analytics") {
          externalInfo.externalLinks[info] = data[info];
        } else {
          externalInfo.analytics = data[info];
        };
      };
    })
    .catch((err: AxiosError<{ error: string }>) => {
    });
    return externalInfo;
  },
  /**
   * Update user's external info
   * @param externalInfo 
   * @returns 
   */
  update: async (externalInfo: externalInfo) => {
    let updated = false;
    await axios({
      method: "patch",
      url: `${BASE_URL}/user/${sessionStorage.melbeeID}/external_info`,
      data: externalInfo,
    })
    .then((res: AxiosResponse) => {
      updated = true;
    })
    .catch((err: AxiosError<{ error: string }>) => {
    });
    return updated;
  },
};