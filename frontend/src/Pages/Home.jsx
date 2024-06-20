import React from 'react'
import Products from '../Components/Products'
function Home() {
  return (
    <>
        <div className='py-12 px-10  flex items-center justify-between '>

          <div className='w=1/2 '>
            <h6 className='italic text-l sm:text-xl ml-2'>Are you hungry?</h6>
            <h1 className='text-3xl sm:text-6xl text-zinc-600 font-bold'>Don't wait !</h1>
            <button className=' bg-orange-400 font-bold text-slate-50 rounded-full px-3 py-0.5 my-4 hover:text-black hover:bg-orange-500'>Order Now</button>
          </div>

          <div className='w=1/2'>
            <img className="w-36 h-36 sm:w-full sm:h-full" src='/images/pizza.png' alt='pizza'></img>
          </div>
        </div>

        <div className='py-16'>
          <Products/>
        </div>
    </>
  )
}

export default Home
