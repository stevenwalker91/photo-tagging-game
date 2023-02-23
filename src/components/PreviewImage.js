import { useState } from "react";
import Loader from "./Loader";

const PreviewImage = ({imageSelected, item, handleImageSelect}) => {

  const [loading, setLoading] = useState(true);

  return (
    <div className="preview-image-container">
      <Loader style={{display: loading ? "block" : "none"}} /> 
      <img 
        className={imageSelected === item.name ? 'preview-image image-selected' : 'preview-image' }
        src={`${process.env.PUBLIC_URL}${item.url}` }
        alt="a huge panorama containing lots of different characters"
        name={item.name}
        onClick={(event) => handleImageSelect(event)}
        onLoad={() => setLoading(false)}
        style={{display: loading ? "none" : "block"}}
      />
    </div>
  )
}

export default PreviewImage;