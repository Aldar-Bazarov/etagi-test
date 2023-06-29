import { Typography } from 'antd';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <Typography.Title level={1}>
        Модуль поиска и отображения квартир
      </Typography.Title>
      <Typography.Title level={5}>
        Описание
      </Typography.Title>
      <Typography.Text>
        Модуль поиска и отображения квартир в одной секции 4х-этажного жилого дома
      </Typography.Text>
    </div>
  );
};