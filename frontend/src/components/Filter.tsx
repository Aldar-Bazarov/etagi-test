import React from 'react'
import { Modal, Slider, Checkbox, Typography } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

type FilterProps = {
    open: boolean,
    setOpen: (arg: boolean) => void
}

export const Filter: React.FC<FilterProps> = ({ open, setOpen }) => {
    const [rooms, setRooms] = React.useState<CheckboxValueType[]>([]);
    const [prices, setPrices] = React.useState<number[]>([]);
    const [area, setArea] = React.useState<number[]>([]);

    const handleOk = () => {
        console.log(rooms);
        console.log(prices);
        console.log(area);
        
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
                onChange={(checkedValues: CheckboxValueType[]) => setRooms(checkedValues)}
                style={{margin: '0 0 20px 0'}}
            />
            <Typography.Paragraph>Стоимость:</Typography.Paragraph>
            <Slider 
                range 
                min={0} 
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