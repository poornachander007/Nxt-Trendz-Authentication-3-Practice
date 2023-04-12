import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getAllProducts()
  }

  getAllProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData, '***************************')
      const updatedData = fetchedData.products.map(product => ({
        brand: product.brand,
        id: product.id,
        imageUrl: product.image_url,
        price: product.price,
        rating: product.rating,
        title: product.title,
      }))
      this.setState({productsList: updatedData, isLoading: false})
    }
    //
  }
  //   brand,id,image_url,price,rating,title

  renderLoader = () => (
    <div data-testid="loader" className="loader_container">
      <Loader type="Circles" width={200} height={200} />
    </div>
  )

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    if (isLoading) {
      return this.renderLoader()
    }
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
