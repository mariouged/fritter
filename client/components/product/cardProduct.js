import React from "react";

const CardProduct = ({ product, isLoading }) => {
	return (
		<div
      className={`shadow-lg rounded-1xl w-36 p-4 bg-white dark:bg-gray-800 w-full ${
        isLoading ? 'animate-pulse' : ''
      }`}
    >
			<div className="flex items-center">
				{isLoading ? (
        	<h1 className="w-screen rounded-md h-6 bg-gray-300 mb-1 mb-2"></h1>
				) : (
					<h1 className="text-3xl text-gray-700 dark:text-gray-50 font-medium pb-2">{product?.name} &rarr;</h1>
					)}
				
      </div>
			<div className="flex flex-col">
			{isLoading ? (
				<>
				<div className="max-w-full rounded-md h-3 bg-gray-300 mb-2"></div>
				<div className="max-w-full rounded-md h-3 bg-gray-300 mb-2"></div>
				<div className="w-2/4 rounded-md h-3 bg-gray-300"></div>
				</>
				
			): (
				<p className="text-md text-gray-700 dark:text-gray-50">{product?.description}</p>
			)}
			</div>
			<p className="text-md text-gray-700 dark:text-gray-50">{product?.description}</p>
      <div className="flex flex-row justify-end mt-4">
        {isLoading ? (
          <div className="w-32 rounded-md h-10 bg-gray-300"  ></div>
        ) : (
          <p className="text-gray-800 text-4xl text-right dark:text-white font-bold">
            {product?.price}{'€'}
          </p>
        )}
      </div>
		</div>
		
	)
}

export default CardProduct;