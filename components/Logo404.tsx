import Image from 'next/image'
import React from 'react'


const Logo = () => {
  return (
    // <Image 
    // src={"./404.svg"}
    // height={300}
    // width={300}
    // alt='logo'
    // />

    // eslint-disable-next-line @next/next/no-img-element
    <img src="./404.png" alt="404" height={300} width={300} />
  )
}

export default Logo
