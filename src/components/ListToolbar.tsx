type ListOption = {
  value: string;
  label: string;
};

interface ListToolbarProps {
  searchId: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterId: string;
  filterLabel: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: ListOption[];
}

export function ListToolbar({
  searchId,
  searchLabel,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filterId,
  filterLabel,
  filterValue,
  onFilterChange,
  filterOptions,
}: ListToolbarProps) {
  const inputClassName =
    'w-full px-4 py-3 border-2 border-border rounded-lg text-[0.95rem] bg-[#fafbff] transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.12)] hover:border-[#c7d2fe]';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="md:col-span-2">
        <label htmlFor={searchId} className="block text-[0.85rem] font-semibold text-brand-text mb-1.5">
          {searchLabel}
        </label>
        <input
          id={searchId}
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor={filterId} className="block text-[0.85rem] font-semibold text-brand-text mb-1.5">
          {filterLabel}
        </label>
        <select
          id={filterId}
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
          className={inputClassName}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
