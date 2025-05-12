import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import API1 from "../../API1";

function Prodetail() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    API1.get("/product/detail/" + params.id).then((res) => {
      setProduct(res.data.data);
    });
  }, [params.id]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("Image clicked – opening modal");
  }
  const images = product.image ? JSON.parse(product.image) : [];
  const smallImg = images[0];
  const largeImg = images[1] || smallImg;
  const fullImg = images[2] || largeImg;

  return (
    <div className="product-details">
      <div className="col-sm-5">
        <div className="view-product">
          {smallImg && (
            <>
              <img
                src={`http://laravel8.test/laravel8/public/upload/product/${product.id_user}/${smallImg}`}
                className="share img-responsive"
                alt={product.name}
                style={{ cursor: "pointer", width: "300px" }}
                onClick={handleShow}
              />
              <h3 style={{ cursor: "pointer" }} onClick={handleShow}>ZOOM</h3>
            </>
          )}
        </div>

        <div id="similar-product" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="item active">
              <a href="#"><img src="images/product-details/similar1.jpg" alt="" /></a>
              <a href="#"><img src="images/product-details/similar2.jpg" alt="" /></a>
              <a href="#"><img src="images/product-details/similar3.jpg" alt="" /></a>
            </div>
            <div className="item">
              <a href="#"><img src="images/product-details/similar1.jpg" alt="" /></a>
              <a href="#"><img src="images/product-details/similar2.jpg" alt="" /></a>
              <a href="#"><img src="images/product-details/similar3.jpg" alt="" /></a>
            </div>
          </div>
          <a className="left item-control" href="#similar-product" data-slide="prev">
            <i className="fa fa-angle-left" />
          </a>
          <a className="right item-control" href="#similar-product" data-slide="next">
            <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>

      <div className="col-sm-7">
        <div className="product-information">
          <img src="images/product-details/new.jpg" className="newarrival" alt="" />
          <h2>{product.name}</h2>
          <p>ID: {product.id}</p>
          <img src="images/product-details/rating.png" alt="" />
          <span>
            <span>${product.price}</span>
            <label>Quantity:</label>
            <input type="text" defaultValue={3} />
            <button type="button" className="btn btn-fefault cart">
              <i className="fa fa-shopping-cart" />
              Add to cart
            </button>
          </span>
          <p><b>Availability:</b> In Stock</p>
          <p><b>Condition:</b> {product.status}</p>
          <p><b>Brand:</b> {product.name}</p>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={`http://laravel8.test/laravel8/public/upload/product/${product.id_user}/${fullImg}`}
            alt="Zoomed"
            style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Prodetail;
