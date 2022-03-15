import useInit from '@/hooks/useInit'
import Image, { ImageProps, ImageLoaderProps } from 'next/image'
import paw from '../assets/pawprint.svg'

const S3Image = ({
  src: srcProp,
  width,
  height,
  layout,
  ...rest
}: {
  src: string
  width?: string | number | undefined
  height?: string | number | undefined
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | undefined
} & ImageProps) => {
  const { data } = useInit()

  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${data?.s3 || ''}${src}?w=${width}&q=${quality || 75}`
  }
  console.log('#######', srcProp)

  if (!srcProp || srcProp === '') {
    return (
      <Image
        alt=""
        {...rest}
        src={'/product-placeholder.jpeg'}
        className="pawprint"
        width={width}
        height={width}
        objectFit="contain"
      />
    )
  }

  return (
    <Image
      alt=""
      loader={imageLoader}
      {...rest}
      src={srcProp}
      width={width}
      height={height}
      layout={width || height ? layout : 'fill'}
    />
  )
}

export default S3Image
