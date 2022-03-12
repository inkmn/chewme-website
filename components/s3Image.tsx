import useInit from '@/hooks/useInit'
import Image from 'next/image'

const S3Image = ({ src, ...rest }: { src?: string; [x: string]: any }) => {
  const { data } = useInit()
  return <Image {...rest} src={`${data?.s3 || ''}${src}`} alt="" />
}

export default S3Image
