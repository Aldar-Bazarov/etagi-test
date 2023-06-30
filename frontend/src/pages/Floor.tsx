import React from 'react'
import { Link } from 'react-router-dom';
import { List, Select, Button, Space } from 'antd';
import { Filter } from '../components/Filter';
import { IFilters } from '../types/interfaces';

type DataItem = {
    id: number;
    floor: number;
    posOnFloor: number;
    price: number;
    rooms: number;
    areaTotal: number;
    areaKitchen: number;
    areaLive: number;
    layoutImage: string;
}

const data: DataItem[] = [

    {
        id: 101,
        floor: 1,
        posOnFloor: 1,
        price: 2880000,
        rooms: 1,
        areaTotal: 33.5,
        areaKitchen: 11.4,
        areaLive: 14.5,
        layoutImage: 'https://cdn.esoft.digital/content/cluster/layouts_2d/d5/9e/e8b89005da2d08a8620db552c52022f08cbe9ed5.png',
    },
    {
        id: 102,
        floor: 1,
        posOnFloor: 2,
        price: 5050000,
        rooms: 2,
        areaTotal: 64.8,
        areaKitchen: 19.2,
        areaLive: 33,
        layoutImage: 'https://cdn.esoft.digital/content/cluster/layouts_2d/12/6c/4d7c3f0588398eec1615c2bc43b072be5d4f6c12.png',
    },
    {
        id: 103,
        floor: 1,
        posOnFloor: 3,
        price: 3030000,
        rooms: 1,
        areaTotal: 36.5,
        areaKitchen: 11.7,
        areaLive: 17.4,
        layoutImage: 'https://cdn.esoft.digital/content/cluster/layouts_2d/5c/85/9e5c33110c6ff1b668427b0628f2db6afc35855c.png',
    },
    {
        id: 104,
        floor: 1,
        posOnFloor: 4,
        price: 3000000,
        rooms: 1,
        areaTotal: 35.8,
        areaKitchen: 15,
        areaLive: 11.2,
        layoutImage: 'https://cdn.esoft.digital/content/cluster/layouts_2d/d8/13/ea69243b7041e49d9947d01d4061c636bb4213d8.png',
    },
    {
        id: 105,
        floor: 1,
        posOnFloor: 5,
        price: 5200000,
        rooms: 2,
        areaTotal: 66.6,
        areaKitchen: 18.5,
        areaLive: 29.4,
        layoutImage: 'https://cdn.esoft.digital/content/cluster/layouts_2d/d9/85/b730707e30d58269aa500312c0a0f747748785d9.png',
    },
    {
        id: 106,
        floor: 1,
        posOnFloor: 6,
        price: 6050000,
        rooms: 3,
        areaTotal: 85.3,
        areaKitchen: 16.6,
        areaLive: 46.6,
        layoutImage: 'https://cdn.esoft.digital/content/cluster/layouts_2d/f4/7b/1ec36ffbf6f178a017b6f6affcb2d210d0ad7bf4.png',
    },
]

const sortData = (option: string): DataItem[] => {
    const sortedData = [...data];

    switch (option) {
        case 'price':
            sortedData.sort((a, b) => a.price - b.price);
            break;
        case 'rooms':
            sortedData.sort((a, b) => a.rooms - b.rooms);
            break;
        case 'areaTotal':
            sortedData.sort((a, b) => a.areaTotal - b.areaTotal);
            break;
        default:
            break;
    }

    return sortedData;
};

export const Floor: React.FC = () => {
    // const { id } = useParams()
    const [sortedAndFiltredData, setSortedAndFiltredData] = React.useState<DataItem[]>(data)
    const [open, setOpen] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<IFilters>({
        rooms: [],
        prices: [],
        area: []
    })

    const apartments = sortedAndFiltredData.map((el, i) => ({
        href: `/apartment/${el.id}`,
        title: `Квартира №${el.id}`,
        description: 'Уютная просторная квартира в новом ЖК',
        rooms: `Количество комнат: ${el.rooms}`,
        price: `Стоимость: ${el.price}`,
        areaTotal: `Общая площадь: ${el.areaTotal}`,
        image: el.layoutImage
    }));

    const handleSortChange = (value: string) => {
        const sortedData = sortData(value);
        setSortedAndFiltredData(sortedData);
    };

    React.useEffect(() => {
        const filterData = (): DataItem[] => {
            return data.filter((item) => {
                const roomMatch = filter.rooms.length === 0 || filter.rooms.includes(item.rooms);
                const priceMatch =
                    filter.prices.length === 0 ||
                    (item.price >= filter.prices[0] &&
                        item.price <= filter.prices[1]);
                const areaMatch =
                    filter.area.length === 0 ||
                    (item.areaTotal >= filter.area[0] &&
                        item.areaTotal <= filter.area[1]);

                return roomMatch && priceMatch && areaMatch;
            });
        };

        const filteredData = filterData();
        setSortedAndFiltredData(filteredData);
    }, [sortedAndFiltredData, filter]);

    return (
        <>
            <Space>
                <Button type='dashed'>
                    <Link to='/floor/plan'>
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
                <Button onClick={() => setFilter({
                    rooms: [],
                    prices: [],
                    area: []
                })}>
                    Сбросить фильтры
                </Button>
            </Space>
            <Filter open={open} setOpen={setOpen} setFilter={setFilter} />
            <List
                itemLayout="vertical"
                size="large"
                pagination={{ pageSize: 3 }}
                dataSource={apartments}
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