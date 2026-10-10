const ORDER_EMAIL = 'luneashope@gmail.com';

export interface OrderEmailPayload {
  firstName: string;
  lastName: string;
  phone: string;
  wilaya: string;
  orderDetails: string;
  total: string;
  itemCount: number;
}

function buildFormSubmitBody(payload: OrderEmailPayload) {
  return {
    _subject: `Nouvelle Commande Lunéa - ${payload.firstName} ${payload.lastName}`,
    _template: 'table',
    _captcha: 'false',
    Prénom: payload.firstName,
    Nom: payload.lastName,
    Téléphone: payload.phone,
    Wilaya: payload.wilaya,
    'Détails commande': payload.orderDetails,
    'Total (DA)': payload.total,
    'Nombre articles': payload.itemCount,
  };
}

async function parseFormSubmitResponse(response: Response): Promise<void> {
  if (!response.ok) {
    throw new Error('Failed to send order email');
  }

  const data = (await response.json()) as { success?: string | boolean; message?: string };

  if (data.success !== 'true' && data.success !== true) {
    throw new Error(data.message || 'Failed to send order email');
  }
}

export async function sendOrderEmail(payload: OrderEmailPayload): Promise<void> {
  const body = buildFormSubmitBody(payload);

  if (import.meta.env.DEV) {
    const response = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await parseFormSubmitResponse(response);
    return;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  await parseFormSubmitResponse(response);
}
