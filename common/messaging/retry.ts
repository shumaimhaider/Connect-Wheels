export const withRetries = async (
  fn: () => Promise<void>,
  maxAttempts = 3
): Promise<boolean> => {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      await fn();
      return true; 
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt >= maxAttempts) break;
    }
  }
  return false; 
};
