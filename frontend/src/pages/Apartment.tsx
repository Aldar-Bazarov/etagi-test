import React from 'react'
// import { useParams } from 'react-router-dom'
import { Card, Col, Empty, Row, Typography } from 'antd'

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

const data: DataItem = {
    id: 101,
    floor: 1,
    posOnFloor: 1,
    price: 2880000,
    rooms: 1,
    areaTotal: 33.5,
    areaKitchen: 11.4,
    areaLive: 14.5,
    layoutImage: 'https://cdn.esoft.digital/content/cluster/layouts_2d/d5/9e/e8b89005da2d08a8620db552c52022f08cbe9ed5.png',
}

export const Apartment = () => {
    // const { id } = useParams()
    const [apartment, setApartment] = React.useState<DataItem>()

    React.useEffect(() => {
        setApartment(data);
    }, [])

    return (
        <> {
            apartment
                ?
                <Card
                    title={`Квартира №${apartment.id}`}
                    bordered={false}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Row>
                        <Col span={8}>
                            <img src={apartment.layoutImage} alt="plan" style={{width: '100%'}}/>
                        </Col>
                        <Col span={16} style={{padding: '3%'}}>
                            <Typography.Paragraph strong>
                                {`Этаж: ${apartment.floor}`}
                            </Typography.Paragraph>
                            <Typography.Paragraph strong>
                                {`Цена: ${apartment.price}`}
                            </Typography.Paragraph>
                            <Typography.Paragraph strong>
                                {`Количество комнат: ${apartment.rooms}`}
                            </Typography.Paragraph>
                            <Typography.Paragraph strong>
                                {`Общая площадь: ${apartment.areaTotal}`}
                            </Typography.Paragraph>
                            <Typography.Paragraph strong>
                                {`Площадь кухни: ${apartment.areaKitchen}`}
                            </Typography.Paragraph>
                            <Typography.Paragraph strong>
                                {`Жилая площадь: ${apartment.areaLive}`}
                            </Typography.Paragraph>
                        </Col>
                    </Row>
                </Card>
                :
                <Empty description='Не удалось получить данные' />
        }
        </>
    )
}