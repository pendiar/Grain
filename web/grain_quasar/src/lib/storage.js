const storage = (() => {
  if (window.localStorage) {
    return (name, value, endTime) => {
      if (name === undefined && value === undefined) return localStorage;
      if (value === undefined) return localStorage.getItem(name);
      if (value === 'remove' || endTime === 'remove') {
        localStorage.removeItem(name);
      } else {
        localStorage.setItem(name, value);
      }
      return null;
    };
  }
  const getCookie = () => {
    const result = {};
    document.cookie.split('; ').forEach((item) => {
      const splitIndex = item.indexOf('=');
      result[item.slice(0, splitIndex)] = item.slice(splitIndex + 1);
    });
    return result;
  };
  return (name, value, endTime) => {
    if (name === undefined && value === undefined) return getCookie();
    if (value === undefined) return getCookie()[name];
    if (value === 'remove' || endTime === 'remove') {
      const before = new Date();
      before.setDate(0);
      document.cookie = `${name}=${value};expires=${before.toGMTString()}`;
    } else {
      document.cookie = `${name}=${value}`;
    }
    return null;
  };
})();
export default storage;
