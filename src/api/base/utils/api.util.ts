export const handleResponse = async <T>(
  action: Promise<Response>,
  adapter?: (data: Promise<T>) => T
) => {
  try {
    const response = await action;

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.ok && adapter(await response.json());
  } catch (error) {
    console.log(error);
  }
};
