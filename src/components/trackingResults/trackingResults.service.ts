import { Axios } from "axios";
import axiosInstance from "../../network/axiosInstance";

export class TrackingResultService {
  private static httpClient: Axios = axiosInstance;

  static async getTrackingResult(trackingNumber: number): Promise<any> {
    const response = await this.httpClient.get(
      `/shipments/track/${trackingNumber}`
    );
    return response.data;
  }
}
