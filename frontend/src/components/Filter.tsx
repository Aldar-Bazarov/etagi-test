import React from 'react'
import { Modal, Slider, Checkbox, Typography } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { IFilters } from '../types/interfaces';

type FilterProps = {
    open: boolean,
    setOpen: (arg: boolean) => void,
    setFilter: (arg: IFilters) => void
}

export const Filter: React.FC<FilterProps> = ({ open, setOpen, setFilter }) => {
    const [rooms, setRooms] = React.useState<number[]>([]);
    const [prices, setPrices] = React.useState<number[]>([]);
    const [area, setArea] = React.useState<number[]>([]);

    const handleOk = () => {
        setFilter({
            rooms,
            prices,
            area
        })
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            title="Фильтрация"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Typography.Paragraph>Количество комнат:</Typography.Paragraph>
            <Checkbox.Group
                options={['1', '2', '3']}
                onChange={(checkedValues: CheckboxValueType[]) => {
                    setRooms(checkedValues.map(el => +el))
                }}
                style={{ margin: '0 0 20px 0' }}
            />
            <Typography.Paragraph>Стоимость:</Typography.Paragraph>
            <Slider
                range
                min={2880000}
                max={6050000}
                onChange={(values) => setPrices(values)}
            />
            <Typography.Paragraph>Общая площадь:</Typography.Paragraph>
            <Slider
                range
                min={0}
                max={Math.ceil(85.3)}
                onChange={(values) => setArea(values)}
            />
        </Modal>
    )
}