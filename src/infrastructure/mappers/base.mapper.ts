export class BaseMapper {
  // Convierte Modelo ORM → Entidad (función convertidora pasada por parámetro)
  static toDomainList<TModel, TEntity>(
    rows: TModel[],
    convert: (model: TModel) => TEntity
  ): TEntity[] {
    return rows.map(row => convert(row));
  }

  // Convierte paginación (findAndCountAll)
  static toPagination<TModel, TEntity>(
    result: { rows: TModel[], count: number },
    convert: (model: TModel) => TEntity
  ) {
    return {
      count: result.count,
      rows: result.rows.map(row => convert(row)),
    };
  }
}
