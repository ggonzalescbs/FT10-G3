module.exports = `
    type product{
        id : Int!
        name : String!,
        description: String!,
        price: Float!,
        stock: Int!,
        image: String!,
        categories: [category],
        quantity: Int
        reviews: [review]
    }

`