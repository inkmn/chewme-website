import useInit from '@/hooks/useInit'
import Link from 'next/link'
import styled from 'styled-components'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'

const FilterNavbar = ({
  pathname = '/',
  options = [],
}: {
  pathname: string
  options: any[]
}): JSX.Element => {
  const {
    data: { categories_tree },
  } = useInit()
  const router = useRouter()
  const {
    page = 1,
    limit = 12,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
    optional = '',
    optional_type = '',
  } = router.query as any

  const [optionalList, setIsOptionalList] = useState(
    optional !== '' ? optional.split('|') : []
  )

  useEffect(() => {
    setIsOptionalList([])
  }, [category_id])

  const updateQueryString = (id: string) => {
    let newOptionalList = []
    if (optionalList.includes(id)) {
      newOptionalList = optionalList.filter((item: string) => item !== id)
    } else {
      newOptionalList = [...optionalList, id]
    }
    router.push(
      `${pathname}${qs.stringify(
        {
          page,
          limit,
          query,
          category_id,
          start_date,
          end_date,
          optional: newOptionalList.join('|'),
          optional_type,
        },
        {
          encode: false,
          addQueryPrefix: true,
        }
      )}`
    )
    setIsOptionalList(newOptionalList)
  }

  return (
    <StyledFilterBar>
      <div className="categories filterSection">
        <h2>Category</h2>
        <div
          className={classnames([
            'category-item',
            !category_id ? 'selected' : undefined,
          ])}
        >
          <Link href={`${pathname}`}>
            <a>All</a>
          </Link>
        </div>
        {categories_tree.map((category) => (
          <div
            className={classnames([
              'category-item',
              category_id === category.id ? 'selected' : undefined,
            ])}
            key={category.id}
          >
            {category_id === category.id ? (
              <Link href={`${pathname}`}>
                <a>
                  <span>{category.name}</span>
                  <CloseOutlined />
                </a>
              </Link>
            ) : (
              <Link href={`${pathname}?category_id=${category.id}`}>
                <a>
                  <span>{category.name}</span>
                  <CloseOutlined />
                </a>
              </Link>
            )}
            {category.children &&
              category.children.length &&
              category.children.map((subCategory) => (
                <div
                  className={classnames([
                    'category-item',
                    'sub-category',
                    category_id === subCategory.id ? 'selected' : undefined,
                  ])}
                  key={subCategory.id}
                >
                  {category_id === subCategory.id ? (
                    <Link href={`${pathname}`}>
                      <a>
                        <span>{subCategory.name}</span>
                        <CloseOutlined />
                      </a>
                    </Link>
                  ) : (
                    <Link href={`${pathname}?category_id=${subCategory.id}`}>
                      <a>
                        <span>{subCategory.name}</span>
                        <CloseOutlined />
                      </a>
                    </Link>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="breed-size filterSection">
        {options.map((option) => (
          <div key={option.code}>
            <h2>{option.name}</h2>
            {option.optionals.map((item: any) => (
              <div
                className={classnames([
                  'category-item',
                  optionalList.indexOf(item.id) !== -1 ? 'selected' : undefined,
                ])}
                key={item.id}
              >
                <a onClick={() => updateQueryString(item.id)}>
                  <span>{item.name}</span>
                  <CloseOutlined />
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </StyledFilterBar>
  )
}

const StyledFilterBar = styled.div`
  .categories {
  }
  .filterSection {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    .category-item {
      margin-bottom: 0.5rem;

      &.sub-category {
        margin-left: 1rem;
      }
      a {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        border-radius: 6px;
        color: #4e4e4e;
        font-size: 1rem;
        .anticon-close {
          display: none;
          & > svg {
            font-size: 12px;
          }
        }
      }
      &.selected {
        & > a {
          color: var(--primary);
          font-weight: 700;
          background-color: #eee;
          .anticon-close {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
`

export default FilterNavbar
