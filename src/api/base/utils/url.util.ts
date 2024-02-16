const isEmpty: (obj: unknown) => boolean = (obj) =>
  !obj || Object.keys(obj).length === 0;

export const withParams = <T>(url: string, params: T) => {
  const query =
    params &&
    !isEmpty(params) &&
    Object.keys(params)
      .map((k) => k + "=" + encodeURIComponent(params[k]))
      .join("&");

  return query ? `${url}?${query}` : url;
};
