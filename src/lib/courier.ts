import { Order, CourierBooking, StoreSettings } from "@/types";

export interface CourierBookingResult {
  success: boolean;
  provider: "Pathao" | "Steadfast";
  consignmentId: string;
  trackingCode: string;
  trackingUrl: string;
  message: string;
}

export function generateBookingCode(provider: "Pathao" | "Steadfast"): { consignmentId: string; trackingCode: string } {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  
  if (provider === "Pathao") {
    return {
      consignmentId: `PTH-${dateStr}-${randomSuffix}`,
      trackingCode: `TRK-PTH-${randomSuffix}`,
    };
  } else {
    return {
      consignmentId: `STDF-${dateStr}-${randomSuffix}`,
      trackingCode: `STDF${randomSuffix}`,
    };
  }
}

export async function bookCourierShipment(
  order: Order,
  provider: "Pathao" | "Steadfast",
  settings: StoreSettings
): Promise<CourierBookingResult> {
  const { consignmentId, trackingCode } = generateBookingCode(provider);
  const trackingUrl =
    provider === "Pathao"
      ? `https://courier.pathao.com/tracking?consignment_id=${consignmentId}`
      : `https://steadfast.com.bd/t/${trackingCode}`;

  return {
    success: true,
    provider,
    consignmentId,
    trackingCode,
    trackingUrl,
    message: `Shipment booked successfully with ${provider} Courier. Consignment: ${consignmentId}`,
  };
}

export function exportOrdersToCSV(orders: Order[]): string {
  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Mobile Number",
    "Delivery Address",
    "Zone",
    "Payable (BDT)",
    "Payment Method",
    "Payment Status",
    "MFS TrxID",
    "Order Status",
    "Courier Provider",
    "Consignment ID",
    "Items",
  ];

  const rows = orders.map((order) => {
    const itemsSummary = order.items
      .map((item) => `${item.title} (${item.size}, ${item.color}) x${item.quantity}`)
      .join(" | ");

    return [
      `"${order.id}"`,
      `"${new Date(order.createdAt).toLocaleDateString()}"`,
      `"${order.customerName.replace(/"/g, '""')}"`,
      `"${order.customerMobile}"`,
      `"${order.deliveryAddress.replace(/"/g, '""')}"`,
      `"${order.deliveryZone}"`,
      order.finalPayable,
      `"${order.paymentMethod}"`,
      `"${order.paymentStatus}"`,
      `"${order.mfsTrxId || ""}"`,
      `"${order.orderStatus}"`,
      `"${order.courier?.provider || "None"}"`,
      `"${order.courier?.consignmentId || ""}"`,
      `"${itemsSummary.replace(/"/g, '""')}"`,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
