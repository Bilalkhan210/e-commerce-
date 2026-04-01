 import React, { useEffect } from 'react'
 import { useContext, useState } from 'react'
 import { ShopContext } from '../context/ShopContext'
 import { assets } from '../assets/assets'
 import Title from '../components/Title'
 import ProductItems from '../components/ProductItems'
 const Collection = () => {

  const {products, search,showSearch}=useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  
  const [sortType, setSortType] = useState('relavent')

  const ToggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item => item !== e.target.value))
  }else{
    setCategory(prev=>[...prev,e.target.value])
  }
}
  const ToggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item => item !== e.target.value))
  }else{
    setSubCategory(prev=>[...prev,e.target.value])
  }
}

const ApplyFilter = () => {
  let filtered = products.slice()

  if(showSearch && search){
    filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if (category.length > 0) {
    filtered = filtered.filter(item => category.includes(item.category))
  }

  if (subCategory.length > 0) {
    filtered = filtered.filter(item => subCategory.includes(item.subCategory)) // ✅ fix
  }

  setFilteredProducts(filtered)
}

 const sortProduct = () => {
  let fpCopy = filteredProducts.slice()

  switch(sortType){
    case 'low-high':
      setFilteredProducts(fpCopy.sort((a,b) => a.price - b.price))
      break;

    case 'high-low':
      setFilteredProducts(fpCopy.sort((a,b) => b.price - a.price))
      break;

    default:
      ApplyFilter()
      break;
  }
}
   useEffect(()=>{
    ApplyFilter()
   },[category,subCategory,search,showSearch])


   useEffect(()=>{
    sortProduct()
   },[sortType])

   return (
     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300'>

      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='arrow'  />
        </p>
        {/* { category filter } */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
             <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
             <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="Checkbox" value={'Men'} onChange={ToggleCategory}/>Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="Checkbox" value={'Women'} onChange={ToggleCategory}/>Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="Checkbox" value={'Kids'} onChange={ToggleCategory}/>Kids
              </p>
             </div>

        </div>
             {/* {SubCategory filter } */}


        <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter ? '' : 'hidden'} sm:block`}>
             <p className='mb-3 text-sm font-medium'>TYP</p>
             <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="Checkbox" value={'Topwear'} onChange={ToggleSubCategory}/>Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="Checkbox" value={'Bottomwear'} onChange={ToggleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="Checkbox" value={'Winterwear'} onChange={ToggleSubCategory}/>Winterwear
              </p>
             </div>

            
        </div>
        
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={'All'} text2={'COLLECTION'}/>

         <select onChange={(e)=> setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
  <option value="relevant">Sort by: Relevant</option>
  <option value="low-high">Sort by: Low to High</option>
  <option value="high-low">Sort by: High to Low</option>
</select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
{
  filteredProducts.map((item,index)=>(
    <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
  ))
}
        </div>
      </div>
       
     </div>
   )
 }
 

 export default Collection
 