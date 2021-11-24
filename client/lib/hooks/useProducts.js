import useSWR from 'swr';
import axios from 'axios'

const getProductsAPI = url => axios.get(url).then(res => {
  return new Promise((resolve) => {
    setTimeout( (res) => {
      resolve(res.data.data);
    }, 3000, res)
  });
});

export function useProducts() {

  const { data: products , mutate: mutateProducts, error } = useSWR(
        `http://172.16.240.10:3000/api/v1/product`, getProductsAPI
    );

  const isLoading = !products && !error;

  return { products, mutateProducts, isLoading };
}