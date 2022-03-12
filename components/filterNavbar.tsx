import useInit from '@/hooks/useInit'
import Link from 'next/link'
import styled from 'styled-components'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import breedSizeData from '@/constants/breedSize.json'

const FilterNavbar = ({
  pathname = '/',
}: {
  pathname: string
}): JSX.Element => {
  const router = useRouter()
  const {
    page = 1,
    limit = 4,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
  } = router.query as any
  const { data } = useInit()
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
        {data.categories_tree.map((category) => (
          <div
            className={classnames([
              'category-item',
              category_id === category.id ? 'selected' : undefined,
            ])}
            key={category.id}
          >
            <Link href={`${pathname}?category_id=${category.id}`}>
              <a>{category.name}</a>
            </Link>
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
                  <Link href={`${pathname}?category_id=${subCategory.id}`}>
                    <a>{subCategory.name}</a>
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="breed-size filterSection">
        <h2>Breed Size</h2>
        {breedSizeData.map((size) => (
          <div
            className={classnames([
              'category-item',
              category_id === size.id ? 'selected' : undefined,
            ])}
            key={size.id}
          >
            <Link href={`${pathname}?category_id=${size.id}`}>
              <a>{size.name}</a>
            </Link>
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
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;

      &.sub-category {
        margin-left: 1rem;
      }

      a {
        color: #4e4e4e;
        font-size: 1rem;
      }
      &.selected {
        & > a {
          color: var(--primary);
          font-weight: 700;
        }
      }
    }
  }
`

export default FilterNavbar
