import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { List, Select, Button, Space } from 'antd';
import { IFilters } from '../types/interfaces';
import { ApartmentType } from '../types/types';
import { getApartmentOnTheFloor } from '../api/apartment.api';
import { Filter } from '../components/Filter';

const sortData = (apartments: ApartmentType[], option: string): ApartmentType[] => {
    const sortedData = [...apartments];

    switch (option) {
        case 'price':
            sortedData.sort((a, b) => a.price - b.price);
            break;
        case 'rooms':
            sortedData.sort((a, b) => a.rooms - b.rooms);
            break;
        case 'areaTotal':
            sortedData.sort((a, b) => a.area_total - b.area_total);
            break;
        default:
            break;
    }

    return sortedData;
};

export const Floor: React.FC = () => {
    const { id } = useParams()
    const limit = 6;

    const [apartments, setApartments] = React.useState<ApartmentType[]>();
    const [sortedAndFiltredApartments, setSortedAndFiltredApartments] = React.useState<ApartmentType[]>()
    
    const [open, setOpen] = React.useState<boolean>(false)
    const [isSorted, setIsSorted] = React.useState<boolean>(false)
    const [filter, setFilter] = React.useState<IFilters>()

    const renderApartments = sortedAndFiltredApartments?.map((el, i) => ({
        href: `/apartment/${el.id}`,
        title: `Квартира №${el.id}`,
        description: 'Уютная просторная квартира в новом ЖК',
        rooms: `Количество комнат: ${el.rooms}`,
        price: `Стоимость: ${el.price}`,
        areaTotal: `Общая площадь: ${el.area_total}`,
        image: el.layout_image
    }));

    const fetchData = async () => {
        if (id) {
            const { data } = await getApartmentOnTheFloor(+id, limit)
            setApartments(data.rows)
            setSortedAndFiltredApartments(data.rows)
        }
    }

    const handleSortChange = (value: string) => {
        if (apartments) {
            const sortedData = sortData(apartments, value)
            setSortedAndFiltredApartments(sortedData)
            setIsSorted(!isSorted)
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [id])

    React.useEffect(() => {
        if (sortedAndFiltredApartments && filter) {
            const filterData = (): ApartmentType[] => {
                return sortedAndFiltredApartments.filter((item) => {
                    const roomMatch = filter.rooms.length === 0 || filter.rooms.includes(item.rooms)
                    const priceMatch =
                        filter.prices.length === 0 ||
                        (item.price >= filter.prices[0] &&
                            item.price <= filter.prices[1])
                    const areaMatch =
                        filter.area.length === 0 ||
                        (item.area_total >= filter.area[0] &&
                            item.area_total <= filter.area[1])
    
                    return roomMatch && priceMatch && areaMatch
                });
            };

            const filteredData = filterData()
            setSortedAndFiltredApartments(filteredData)
        } else {
            fetchData()
        }
    }, [filter]);

    return (
        <>
            <Space>
                <Button type='dashed'>
                    <Link to={`/floor/plan/${id}`}>
                        План этажа
                    </Link>
                </Button>
                <Select
                    placeholder='Cортировать по'
                    style={{ width: 200 }}
                    onChange={value => handleSortChange(value)}
                    options={[
                        { value: 'price', label: 'По цене' },
                        { value: 'rooms', label: 'По количеству комнат' },
                        { value: 'areaTotal', label: 'По общей площади' },
                    ]}
                />
                <Button type="primary" onClick={() => setOpen(true)}>
                    Фильтрация
                </Button>
                <Button onClick={() => setFilter(undefined)}>
                    Сбросить фильтры
                </Button>
                <Filter open={open} setOpen={setOpen} setFilter={setFilter} />
            </Space>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{ pageSize: 3 }}
                dataSource={renderApartments}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        extra={
                            <img
                                width={200}
                                alt="logo"
                                src={item.image}
                            />
                        }
                        style={{ padding: '20px 0' }}
                    >
                        <List.Item.Meta
                            title={<Link to={item.href}>{item.title}</Link>}
                            description={item.description}
                        />
                        {item.rooms}
                        <br />
                        {item.price}
                        <br />
                        {item.areaTotal}
                    </List.Item>
                )}
            />
        </>
    )
};