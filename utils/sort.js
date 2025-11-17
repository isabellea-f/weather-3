export function sortList(results) {
  const sortBy = "SE";
  results.sort((a, b) => {
    if (a.country_code === sortBy && b.country_code !== sortBy) return -1;
    if (b.country_code === sortBy && a.country_code !== sortBy) return 1;
    if (
      (a.country_code === sortBy && b.country_code === sortBy) ||
      (a.country_code !== sortBy && b.country_code !== sortBy)
    ) {
      return b.population - a.population;
    }
    return 0;
  });
}
