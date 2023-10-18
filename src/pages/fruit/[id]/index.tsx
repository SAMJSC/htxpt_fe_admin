import { useRouter } from 'next/router';
import React from 'react'
import FruitDetailPage from 'src/@core/components/FruitDetail';

const FruitDetail = () => {
  const router = useRouter();

  return (
    <div>
        <FruitDetailPage id={router.query.id as string}/>
    </div>
  )
}

export default FruitDetail;