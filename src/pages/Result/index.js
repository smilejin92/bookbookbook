import React from 'react'
import { useSelector } from 'react-redux'
import { selectBooks, Status } from '../../store/books'
import SearchForm from '../../components/SearchForm'
import Books from '../../components/Books'
import Pagination from '../../components/Books/Pagination'
import Stack from '../../components/Stack'
import useSync from '../../hooks/useSync'

function Result() {
  const { items, status } = useSelector(selectBooks)

  const moreThanOneItems = items.length > 0
  const newSearch = status === Status.Loading && !items.length

  useSync()

  return (
    <div className={styles.wrapper}>
      <Stack gaps={[0, 10, 20, 20]}>
        <SearchForm />
        {moreThanOneItems ? (
          <Books items={items} />
        ) : newSearch ? (
          <div>로딩 중...</div>
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
        <Pagination />
      </Stack>
    </div>
  )
}

const styles = {
  wrapper: 'pb-4'
}

export default Result
