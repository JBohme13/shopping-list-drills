require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByProduceName(searchTerm) {
    knexInstance
      .select('name')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
  }

  searchByProduceName('search')

  function paginateProducts(page) {
    const productsPerPage = 6
    const offset = productsPerPage * (page - 1)
    knexInstance
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
  }

  paginateProducts(6)

  function shoppingListForDays(daysAgo) {
    knexInstance
      .select('name', 'date_added')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
      )
      .from('shopping_list')
      .then(result => {
        console.log(result)
      })
  }
  
  shoppingListForDays(30)

  function categoryTotalCost() {
      knewInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(results => {
          console.log(results)
        })
  }

  categoryTotalCost('lunch')
  