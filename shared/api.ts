/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

export interface DistanceRequest {
  origin: string;
  destination: string;
}

export interface DistanceResult {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  origin: string;
  destination: string;
}

export interface DistanceResponse {
  success: boolean;
  data?: DistanceResult;
  error?: string;
}
