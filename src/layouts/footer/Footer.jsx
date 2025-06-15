function Footer() {
  return (
    <div className="container">
      <footer className="py-5">
        <div className="row">
          <div className="col-md-5  mb-3 ">
            <h5 className="color-red-text">BẢO TÀNG VĂN HỌC VIỆT NAM</h5>
            <div className="row">
              <div className="col-6">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Trang chủ
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Thông tin bảo tàng
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Tác giả
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Tác phẩm
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Câu chuyện
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Trang chủ
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Thông tin bảo tàng
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Tác giả
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Tác phẩm
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Câu chuyện
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-3  mb-3">
            <h5 className="color-red-text ">DỊCH VỤ BẢO TÀNG</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Trưng bày chuyên đề
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Trưng bày thường xuyên
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Hiện vật - hình ảnh
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  CLB Em yêu văn học
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4  mb-3">
            <form>
              <h5 className="color-red-text">HÒM THƯ GÓP Ý</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className=" py-4 my-4 border-top ">
          <div className="text-center">
            Cơ quan chủ quản: Hội Nhà văn Việt Nam Đơn vị quản lý: Bảo tàng Văn
            học Việt Nam
          </div>
          <div className="text-center">
            Chịu trách nhiệm: Nhà văn Nguyễn Thị Thu Huệ - Giám đốc Bảo tàng Văn
            học Việt Nam
          </div>
          <div className="text-center">
            Địa chỉ: Ngõ 275 Âu Cơ - P.Quảng An - Q.Tây Hồ - Tp. Hà Nội
            Email:banbientap@baotangvanhoc.vn
          </div>
          <div className="text-center">Tel/Fax: 84.865051179</div>
          <div className="text-center">Copyright 2025 © Baotangvanhoc.vn</div>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
