import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showfilter, setShowFilter] = useState(false)
  const [filterproducts, setFilterProducts] = useState([])
  const [sortOption, setSortOption] = useState('relevant')
  const [category, setCategory] = useState([])
  const[subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }  

  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }

  }

  
const applyFilter = () =>{
  let productsCopy = products.slice()

  if (showSearch && search) {
    productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase
    ()))
  }

  if (category.length > 0) {
    productsCopy = productsCopy.filter(item => category.includes(item.category))
  }

  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
  }

  setFilterProducts(productsCopy)

}

useEffect(() => {
    applyFilter()
}, [category, subCategory, search, showSearch])

  

  const handleSortChange = (e) => {
    const option = e.target.value
    setSortOption(option)
    
    // Create a copy of the products array to sort
    const sortedProducts = [...filterproducts]
    
    if (option === 'low-high') {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (option === 'high-low') {
      sortedProducts.sort((a, b) => b.price - a.price)
    }
    // For 'relevant' we just use the original order
    
    setFilterProducts(sortedProducts)
  }

  const sortProduct = () => {
    let fpCopy = filterproducts.slice()

    switch(sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) =>(a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) =>(b.price - a.price)))
        break;

      default:
        applyFilter()
        break;

    }
  }

    useEffect(() => {
      sortProduct()
    },[sortType])


  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t'>
        {/* Filter Options */}
        <div className='w-full sm:w-60'>
          <div className='flex items-center justify-between sm:justify-start border-b pb-2 mb-4 sm:border-none'>
            <p onClick={() => setShowFilter(!showfilter)} className='font-medium text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
            <img className={`h-3 sm:hidden transition-transform ${showfilter ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="" />
          </div>
          
          {/* Category filter */}
          <div className={`border border-gray-300 pl-5 py-3 w-full sm:w-60 mt-2 ${showfilter ? '' : 'hidden'} sm:block rounded-md shadow-sm`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3 h-3 accent-black' type="checkbox" name="category" value={"Men"}
                onChange={toggleCategory}
                />
                Men
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" name="category" value={"Women"} 
                onChange={toggleCategory}
                />
                Women
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3 h-3 accent-black' type="checkbox" name="category" value={"Kids"}
                onChange={toggleCategory}
                />
                Kids
              </label>
            </div>
          </div>
          
          {/* Sub-category filter */}
          <div className={`border border-gray-300 pl-5 py-3 w-full sm:w-60 my-5 ${showfilter ? '' : 'hidden'} sm:block rounded-md shadow-sm`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3 h-3 accent-black' type="checkbox" name="type" value={"Round"}
                onChange={toggleSubCategory}
                />
                Round
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-3 h-3 accent-black' type="checkbox" name="type" value="Cat eye"
                 onChange={toggleSubCategory}
                />
                Cat eye
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3 h-3 accent-black' type="checkbox" name="type" value="square"
                 onChange={toggleSubCategory}
                />
                Square
              </label>
            </div>
          </div>
        </div>

        {/* Right side content */}
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            
            {/* Sort options */}
            <div className='w-full sm:w-auto mt-4 sm:mt-0'>
              <select 
                className='border border-gray-300 text-sm px-4 py-2 rounded-md w-full sm:w-auto cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-400'
                value={sortOption}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="relevant">Sort by Relevant</option>
                <option value="low-high">Sort by Price: Low to High</option>
                <option value="high-low">Sort by Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Products grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8'>
            {filterproducts && filterproducts.length > 0 ? (
              filterproducts.map((item, index) => (
                <ProductItem 
                  key={index} 
                  name={item.name} 
                  id={item._id} 
                  price={item.price}
                  image={item.image} 
                />
              ))
            ) : (
              <p className='col-span-full text-center py-8 text-gray-500'>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection