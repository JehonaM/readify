import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get("bookId") || "default";


  const charSum = bookId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);


  const generatedPrice = ((charSum % 50) + 15.99).toFixed(2);

  const availabilityOptions = ["in stock", "pre-order", "out of stock"];

  const randomAvailability = availabilityOptions[charSum % 3];

  return NextResponse.json({
    bookId,
    price: generatedPrice,
    availability: randomAvailability,
  });
}
