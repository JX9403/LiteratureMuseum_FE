import React from "react";
import { NavLink } from "react-router-dom";
import slide1 from "../../assets/images/Slide1.jpg";
const IntroPage = () => {
  return (
    <div className="page-intro ">
      <div className="container">
        <div className="box-c">
          <NavLink to="#" className="custom-underline font-s-30 font-w-700">
            GIỚI THIỆU
          </NavLink>
        </div>

        <h6
          className="mb-4 fst-italic
 "
        >
          Chào mừng quý vị đã đến với {""}
          <strong className="color-red-text">Bảo tàng Văn học Việt Nam</strong>!
        </h6>

        <p className="mb-4">
          Bảo tàng Văn học Việt Nam được thành lập ngày 8 tháng 11 năm 2011 theo
          Quyết định số 1987/QĐ-TTg của Thủ tướng Chính phủ. Trải qua quá trình
          sưu tầm và trưng bày đến ngày 26 tháng 6 năm 2015, Bảo tàng Văn học
          Việt Nam chính thức mở cửa đón khách tham quan.
        </p>

        <p className="mb-4">
          Bảo tàng được xây dựng tại địa chỉ 275 Âu Cơ, phường Quảng An, quận
          Tây Hồ, TP Hà Nội, cách trung tâm Hà Nội 6,2 km về phía Bắc. Mảnh đất
          này từng là Trường Viết văn Quảng Bá của Hội Nhà văn Việt Nam vào
          những năm 60–70 của thế kỷ trước – nơi ghi dấu nhiều kỷ niệm của các
          nhà văn, nhà thơ nổi tiếng.
        </p>

        <p className="mb-4">
          Là một trong số rất ít các bảo tàng về văn học trong khu vực và trên
          thế giới, nơi đây đóng vai trò quan trọng trong việc nghiên cứu, sưu
          tầm, bảo quản, trưng bày và giáo dục về nền văn học của dân tộc. Bảo
          tàng có 2 phần trưng bày chính:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Phần trưng bày ngoài trời:</strong> Giới thiệu về nền Văn
            học dân gian Việt Nam, được tái hiện qua các bức phù điêu bằng gốm
            trang trí xung quanh bảo tàng và hệ thống 20 tượng danh nhân văn học
            thời kỳ cổ – trung đại.
          </li>
          <li>
            <strong>Phần trưng bày trong nhà:</strong> Lưu giữ và bảo quản hàng
            vạn hiện vật với diện tích hơn 2000 m². Nơi đây giới thiệu tiến
            trình lịch sử văn học Việt Nam từ thời nhà Lý đến nay, với nhiều tư
            liệu quý giá về các nhà văn như Nguyễn Du, Nguyễn Trãi, Nguyễn Đình
            Chiểu, Nam Cao, Nguyễn Đình Thi, Xuân Diệu, Tố Hữu… Mỗi hiện vật là
            một câu chuyện xúc động và hấp dẫn về cuộc đời và sáng tác của họ.
          </li>
        </ul>

        <p className="mb-4">
          Nội dung trưng bày chính của bảo tàng gồm 3 tầng:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Tầng 1:</strong> Phòng khánh tiết và trưng bày “Văn học Việt
            Nam thời kỳ cổ – trung đại” (từ thế kỷ 10 đến thế kỷ 19), cùng thông
            tin về học hành thi cử thế kỷ 19.
          </li>
          <li>
            <strong>Tầng 2:</strong> Trưng bày về “Các nhà văn Giải thưởng Hồ
            Chí Minh” và “Không gian văn hóa Xóm Chòi” – nơi từng là trụ sở của
            Hội văn nghệ Việt Nam trong kháng chiến chống Pháp.
          </li>
          <li>
            <strong>Tầng 3:</strong> Tôn vinh “Các nhà văn Giải thưởng Nhà nước”
            và các kỳ Đại hội Hội Nhà văn Việt Nam.
          </li>
        </ul>

        <p className="mb-4">
          Ngoài ra, bảo tàng còn có phòng trưng bày chuyên đề và không gian khám
          phá “Sinh hoạt văn hóa nông thôn Việt Nam”.
        </p>

        <p className="mb-4">
          Bảo tàng Văn học Việt Nam là một địa chỉ văn hóa hấp dẫn, lưu giữ
          nhiều hiện vật quý gắn liền với các nhà văn và nền văn học Việt Nam từ
          thời cổ – trung đại đến hiện đại.
        </p>

        <h6
          className="font-semibold text-center mt-8 fst-italic color-red-text
"
        >
          Hãy đến với chúng tôi – Bảo tàng Văn học chào đón các bạn!
        </h6>
      </div>
    </div>
  );
};

export default IntroPage;
