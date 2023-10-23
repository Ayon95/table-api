import sequelize from '../services/db.js';

export function getAttributesExcept(model, excludedAttributes) {
  const allAttributes = Object.keys(model.getAttributes());
  return excludedAttributes.length === 0
    ? allAttributes
    : allAttributes.filter(attribute => !excludedAttributes.includes(attribute));
}

export function isValidPage(page, totalPages) {
  return typeof page === 'number' && page > 0 && page <= totalPages;
}

export function isValidRowsPerPage(rowsPerPage) {
  return typeof rowsPerPage === 'number' && rowsPerPage > 0;
}

export function getPeopleQueryOrder(sortBy, sortOrder) {
  return [
    sortBy === 'fullName'
      ? sequelize.fn('concat', sequelize.col('firstName'), ' ', sequelize.col('lastName'))
      : sortBy,
    sortOrder,
  ];
}
