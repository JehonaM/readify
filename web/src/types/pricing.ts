export interface PricingData {
  bookId: string;
  price: string;
  availability: "in stock" | "pre-order" | "out of stock";
}
