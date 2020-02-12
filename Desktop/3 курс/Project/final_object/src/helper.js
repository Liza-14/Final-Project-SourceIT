export const calculateId = (array) => array.length + 1;

export const calculateMoney = (array) => {
  return array.reduce((sum, item) => sum + item.value, 0);
}; 
