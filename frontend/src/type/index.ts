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
 * MARKETING TOOL
 */
export type SNS = {
  facebook: string;
  instagram: string;
  twitter: string;
}