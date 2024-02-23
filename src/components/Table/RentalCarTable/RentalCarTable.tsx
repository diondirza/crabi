import { Checkbox, Table, type TableProps } from 'antd';
import type { FC } from 'react';

interface RentalCarTableProps {
  dataSource: RentalCar[];
  onRowClick: (record: RentalCar) => void;
  selectedKey?: Id;
}

const columns: TableProps<RentalCar>['columns'] = [
  {
    title: 'Car Model',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'Car Vendor',
    dataIndex: 'vendor',
    key: 'vendor',
  },
  {
    title: 'Available',
    dataIndex: 'available',
    key: 'available',
    align: 'center',
    render: (available: boolean) => <Checkbox disabled checked={available} />,
  },
  {
    title: 'Booked By',
    dataIndex: 'bookedBy',
    key: 'bookedBy',
  },
  {
    title: 'Booked Date',
    dataIndex: 'bookedDate',
    key: 'bookedDate',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: (_, { location }) => `${location.lng}° ${location.lat}°`,
  },
  {
    title: 'Base Location',
    dataIndex: 'baseLocation',
    key: 'baseLocation',
    render: (_, { baseLocation }) => `${baseLocation.lng}° ${baseLocation.lat}°`,
  },
];

export const RentalCarTable: FC<RentalCarTableProps> = ({ dataSource, selectedKey, onRowClick }) => (
  <Table
    data-testid="rental-car-table"
    columns={columns}
    dataSource={dataSource}
    pagination={false}
    rowKey={({ id }) => id}
    rowSelection={{
      type: 'radio',
      selectedRowKeys: selectedKey ? [selectedKey] : [],
      hideSelectAll: true,
      renderCell: () => '',
    }}
    size="small"
    onRow={(record) => ({
      onClick: () => onRowClick(record),
    })}
  />
);
