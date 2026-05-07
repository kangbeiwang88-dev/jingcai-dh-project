export type Coordinates = {
  lat: number;
  lng: number;
};

const toRad = (value: number) => (value * Math.PI) / 180;

export function getDistanceKm(
  user: Coordinates | null,
  resource: { lat?: number; lng?: number },
): number | null {
  if (!user || typeof resource.lat !== "number" || typeof resource.lng !== "number") {
    return null;
  }

  const earthRadiusKm = 6371;
  const dLat = toRad(resource.lat - user.lat);
  const dLng = toRad(resource.lng - user.lng);
  const lat1 = toRad(user.lat);
  const lat2 = toRad(resource.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((earthRadiusKm * c).toFixed(1));
}
