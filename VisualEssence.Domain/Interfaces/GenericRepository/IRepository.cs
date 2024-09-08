namespace VisualEssence.Domain.Interfaces.GenericRepository
{
    public interface IRepository<T, TDto> where T : class where TDto : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(Guid id);
        Task<TDto> Post(TDto dto);
        Task<TDto> Update(Guid id, TDto entity);
        Task<T> Delete(T entity);
    }
}
