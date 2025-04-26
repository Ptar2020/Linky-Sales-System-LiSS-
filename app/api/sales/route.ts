import { dbConnect } from "@/app/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const allSales = [
    { id: 1, name: "Ptar", amount: 36000 },
    { id: 2, name: "John", amount: 6000 },
    // { id: 1, name: "Ptar", amount: 65000 },
    // { id: 3, name: "Eve", amount: 65000 },
    // { id: 4, name: "Joy", amount: 65000 },
    // { id: 4, name: "Joy", amount: 5000 },
    // { id: 3, name: "Eve", amount: 65000 },
    // { id: 2, name: "John", amount: 54000 },
    // { id: 2, name: "John", amount: 65000 },
    // { id: 2, name: "John", amount: 5000 },
    // { id: 3, name: "Eve", amount: 23400 },
    // { id: 4, name: "Joy", amount: 5000 },
  ];

  return new Response(JSON.stringify(allSales));
}
