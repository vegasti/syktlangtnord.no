type AirtableResponse = {
  id: string;
  createdTime: string;
  fields: Record<string, unknown>;
};

type ListResponse<T> = {
  records: { id: string; fields: T; createdTime: string }[];
  offset?: string;
};

function envOrThrow() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) {
    throw new Error(
      "Airtable er ikke konfigurert (AIRTABLE_API_KEY eller AIRTABLE_BASE_ID mangler).",
    );
  }
  return { apiKey, baseId };
}

export async function createRecord(
  tableName: string,
  fields: Record<string, unknown>,
): Promise<AirtableResponse> {
  const { apiKey, baseId } = envOrThrow();

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

export async function listRecords<T = Record<string, unknown>>(
  tableName: string,
  options: { revalidate?: number } = {},
): Promise<{ id: string; fields: T }[]> {
  const { apiKey, baseId } = envOrThrow();
  const revalidate = options.revalidate ?? 600;

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?pageSize=100`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Airtable list feil ${res.status}: ${errorText}`);
  }

  const data = (await res.json()) as ListResponse<T>;
  return data.records.map((r) => ({ id: r.id, fields: r.fields }));
}
