type AirtableResponse = {
  id: string;
  createdTime: string;
  fields: Record<string, unknown>;
};

export async function createRecord(
  tableName: string,
  fields: Record<string, unknown>,
): Promise<AirtableResponse> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error(
      "Airtable er ikke konfigurert (AIRTABLE_API_KEY eller AIRTABLE_BASE_ID mangler).",
    );
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Airtable API feil ${res.status}: ${errorText}`);
  }

  return res.json();
}
