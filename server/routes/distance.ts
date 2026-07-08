import { RequestHandler } from "express";
import { DistanceRequest, DistanceResponse } from "@shared/api";

export const handleDistance: RequestHandler = async (req, res) => {
  const { origin, destination } = req.body as DistanceRequest;

  if (!origin || !destination) {
    return res.status(400).json({
      success: false,
      error: "Both origin and destination are required",
    } as DistanceResponse);
  }

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "Google Maps API key not configured",
    } as DistanceResponse);
  }

  try {
    const params = new URLSearchParams({
      origins: origin,
      destinations: destination,
      key: process.env.GOOGLE_MAPS_API_KEY,
      units: "metric",
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(400).json({
        success: false,
        error: data.error_message || "Failed to calculate distance",
      } as DistanceResponse);
    }

    if (!data.rows?.[0]?.elements?.[0]) {
      return res.status(400).json({
        success: false,
        error: "Could not find route between locations",
      } as DistanceResponse);
    }

    const element = data.rows[0].elements[0];

    if (element.status !== "OK") {
      return res.status(400).json({
        success: false,
        error: element.error_message || "Could not calculate distance",
      } as DistanceResponse);
    }

    res.json({
      success: true,
      data: {
        distance: element.distance,
        duration: element.duration,
        origin,
        destination,
      },
    } as DistanceResponse);
  } catch (error) {
    console.error("Distance calculation error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    } as DistanceResponse);
  }
};
