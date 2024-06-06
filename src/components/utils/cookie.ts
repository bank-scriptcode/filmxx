export const deleteCookie = async (name: any) => {
  setCookie(name, null, 0);
};

export const setCookie = async (name: any, value: any, daysToExpire: any) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";

  document.cookie = cookieValue;
};

export const getCookie = async (name: any) => {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};
