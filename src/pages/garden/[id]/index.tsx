import { useRouter } from 'next/router';
import React from 'react'
import GardenDetailPage from 'src/@core/components/GardenDetail'

const GardenDetail = () => {
  const router = useRouter();

  return (
    <div>
        <GardenDetailPage id={router.query.id as string} />
    </div>
  )
}

export default GardenDetail