import useInit from '@/hooks/useInit'
import Image from 'next/image'

const S3Image = ({
  src,
  width,
  height,
  layout,
  ...rest
}: {
  src: string
  width?: string | number | undefined
  height?: string | number | undefined
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | undefined
  [x: string]: any
}) => {
  const { data } = useInit()

  if (!src) return null

  return (
    <Image
      {...rest}
      width={width}
      height={height}
      layout={width || height ? layout : 'fill'}
      src={`${data?.s3 || ''}${src}`}
      alt=""
    />
  )
}

export default S3Image
