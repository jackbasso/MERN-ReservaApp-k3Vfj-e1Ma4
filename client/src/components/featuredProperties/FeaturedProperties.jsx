import useFetch from "../../hooks/useFetch";
import SearchItem from "../searchItem/SearchItem";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4")

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
  ]

  return (
    <div className="fp">
      { loading ? ("loading...") : (
      <>
      { data && images.map((img, i) => (
        <div className="fpItem" key={data[i]?._id}>
        <img
          src={img}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{data[i]?.name}</span>
        <span className="fpCity">{data[i]?.city}</span>
        <span className="fpPrice">Starting from {data[i]?.cheapestPrice}</span>
        
         { data[i]?.rating && <div className="fpRating">
          <button>{data[i]?.rating}</button>
          <span>Excellent</span>
        </div> }
      </div>
      ))}
      
      </>
      )}
      
     </div>
  );
  };
  
  export default FeaturedProperties;
  