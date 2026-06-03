export const cleanFilters = <T extends object>(filters: T) => {
  const cleaned: Record<string, unknown> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      !(typeof value === "number" && isNaN(value))
    ) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};



// export const cleanFilters2 = (filters: BookFilters) => {
//   const cleaned = {} as BookFilters;
//   Object.entries(filters).forEach(
//     ([key, value]: [string, string | undefined | undefined]) => {
//       if (
//         value !== undefined &&
//         value !== "" &&
//         !(typeof value === "number" && isNaN(value))
//       ) {
//         cleaned.authorId = value as string | number;
//       }
//     },
//   );
//   return cleaned;
// };
