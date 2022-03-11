import InitType from '@/interfaces/initType'
import PublicFetcher from '@/lib/publicFetch'
import Image from 'next/image'
import useSWR from 'swr'

const S3Image = ({ src, ...rest }: { src?: string; [x: string]: any }) => {
  const { data: init } = useSWR<InitType>('/pub/general/init', PublicFetcher)
  return <Image {...rest} src={`${init?.s3 || ''}${src}`} alt="" />
}

export default S3Image
