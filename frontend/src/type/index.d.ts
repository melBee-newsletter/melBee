/**
 * EVENTS
 */
export type Event = {
  target: {
    value: string;
  };
};

export type clickEvent = {
  preventDefault: Function;
};

/**
 * USER PORTAL TYPES/INTERFACES
 */
export interface expand {
  marketingTool: boolean;
  contact: boolean;
  template: boolean;
  history: boolean;
  [key: string]: boolean;
};

/**
 * TEMPLATES TYPES/INTERFACES
 */
 export interface templateToSave {
  title: string,
  thumbnail: string,
  body: string,
};

export interface template {
  title: string,
  thumbnail: string,
  body: string,
  id: number,
};

/**
 * CONTACT LIST TYPES/INTERFACES
 */
export interface contact{
    email: string;
    id: number;
    is_subscribed: boolean;
};

/**
 * SENDING EMAIL & EMAIL HISTORY TYPES/INTERFACES
 */
export interface emailBody {
    email: string[],
    subject: string,
    message_body: string,
    user_id: number,
};

export interface sentHistory {
  subject: string,
  recipients: string,
  template: string,
  date_sent: string,
  user_id: number,
};

export type history = {
  date_sent: string;
  recipients: string;
  template: string;
  subject: string;
};

/**
 * MARKETING TOOL TYPES/INTERFACES
 */
export type SNS = {
  facebook: string;
  instagram: string;
  twitter: string;
};

export type externalInfo = {
  analyticsID: string;
  externalLinks: {
    facebookID: string;
    instagramID: string;
    twitterID: string;
    homepage: string;
    [key: string]: string;
  };
};

export type externalLinks = {
  facebookID: string;
  instagramID: string;
  twitterID: string;
  homepage: string;
};

export type allExternalInfo = {
  analyticsID: string;
  facebookID: string;
  instagramID: string;
  twitterID: string;
  homepage: string;
};

/**
 * PROPS
 */
export type Props = {
  email: {
    email: string;
  },
  loading: {
    word: string;
  },
  privacyPolicy: {
    displayPP: Function;
  },
  portal: {
    analytics: string;
    setAnalytics: Function;
    countSent: number;
    setCountSent: Function;
    reachLimit: boolean;
    sendLimit: number;
  },
  portalExpand: {
    expand: boolean;
    setExpand: Function;
  },
  csvReader: {
    setContactList: Function;
  },
  history: {
    history: history;
    i: number;
    viewHistory: boolean[];
    setViewHistory: Function;
  },
  sendComplete: {
    reachLimit: boolean;
    setSendComplete: Function;
  },
  sentHistory: {
    expand: boolean;
    setExpand: Function;
    setCountSent: Function;
  },
  template: {
    template: template;
  },
  preview: {
    reachLimit: boolean;
  },
  send: {
    analytics: string;
    reachLimit: boolean;
    setCountSent: Function;
  },
  marketingTool: {
    analytics: string;
    setAnalytics: Function;
    expand: boolean;
    setExpand: Function;
  },
};