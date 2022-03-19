import CurrencyFormat from 'react-currency-format'

const CustomCyrrency = ({
  value = 0,
  currency,
  suffix,
}: {
  value?: string | number
  currency?: string
  suffix?: string
}) => {
  return (
    <CurrencyFormat
      renderText={(value: string) => <>{value}</>}
      decimalScale={2}
      fixedDecimalScale={false}
      value={typeof value === 'string' ? parseFloat(value) : value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={currency}
      suffix={suffix}
    />
  )
}

export default CustomCyrrency
