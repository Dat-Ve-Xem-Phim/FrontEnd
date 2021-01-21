import { Tabs, Image, List, Avatar, Button } from 'antd';
import { memo } from 'react';
import BHD from 'images/movie/BHD.png';
import { GetUrlGroup, GetUrlCinema } from 'utils/common';
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;

export const ListMovie = memo(({ dataSource }) => {
  const logos = dataSource.map(item => item.logo);

  return (
    <Tabs defaultActiveKey="0" tabPosition="left">
      {dataSource.length &&
        dataSource.map((e, i) => (
          <TabPane
            tab={<Image src={logos[i]} className="img-tiny" preview={false} />}
            key={i}
          >
            <List
              className="list"
              itemLayout="horizontal"
              dataSource={e?.cinemas}
              renderItem={(item, index) => {
                return (
                  <List.Item
                    actions={[
                      <Button key="list-loadmore-edit" className="button">
                        <Link to={`/cinema/${e?.id}`}>Xem chi tiết</Link>
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={GetUrlCinema(index)} />}
                      title={item?.name}
                      description={item?.description}
                    />
                  </List.Item>
                );
              }}
            ></List>
          </TabPane>
        ))}
    </Tabs>
  );
});
