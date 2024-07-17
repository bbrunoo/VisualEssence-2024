namespace VisualEssence.Domain.Interfaces.GenericRepository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> Post(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(T entity);
    }
}
