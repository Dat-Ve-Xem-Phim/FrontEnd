import {
  StyledMovieDetail,
  StyledMovieList,
  StyledTime,
  StyledListTime,
} from './styles';
import { Image, Typography } from 'antd';
import { GetUrlMovie } from 'utils/common';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { memo } from 'react';
const { Title } = Typography;
export const MovieList = memo(({ movies }) => {
  return (
    <StyledMovieList checkLength={movies.length}>
      {movies.length > 0 ? (
        movies.map((movie, i) => (
          <OneMovieInList index={i} {...movie} key={i} />
        ))
      ) : (
        <div style={{ textAlign: 'center' }}>
          Không có suất chiếu trong ngày
        </div>
      )}
    </StyledMovieList>
  );
});

const OneMovieInList = ({
  name,
  duration,
  language,
  category,
  index,
  showTimes,
}) => {
  return (
    <div>
      <StyledMovieDetail>
        <Image className="img-tiny" src={GetUrlMovie(index)} preview={false} />
        <div className="content">
          <Title level={5}>{name}</Title>
          <div className="sub-title">{`${duration} phút - Thể Loại: ${category} - Ngôn ngữ: ${language}`}</div>
        </div>
      </StyledMovieDetail>
      <StyledListTime>
        {showTimes &&
          showTimes.map((ee, i) => (
            <StyledTime key={i}>
              <Link to={`/booking/${ee?.id}`}>
                <div className="time">
                  {moment(ee?.startTime).format('HH:mm')}
                </div>
                ~{moment(ee?.startTime).add(duration, 'minute').format('HH:mm')}
              </Link>
            </StyledTime>
          ))}
      </StyledListTime>
    </div>
  );
};
