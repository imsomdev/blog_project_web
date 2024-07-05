export const setLocalValue = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalValue = (key: string) => {
  return JSON.parse(localStorage.getItem(key)!);
};
