import { gql } from "@apollo/client"

const productsByCategoryName = gql`
query getProductByCategoryName($name: String!){
  getProductByCategoryName(name: $name) {
    id
    name
    price
    stock
    image
  }
}
`

export default productsByCategoryName;
