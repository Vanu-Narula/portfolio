/**
 * Helper utility functions
 */

/**
 * Format a number with commas for thousands
 * @param num The number to format
 * @returns Formatted string with commas
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Capitalize the first letter of each word in a string
 * @param str The string to capitalize
 * @returns Capitalized string
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Truncate a string to a maximum length with ellipsis
 * @param str The string to truncate
 * @param maxLength Maximum length before truncating
 * @returns Truncated string
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
};

/**
 * Calculate years of experience from a start year to current year
 * @param startYear The starting year
 * @returns Number of years of experience
 */
export const calculateYearsOfExperience = (startYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

/**
 * Calculate percentage growth between two numbers
 * @param startValue Initial value
 * @param endValue Final value
 * @returns Percentage growth as a formatted string
 */
export const calculateGrowthPercentage = (startValue: number, endValue: number): string => {
  if (startValue === 0) return "N/A"; // Cannot calculate percentage from zero
  const growth = ((endValue - startValue) / startValue) * 100;
  return `${growth.toFixed(1)}%`;
};
