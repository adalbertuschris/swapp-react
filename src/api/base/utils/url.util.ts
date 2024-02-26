const isEmpty: (obj: unknown) => boolean = (obj) =>
  !obj || Object.keys(obj).length === 0;

// TODO handle nested objects, arrays
export const withParams = <T>(url: string, params: T) => {
  if (!params || isEmpty(params)) {
    return url || "";
  }

  const query = Object.keys(params)
    .map((k) => k + "=" + encodeURIComponent(params[k]))
    .join("&");

  return `${url || ""}?${query}`;
};
