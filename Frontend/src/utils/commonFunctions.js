export const getInitials = (title) => {
    const words = title.split(' ');
    if (words.length > 1) {
      return words.slice(0, 2).map(word => word[0]).join('');
    }
    return title[0];
  };

 export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
  }