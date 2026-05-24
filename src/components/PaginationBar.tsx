interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
}

export function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = '← Anterior',
  nextLabel = 'Próxima →',
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col xs:flex-row items-center justify-between gap-3 mt-6 pt-5 border-t border-border">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-border text-brand-text font-semibold bg-surface transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:text-primary"
      >
        {previousLabel}
      </button>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`min-w-10 h-10 px-3 rounded-lg border font-semibold transition-all duration-200 ${
              page === currentPage
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-surface text-brand-text border-border hover:border-primary hover:text-primary'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-border text-brand-text font-semibold bg-surface transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:text-primary"
      >
        {nextLabel}
      </button>
    </div>
  );
}
