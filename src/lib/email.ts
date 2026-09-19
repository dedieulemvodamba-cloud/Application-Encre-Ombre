export interface EmailNotificationPayload {
  subject: string;
  user_email: string;
  message: string;
}

export async function sendNotificationEmail(payload: EmailNotificationPayload): Promise<void> {
  // Envoi de notification de commande (Webhook / Email Service / Log)
  try {
    // Si un endpoint webhook ou un service email est configuré via variable d'environnement ou API
    const webhookUrl = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_NOTIFICATION_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      console.log('[Notification Email/Order]', payload.subject, payload);
    }
  } catch (error) {
    console.warn('Avertissement envoi notification :', error);
  }
}
