export const handleResponse = async <T, R>(
  action: Promise<Response>,
  adapter?: (data: T) => R
) => {
  const response = await action;

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return adapter ? adapter(result) : result;
};
