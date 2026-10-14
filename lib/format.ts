const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export const formatPrice = (value: number) => euro.format(value);

export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
