// pagination.helper.ts
export function calculateTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

export function formatPaginationResponse(
  page: number,
  limit: number,
  total: number,
  results: any[],
): any {
  const totalPages = calculateTotalPages(total, limit);

  return {
    page,
    limit,
    totalPages,
    totalResults: total,
    data: results,
  };
}
