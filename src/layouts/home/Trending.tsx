import { Link } from "react-router-dom"
import Container from "../../components/Container"

const Trending = () => {
  return (
    <Container className="trending-watch flex">
      <Link to="/danh-muc/do-ho-nam" className="trending-watch-item relative flex-1 mr-4 nam">
        <div className="trending-watch-title bold-text">
          ĐỒNG HỒ NAM
        </div>
        <div className="bg" />
      </Link>
      <Link to="/danh-muc/do-ho-nu" className="trending-watch-item relative flex-1 ml-4 nu">
        <div className="trending-watch-title bold-text">
          ĐỒNG HỒ NỮ
        </div>
        <div className="bg" />
      </Link>
    </Container>
  )
}

export default Trending
