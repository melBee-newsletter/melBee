/**
 * USER PORTAL TYPES/INTERFACES
 */
export interface expand {
  profile: boolean;
  contact: boolean;
  template: boolean;
  history: boolean;
  [key: string]: boolean;
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