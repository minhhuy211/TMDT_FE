interface OrderCustom {
  id: string;
  userId: string;
  designFileId: string;
  quantity: number;
  description: string;
  createdAt: string;
  quotedPrice: number;

  updatedAt: string;
}

export interface OrderCustomResponse {
  id: string;
  quantity: number;
  description: string;
  designFileUrls: string[];
  status: string;
  createdAt: string;
  quotedPrice: number | null;
}

export enum OrderCustomStatus {
  PENDING_QUOTE = "PENDING_QUOTE",
  QUOTED = "QUOTED",
  AWAITING_PAYMENT = "AWAITING_PAYMENT",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}
