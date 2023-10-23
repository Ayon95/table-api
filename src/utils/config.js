const config = {
  PORT: process.env.PORT || 5000,
  USER_TYPES: ['customer', 'vendor'],
  TOKEN_EXPIRATION: '1h',
  DEFAULT_PAGE: 1,
  DEFAULT_ROWS_PER_PAGE: 5,
  DEFAULT_SORT_ORDER: 'DESC',
  SORT_ORDERS: ['ASC', 'DESC', 'asc', 'desc'],
};

export default config;
