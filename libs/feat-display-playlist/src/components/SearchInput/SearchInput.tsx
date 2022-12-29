export interface SearchInputProps {
  onChange: (term: string) => void;
}

export default function SearchInput({ onChange }: SearchInputProps) {
  return (
    <div className="form-floating">
      <input
        onChange={({ target }) => {
          onChange(target.value);
        }}
        className="form-control form-control-sm me-2 "
        type="search"
        placeholder="Search"
        name="search"
        id="search"
      />
      <label htmlFor="search">Search</label>
    </div>
  );
}
