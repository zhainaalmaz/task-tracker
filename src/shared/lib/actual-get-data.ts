export const actualGetData = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  const todayString = `${day}.${month}.${year}`;
  return todayString;
}
