import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Empty, Row, Typography } from 'antd'
import { ApartmentType } from '../types/types';
import { getOneApartment } from '../api/apartment.api';

export const Apartment = () => {
    const { id } = useParams()
    const [apartment, setApartment] = React.useState<ApartmentType>()

    const fetchData = async () => {
        if (id) {
            const { data } = await getOneApartment(+id)
            setApartment(data)
        }
    }

    React.useEffect(() => {
        fetchData();
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
                            <img src={apartment.layout_image} alt="plan" style={{ width: '100%' }} />
                        </Col>
                        <Col span={16} style={{ padding: '3%' }}>
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
                                {`Общая площадь: ${apartment.area_total}`}
                            </Typography.Paragraph>
                            <Typography.Paragraph strong>
                                {`Площадь кухни: ${apartment.area_kitchen}`}
                            </Typography.Paragraph>
                            <Typography.Paragraph strong>
                                {`Жилая площадь: ${apartment.area_live}`}
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