import config from '../utils/config.js';
import {
  getAttributesExcept,
  getPeopleQueryOrder,
  isValidPage,
  isValidRowsPerPage,
} from '../utils/helpers.js';
import Person from '../models/Person.js';

/*
- page, rowsPerPage, sortBy, and sortOrder query params can be specified
- pagination query params are optional; if they are not provided, then default values will be used
- to get a sorted result, a valid value for sortBy must be provided 
*/

export async function getPeople(req, res, next) {
  try {
    const { user, query } = req;

    const attributesForNonLoggedInUser = getAttributesExcept(Person, ['email', 'city']);
    const attributesForLoggedInVendor = getAttributesExcept(Person, ['email']);
    const attributesForLoggedInCustomer = getAttributesExcept(Person, []);

    let page = parseFloat(query.page);
    let rowsPerPage = parseFloat(query.rowsPerPage);
    const peopleCount = await Person.count();

    rowsPerPage = isValidRowsPerPage(rowsPerPage) ? rowsPerPage : config.DEFAULT_ROWS_PER_PAGE;

    const totalPages = Math.ceil(peopleCount / rowsPerPage);

    page = isValidPage(page, totalPages) ? page : config.DEFAULT_PAGE;

    const paginationInfo = { page, rowsPerPage, totalRows: peopleCount, totalPages };

    const sortOrder = config.SORT_ORDERS.includes(query.sortOrder)
      ? query.sortOrder.toUpperCase()
      : config.DEFAULT_SORT_ORDER;

    if (!user) {
      const sortBy =
        [...attributesForNonLoggedInUser, 'fullName'].includes(query.sortBy) && query.sortBy;

      const people = await Person.findAll({
        attributes: attributesForNonLoggedInUser,
        ...(sortBy && { order: [getPeopleQueryOrder(sortBy, sortOrder)] }),
        offset: (page - 1) * rowsPerPage,
        limit: rowsPerPage,
      });

      return res.json({
        people,
        query: { ...paginationInfo, ...(sortBy && { sortBy, sortOrder }) },
      });
    }

    if (user.userType === 'customer') {
      const sortBy =
        [...attributesForLoggedInCustomer, 'fullName'].includes(query.sortBy) && query.sortBy;

      const people = await Person.findAll({
        ...(sortBy && { order: [getPeopleQueryOrder(sortBy, sortOrder)] }),
        offset: (page - 1) * rowsPerPage,
        limit: rowsPerPage,
      });
      return res.json({
        people,
        query: { ...paginationInfo, ...(sortBy && { sortBy, sortOrder }) },
      });
    }

    // if the user is a vendor

    const sortBy =
      [...attributesForLoggedInVendor, 'fullName'].includes(query.sortBy) && query.sortBy;

    const people = await Person.findAll({
      attributes: attributesForLoggedInVendor,
      ...(sortBy && { order: [getPeopleQueryOrder(sortBy, sortOrder)] }),
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
    });

    res.json({ people, query: { ...paginationInfo, ...(sortBy && { sortBy, sortOrder }) } });
  } catch (error) {
    next(error);
  }
}
