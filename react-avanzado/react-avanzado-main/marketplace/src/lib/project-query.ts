export type SearchParamValue = string | string[] | undefined;

export type AdQuery = {
  query: string;
  order: "asc" | "desc";
  page: number;
  minPrice?: number;
  maxPrice?: number;
  tag: string;
};

export const AD_PAGE_SIZE = 6;
const PRISMA_INT_MAX = 2_147_483_647;

function first(value: SearchParamValue): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export function parseAdQuery(
  queryParams: Record<string, SearchParamValue>,
): AdQuery {
  const order = first(queryParams.order);
  const query = first(queryParams.query).trim();
  const tag = first(queryParams.tag).trim();

  const pageRaw = Number(first(queryParams.page));
  const minPriceValue = first(queryParams.minPrice);
  const maxPriceValue = first(queryParams.maxPrice);

  const minPriceRaw =
    minPriceValue === "" ? undefined : Number(minPriceValue);

  const maxPriceRaw =
    maxPriceValue === "" ? undefined : Number(maxPriceValue);

  return {
    order: order === "asc" ? "asc" : "desc",
    query,
    tag,
    page: Number.isInteger(pageRaw) && pageRaw >= 1 ? pageRaw : 1,
    minPrice:
      minPriceRaw !== undefined &&
      Number.isFinite(minPriceRaw) &&
      minPriceRaw >= 0
        ? minPriceRaw
        : undefined,
    maxPrice:
      maxPriceRaw !== undefined &&
      Number.isFinite(maxPriceRaw) &&
      maxPriceRaw >= 0
        ? maxPriceRaw
        : undefined,
  };
}

export function parseAdId(value: unknown): number | null {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const id = Number(value);

  return Number.isSafeInteger(id) && id <= PRISMA_INT_MAX ? id : null;
}

function adQueryParams(input: AdQuery, page: number) {
  const params = new URLSearchParams();

  if (input.query) params.set("query", input.query);
  if (input.tag) params.set("tag", input.tag);

  if (input.minPrice !== undefined) {
    params.set("minPrice", String(input.minPrice));
  }

  if (input.maxPrice !== undefined) {
    params.set("maxPrice", String(input.maxPrice));
  }

  if (input.order !== "desc") params.set("order", input.order);
  if (page > 1) params.set("page", String(page));

  return params;
}

export function adListHref(
  input: AdQuery,
  page = input.page,
): string {
  const queryString = adQueryParams(input, page).toString();

  return queryString ? `/?${queryString}` : "/";
}