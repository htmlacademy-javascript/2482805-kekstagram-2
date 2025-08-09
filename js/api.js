const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные');
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

const sendData = async (body) => {
  try {
    const response = await fetch(
      BASE_URL,
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить форму');
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getData, sendData };
