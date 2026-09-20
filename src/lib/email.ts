import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_7to6oli';
const TEMPLATE_ID = 'template_ej0jv6o';
const PUBLIC_KEY = 'GVpIHnyuUKThnf0j3';

let initialized = false;
function ensureInit() {
  if (!initialized) {
    emailjs.init({ publicKey: PUBLIC_KEY });
    initialized = true;
  }
}

export interface NotificationEmailParams {
  subject: string;
  user_email: string;
  message: string;
}

export type EmailNotificationPayload = NotificationEmailParams;

export async function sendNotificationEmail(params: NotificationEmailParams): Promise<void> {
  ensureInit();
  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    subject: params.subject,
    user_email: params.user_email,
    message: params.message,
  });
}
