namespace VisualEssence.Domain.DTOs
{
    public class PaginatedResult<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int TotalPages { get; set; }
    }
}
