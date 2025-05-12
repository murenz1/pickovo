// Platform fallback for web environment
export const Platform = {
  OS: 'web',
  select: (obj) => obj.web || obj.default || {},
  Version: 1,
};
