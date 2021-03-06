import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Space,
  Table,
  Typography,
  Popconfirm,
  message,
  Layout,
  Menu,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import lodash from 'lodash';

import AdminSider from 'app/components/AdminSider/index';

import { WEB_API } from 'configs';

const { Text } = Typography;

export const ManageTheaters = memo(() => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function doStuff() {
      const response = await axios.get(`${WEB_API}/user`);
      const mapUsers = response.data.users.map(user => {
        return { ...user, key: user.id };
      });
      setUsers(mapUsers);
    }
    doStuff();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: name => {
        return (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'left',
              }}
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ marginRight: '8px' }}
              />
              <Text>{name}</Text>
            </div>
          </>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => <Text>{email}</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {!record.isBlocked ? (
            <Popconfirm
              title="Xác nhận khóa tài khoản?"
              onConfirm={async () => {
                const response = await axios.put(
                  `${WEB_API}/user/${record.id}/block-user`,
                );
                if (response.data.success) {
                  const userIndex = users.findIndex(
                    user => user.id === record.id,
                  );

                  let modifyUser = lodash.cloneDeep(users[userIndex]);
                  modifyUser.isBlocked = true;

                  let modifyUsers = lodash.cloneDeep(users);
                  modifyUsers[userIndex] = modifyUser;
                  setUsers(modifyUsers);
                  message.success('Khóa tài khoản thành công!');
                }
              }}
              onCancel={async () => {
                console.log('cancel');
              }}
              okText="Khóa"
              cancelText="Hủy"
            >
              <Button danger>Khóa tài khoản</Button>
            </Popconfirm>
          ) : (
            <Button danger disabled>
              Đã khóa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100%' }}>
      <AdminSider selectedKey={1} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Table
          style={{ marginTop: '16px', width: '80%', marginLeft: '16px' }}
          bordered
          columns={columns}
          dataSource={users}
        />
      </div>
    </Layout>
  );
});

export default ManageTheaters;
