import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const allSalesData = [
    { id: 1, name: "Ptar*", total: 36000 },
    { id: 2, name: "John*", total: 6000 },
    { id: 1, name: "Ptar*", total: 65000 },
    { id: 3, name: "Eve", total: 65000 },
    { id: 4, name: "Joy", total: 65000 },
    { id: 4, name: "Joy", total: 5000 },
    { id: 3, name: "Eve", total: 65000 },
    { id: 2, name: "John*", total: 54000 },
    { id: 2, name: "John*", total: 65000 },
    { id: 2, name: "John*", total: 5000 },
    { id: 3, name: "Eve", total: 23400 },
    { id: 4, name: "Joy", total: 5000 },
  ];
  const user = allSalesData?.find(
    (sale) => sale.id === parseInt(params.id)
  ).name;//Finds one
  const salesData = allSalesData.filter(
    (item) => item.id === parseInt(params.id)
  );//Finds an array
 
  return new Response(JSON.stringify({ user, salesData }));
}
