import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'
import BoneButton from '@/components/boneButton'
import BoneButtonFlat from '@/components/boneButtonFlat'
import { Button, Col, Divider, Radio, Row, Space, Table } from 'antd'
import { useState } from 'react'
import ProductList from '@/components/product/list'

const Order = () => {
  const [value, setValue] = useState(1)

  const onChange = (e: number) => {
    console.log('radio checked', e)
    setValue(e)
  }
  return (
    <Layout>
      <PageHeader title={`Order`} image={`/cover4.jpeg`} />
      <StyledOrigin>
        <div className="container">
          <h2>YOUR ORDER</h2>
          <table>
            <th>
              <td>products</td>
            </th>
            <tr>
              <td>dogechew</td>
            </tr>
          </table>
        </div>
      </StyledOrigin>
    </Layout>
  )
}

const Content = styled.div``
const Sider = styled.div``

const StyledOrigin = styled.div`
  height: 500px;
`

export default Order
