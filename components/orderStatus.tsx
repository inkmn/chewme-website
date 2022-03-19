import { Tag } from 'antd'

const RenderStatus = ({ status }: { status: string | undefined }) => {
  if (status === 'COMPLETED') return <Tag color={'green'}>COMPLETED</Tag>
  if (status === 'NEW') return <Tag>NEW</Tag>
  if (status === 'CANCEL') return <Tag color="red">CANCEL</Tag>
  if (status === 'PAID') return <Tag color="green">PAID</Tag>
  return <Tag color="">-</Tag>
}

export default RenderStatus
