
import Link from 'next/link'


export default function Custom404  ()  {
  return (
    <div>
      <h1>Page not found</h1>
      <Link
        href={'/'}
      />
    </div>
  )
}

