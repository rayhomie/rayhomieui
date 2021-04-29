import React, { useState, useEffect } from 'react'
import Pagination from '../components/Pagination/Pagination';
interface Props {

}

const MOCK_DATA = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92]

const PAGE_SIZE = 10

const searchPage = (current: number, pageSize: number, sourceData: any[]) => {
    return sourceData.slice(pageSize * (current - 1), pageSize * current)

}

const PaginationTest: React.FC<Props> = (props) => {
    useEffect(() => {
        const init = searchPage(1, PAGE_SIZE, MOCK_DATA)
        setData(init)
    }, [])
    const [data, setData] = useState<any[]>([])
    return (<>
        <Pagination
            total={MOCK_DATA.length}
            pageSize={PAGE_SIZE}
            className='hhh'
            showQuickJumper
            onChange={(p) => {
                setData(searchPage(p, PAGE_SIZE, MOCK_DATA));
            }}
        />
        <div>{data.map((i) => <div>{i}</div>)}</div>
    </>)
}
export default PaginationTest