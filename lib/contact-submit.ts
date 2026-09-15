// La clé publique Web3Forms reste dans le formulaire. Aucun secret côté client.
export async function submitContact(
  data: FormData,
  send: typeof fetch = fetch,
  timeoutMs = 15000,
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await send("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.status === 429
        ? "Trop de tentatives rapprochées. Patientez un moment avant de réessayer."
        : "L’envoi n’a pas pu être confirmé. Merci de réessayer.");
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("success" in result) || result.success !== true) {
      throw new Error("L’envoi n’a pas pu être confirmé. Merci de réessayer.");
    }
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Le service met trop de temps à répondre. Nous ne pouvons pas confirmer l’envoi.");
    }
    if (error instanceof TypeError || error instanceof SyntaxError) {
      throw new Error("Impossible de confirmer l’envoi. Vérifiez votre connexion et réessayez.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
