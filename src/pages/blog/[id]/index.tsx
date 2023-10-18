import { useRouter } from 'next/router';
import React from 'react'
import BlogDetailPage from 'src/@core/components/BlogDetail';

const BlogDetail = () => {
  const router = useRouter();

  return (
    <div>
        <BlogDetailPage id={router.query.id as string}/>
    </div>
  )
}

export default BlogDetail;