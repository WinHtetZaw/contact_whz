export const setLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <Type>(key: string): null | Type => {
  const item = localStorage.getItem(key);
  if (item === null) {
    return null;
  }
  return JSON.parse(item);
};

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const handleLabelClick = (e: React.MouseEvent<HTMLElement>): void => {
  const target = e.target as HTMLElement;
  const nextElement = target.nextElementSibling as HTMLElement | null;

  if (nextElement && nextElement.childElementCount === 0) {
    nextElement && nextElement.focus();
  } else if (nextElement && nextElement.childElementCount > 0) {
    const input = nextElement.children[0] as HTMLInputElement;
    input.focus();
  }
};

export const validateEmail = (value: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(value);
};
