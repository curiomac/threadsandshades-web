export const getCurrencyFormat = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(price);
  };