import useSWR from 'swr';
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data.data);

export function useProduct(id) {
  const { data: product, mutate: mutateProduct, error } = useSWR(
        `http://172.16.240.10:3000/api/v1/product/${id}`, fetcher
    );

  console.log('useProduct', product);
  const isLoading = !product && !error;

  return { product, mutateProduct, isLoading };
}