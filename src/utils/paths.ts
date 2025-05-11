export const getAssetPath = (path: string): string => {
  return path.startsWith('/') ? path : `/${path}`;
};