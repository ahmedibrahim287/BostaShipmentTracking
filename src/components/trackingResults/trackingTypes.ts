// trackingTypes.ts

export interface TrackingData {
  CreateDate: string;
  CurrentStatus: {
    state: string;
    timestamp: string;
  };
  PromisedDate: string;
  SupportPhoneNumbers: string[];
  TrackingNumber: string;
  TrackingURL: string;
  TransitEvents: {
    state: string;
    timestamp: string;
    hub?: string; // Optional property
  }[];
  isEditableShipment: boolean;
  nextWorkingDay: {
    dayDate: string;
    dayName: string;
  }[];
  provider: string;
}
