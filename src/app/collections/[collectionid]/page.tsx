import React from 'react'

interface PageProps {
  params: {
    collectionid: string;
  };
}

const Page = ({params}: PageProps) => {
  return (
    <div>
      <h1>{params.collectionid}</h1>
    </div>
  )
}

export default Page;
